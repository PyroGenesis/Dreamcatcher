const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

const getImages = require('./common_resources').getImages;

// These paths start from /images



router.post('/', async (req, res) => {
    const queries = req.body.queries;
    const images = await getImages(queries);

    res.json({
        status: 200,
        message: 'success',
        data: images
    })
});


module.exports = router;