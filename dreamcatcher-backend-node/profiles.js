const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

const verifyToken = require('./common_resources').verifyToken;
const getImages = require('./common_resources').getImages;

// These paths start from /profiles

router.get('/test', async (req, res, next) => {
    res.send('Profile Home!!!');
});

async function updateProfileField(field, token, data) {
    const tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        return tokenResp;
    }

    const uid = tokenResp.data.uid;
    const profileRef = db.collection('users').doc(uid).collection('profile').doc('default');

    try {
        await profileRef.update({
            [field]: data
        });
        return {
            status: 200,
            message: 'success',
            data: null
        };
    } catch (error) {
        return {
            status: 500,
            message: 'unknown error',
            data: error
        };
    }
}

router.post('/image', async (req, res) => {
    const updateResp = await updateProfileField('image', req.body.token, req.body.image);
    if (updateResp.status !== 200) {
        res.statusCode = updateResp.status;
    }
    res.json(updateResp);
});

router.post('/experience', async (req, res) => {
    const updateResp = await updateProfileField('experience', req.body.token, req.body.experience);
    if (updateResp.status !== 200) {
        res.statusCode = updateResp.status;
    }
    res.json(updateResp);
});

router.post('/education', async (req, res) => {
    const updateResp = await updateProfileField('education', req.body.token, req.body.education);
    if (updateResp.status !== 200) {
        res.statusCode = updateResp.status;
    }
    res.json(updateResp);
});

router.post('/bio', async (req, res) => {
    const tokenResp = await verifyToken(req.body.token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }

    if (req.body.headline == null || req.body.location == null || req.body.about == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Missing data',
            data: null
        });
        return;
    }

    const uid = tokenResp.data.uid;
    const profileRef = db.collection('users').doc(uid).collection('profile').doc('default');

    try {
        await profileRef.update({
            headline: req.body.headline,
            location: req.body.location,
            about: req.body.about
        });
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: null
        });
    } catch (error) {
        res.statusCode = 500;
        res.json({
            status: res.statusCode,
            message: 'unknown error',
            data: error
        });
    }
});

async function getProfileFromUID(uid) {
    const profileSnapshot = await db.collection('users').doc(uid).collection('profile').doc('default').get();
    
    if (profileSnapshot.exists) {
        const profileData = profileSnapshot.data();

        const imageQueries = []
        profileData.education.forEach(ed => {
            imageQueries.push(ed.university.toLowerCase())
        });
        profileData.experience.forEach(ex => {
            imageQueries.push(ex.company.toLowerCase())
        });
        
        const images = await getImages(imageQueries);
        profileData.education.forEach(ed => {
            ed.image = images[ed.university.toLowerCase()];
        });
        profileData.experience.forEach(ex => {
            ex.image = images[ex.company.toLowerCase()];
        });

        return {
            status: 200,
            message: 'success',
            data: {
                profile: profileData
            }
        };
    } else {
        return {
            status: 404,
            message: 'User not found',
            data: null
        };
    }
}

router.get('/:username', async (req, res) => {
    const username = req.params.username;

    if (username == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'No username provided',
            data: null
        });
        return;
        // username = 'burhan'
    }
    const userRef = await db.collection('usernameToDetails').doc(username).get()
    if (!userRef.exists) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'No user with this username present',
            data: null
        });
        return;
    }

    const uid = userRef.get('uid');
    const profileResp = await getProfileFromUID(uid);
    res.statusCode = profileResp.status;
    res.json(profileResp);
});

router.post('/', async (req, res) => {
    tokenResp = await verifyToken(req.body.token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }

    const uid = tokenResp.data.uid;
    const profileResp = await getProfileFromUID(uid);
    res.statusCode = profileResp.status;
    res.json(profileResp);
});


module.exports = router