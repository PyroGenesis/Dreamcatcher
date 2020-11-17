const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

// These paths start from /profiles

router.get('/test', async (req, res, next) => {
    res.send('Profile Home!!!');
});

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    if (uid == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'No username provided',
            data: null
        });
        return;
    }
    const profileSnapshot = await db.collection('users').doc(uid).collection('profile').doc('default').get();
    
    if (profileSnapshot.exists) {
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: {
                profile: profileSnapshot.data()
            }
        });
    } else {
        res.statusCode = 404;
        res.json({
            status: res.statusCode,
            message: 'User not found',
            data: null
        });
    }
});



module.exports = router