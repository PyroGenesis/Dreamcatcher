const firebase = require('./firestore-init');
const db = firebase.firestore();

async function verifyToken(token) {
    let res = null;
    if (token == null) {
        res = {
            status: 400,
            message: 'No token provided',
            data: null
        };
        return res;
    }
    
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token);
        res = {
            status: 200,
            message: 'success',
            data: {
                uid: decodedToken.uid
            }
        };
    } catch (error) {
        res = {
            status: 400,
            message: 'Invalid Token',
            data: null
        };
    }
    return res;
}

async function getImages(keywords) {
    const imageRef = db.collection('images')
    let images = {}

    keywords = [...new Set(keywords)];

    let queryLists = []
    for (let i=0; i<keywords.length; i += 10) {
        queryLists.push(keywords.slice(i, i+10));
    }

    for (const qList of queryLists) {
        const imagesSnapshot = await imageRef.where('keywords', 'array-contains-any', qList).get();
        if (imagesSnapshot.size > 0) {
            imagesSnapshot.forEach((img) => {
                img.get('keywords').forEach((keyword) => {
                    if (qList.includes(keyword)) {
                        images[keyword] = img.get('image');
                    }
                });
            });
        }
    }

    return images
}

module.exports = { verifyToken, getImages }