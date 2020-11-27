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

module.exports = { verifyToken }