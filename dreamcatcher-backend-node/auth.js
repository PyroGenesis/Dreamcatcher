const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

const verifyToken = require('./common_resources').verifyToken;

// These paths start from /auth

router.post('/', async (req, res) => {
    tokenResp = await verifyToken(req.body.token);
    res.statusCode = tokenResp.status;
    res.json(tokenResp);
});

async function getUsernameFromUID(uid) {
    const userSnapshot = await db.collection('users').doc(uid).get();
    
    if (userSnapshot.exists) {
        return {
            status: 200,
            message: 'success',
            data: {
                username: userSnapshot.data().username
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

router.post('/getUsername', async (req, res) => {
    tokenResp = await verifyToken(req.body.token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }
    const uid = tokenResp.data.uid;
    const usernameResp = await getUsernameFromUID(uid);
    res.statusCode = usernameResp.status
    res.json(usernameResp)
});

// router.post('/match/:username', async (req, res) => {
//     const username = req.params.username;
//     const token = req.body.token;

//     tokenResp = await verifyToken(token);
//     if (tokenResp.status !== 200) {
//         res.json({
//             status: 200,
//             message: 'Invalid token',
//             data: false
//         });
//         return;
//     }
//     const tokenUID = tokenResp.data.uid;

//     if (username == null) {
//         res.statusCode = 400;
//         res.json({
//             status: res.statusCode,
//             message: 'No username provided',
//             data: false
//         });
//         return;
//     }
//     const userRef = await db.collection('usernameToDetails').doc(username).get()
//     if (!userRef.exists) {
//         res.statusCode = 400;
//         res.json({
//             status: res.statusCode,
//             message: 'No user with this username present',
//             data: false
//         });
//         return;
//     }

//     const usernameUID  = await userRef.get('uid');
//     if (tokenUID === usernameUID) {
//         res.json({
//             status: 200,
//             message: 'Same user profile',
//             data: true
//         })
//     } else {
//         res.json({
//             status: 200,
//             message: 'Different user profile',
//             data: false
//         })
//     }
// })


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
        lastName: lastName,
        username: userName
    });
    userCreateOp.set(userDoc.collection('profile').doc('default'), {
        education: [],
        experience: [],
        about: "This user hasn't shared anything about them yet",
        fullname: firstName + ' ' + lastName,
        headline: "I am new to Dreamcatchers!",
        location: 'Unknown'
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

module.exports = router
