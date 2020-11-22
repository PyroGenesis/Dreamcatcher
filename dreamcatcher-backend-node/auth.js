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


router.post('/signup', async (req, res) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;

    if (uid == null || email == null || firstName == null || lastName == null || userName == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Missing data',
            data: null
        });
        return;
    }

    const userCreateOp = db.batch();

    const userDoc = db.collection('users').doc(uid);
    const usernameMapDoc = db.collection('usernameToDetails').doc(userName);

    userCreateOp.set(userDoc, {
        createdAt: new Date(),
        email: email,
        firstName: firstName,
        lastName: lastName
    });
    userCreateOp.set(userDoc.collection('profile').doc('default'), {
        education: [],
        experience: [],
        about: "This user hasn't shared anything about them yet"
    });

    userCreateOp.set(usernameMapDoc, {
        uid: uid
    });

    await userCreateOp.commit();

    res.statusCode = 200;
    res.json({
        status: res.statusCode,
        message: 'success',
        data: null
    });
});
module.exports = router;
