const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

// These paths start from /auth

router.post('/', (req, res) => {
    firebase.auth().verifyIdToken(req.body.token).then((decodedToken) => {
        res.json({
            status: 'success',
            uid: decodedToken.uid
        });
    }).catch((error) => {
        res.json({
            status: 'failed',
            uid: decodedToken.uid
        });
    });
});

module.exports = router;
