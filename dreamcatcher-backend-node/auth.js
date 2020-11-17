const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

// These paths start from /auth

router.post('/', (req, res) => {
    if (req.body.token == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'No token provided',
            data: null
        });
        return;
    }
    
    firebase.auth().verifyIdToken(req.body.token).then((decodedToken) => {
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: {
                uid: decodedToken.uid
            }
        });
    }).catch((error) => {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Invalid Token',
            data: null
        });
    });
});


module.exports = router;
