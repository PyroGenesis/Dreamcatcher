const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

const getImages = require('./common_resources').getImages;

// These paths start from /images



router.post('/', async (req, res) => {
    // tokenResp = await verifyToken(req.body.token);
    // if (tokenResp.status !== 200) {
    //     res.statusCode = tokenResp.status;
    //     res.json(tokenResp);
    //     return;
    // }
    const docIds = req.body.docIds;
    const images = await getImages(docIds);

    res.json({
        status: 200,
        message: 'success',
        data: images
    })

    // const uid = tokenResp.data.uid;
    // const profileResp = await getProfileFromUID(uid);
    // res.statusCode = profileResp.status;
    // res.json(profileResp);
});


module.exports = router;