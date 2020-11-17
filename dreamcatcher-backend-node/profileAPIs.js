const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

// These paths start from /profiles

router.get('/test', async (req, res, next) => {
    res.send('Profile Home!!!');
});

router.get('/:user', async (req, res) => {
    const username = req.params.user;
    const profileSnapshot = await db.collection('users').doc(username).collection('profile').doc('default').get();
    
    if (profileSnapshot.exists) {
        res.json({
            status: 'success',
            profile: profileSnapshot.data()
        });
    } else {
        res.json({status: 'error', errorCode: 404, msg: 'This user does not exist'});
    }
});



module.exports = router