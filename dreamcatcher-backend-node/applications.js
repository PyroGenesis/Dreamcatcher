const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

const verifyToken = require('./auth').verifyToken

// These paths start from /applications

router.post('/', async (req, res, next) => {
    token = req.body.token;

    tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        res.json({
            status: 200,
            message: 'Invalid token',
            data: false
        });
        return;
    }
    const uid = /*'5bVmAxHkjlc7iNHUNzgG8l9jHhg1'*/ tokenResp.data.uid;

    const applicationCollection = await db.collection('users').doc(uid).collection('applications').get();
    if (applicationCollection.size > 0) {
        const applications = [];
        for (appl of applicationCollection.docs) {
            let application = appl.data();
            application.position = (await application.positionRef.get()).data();
            delete application.positionRef;
            applications.push(application);
        }
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: {
                applications: applications
            }
        });
    } else {
        res.statusCode = 201;
        res.json({
            status: res.statusCode,
            message: 'No applications present',
            data: null
        });
    }
});

router.get('/v1', (req, res, next) => {
    let data = [{
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/23/2020"
    },
    {
        company_name: "Google",
        position: "Full Stack Developer",
        status: "Applied",
        link: "https://account.amazon.jobs/en-US",
        date: "10/23/2020"
    },
    {
        company_name: "Microsoft",
        position: "Web Developer",
        status: "Interview",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Apple",
        position: "Web Developer",
        status: "Applied",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    {
        company_name: "Amazon",
        position: "Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date: "10/22/2020"
    },
    ]
    let position = req.query.position;
    let status = req.query.status;
    var response = [];

    for (i = 0; i < data.length; i++) {
        if (position == null || position == undefined) {
            if (status == data[i].status)
                response.push(data[i]);

        }
        else {
            if (position == data[i].position)
                response.push(data[i]);
        }


    }
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    if ((position == null || position == undefined) && (status == null || status == undefined))
        res.json(data);
    else
        res.json(response);
    res.end();
});

module.exports = router