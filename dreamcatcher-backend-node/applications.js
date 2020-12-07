const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();
const utilities = require('../dreamcatcher-ui-react/src/misc/utilities')

const verifyToken = require('./common_resources').verifyToken;

// These paths start from /applications

router.post('/add', async (req, res) => {
    const token = req.body.token;
    const position_id = req.body.id;
    const status = req.body.status;
    if (token == null || position_id == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Missing data',
            data: null
        });
        return;
    }

    const tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }
    const uid = tokenResp.data.uid;
    const docRef = db.collection('users').doc(uid).collection('applications').doc(position_id);

    try {

        docRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            res.statusCode = 200;
            res.json({
                status: res.statusCode,
                message: 'Already applied to this position!!',
                data: null
            });
            
          } else {
            docRef.set({
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                positionRef: db.collection('positions').doc(position_id),
                status: status
            });
            res.statusCode = 201;
            res.json({
                status: res.statusCode,
                message: 'success',
                data: null
            }); 
          }
          
      });
        
    } catch (error) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Invalid application ID or unknown error',
            data: null
        });
    }
});

router.post('/update', async (req, res) => {
    const token = req.body.token;
    const application_id = req.body.id;
    const new_status = req.body.status;

    if (token == null || application_id == null || new_status == null) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Missing data',
            data: null
        });
        return;
    }

    const tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }
    const uid = tokenResp.data.uid;

    const applicationRef = db.collection('users').doc(uid).collection('applications').doc(application_id)
    // const application = await applicationRef.get();
    // if (!application.exists) {
    //     res.statusCode = 400;
    //     res.json({
    //         status: res.statusCode,
    //         message: 'Invalid application ID',
    //         data: null
    //     });
    //     return;
    // }

    try {
        await applicationRef.update({
            status: new_status
        });
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: null
        });
    } catch (error) {
        res.statusCode = 400;
        res.json({
            status: res.statusCode,
            message: 'Invalid application ID or unknown error',
            data: null
        });
    }
});

router.get('/data', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    token = req.query.token;
    const tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }
    const uid = /*'5bVmAxHkjlc7iNHUNzgG8l9jHhg1'*/ tokenResp.data.uid;
    var countS = 0, countF = 0, countW = 0, countI = 0, countC = 0,  countML = 0, count120 = 0;
    var dailyCounts = new Array(120);
    dailyCounts.fill(0);
    const today = new Date();

    const applicationCollection = await db.collection('users').doc(uid).collection('applications').get();
    if (applicationCollection.size > 0) {
        const applications = [];
        for (appl of applicationCollection.docs) {
            let application = appl.data();
            application.id = appl.id;
            application.position = (await application.positionRef.get()).data();
            const dateObj = {_seconds: application.date._seconds, _nanoseconds:application.date._nanoseconds};
            const options = {year: "numeric", month: "numeric", day: "2-digit"};
            const datetime = utilities.firebaseDateToJSDate(dateObj, options);
            // const datetime ="11/23/2020";
            day = datetime.substring(3,5);
            month = datetime.substring(0,2)-1;
            year = datetime.substring(6);
            date = new Date(year,month,day);
            result = Math.abs(today - date) / 1000;
            days = Math.floor(result / 86400);
            if(days<=120){
            count120++;
            dailyCounts[days]+=1;
            }
            if(application.status == "Interview")
                countI++;
            else if(application.status == "Coding Test")
                countC++;
            if(application.position.position_type == "Software Engineering")
                countS++;
            else if(application.position.position_type == "Full Stack")
                countF++;
            else if(application.position.position_type == "Web")
                countW++;
            else if(application.position.position_type == "Machine Learning")
                countML++;
            applications.push(application);
            delete application.positionRef;
        }
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: {
                applications: applications,
                countS: countS,
                countI: countI,
                countF: countF,
                countW: countW,
                countML: countML,
                countC: countC,
                count120: count120,
                dailyCounts: dailyCounts
            }
        });
    } else {
        res.statusCode = 404;
        res.json({
            status: res.statusCode,
            message: 'No applications found',
            data: null
        });
    }
});

router.get('/data', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    token = req.query.token;
    const tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }
    const uid = /*'5bVmAxHkjlc7iNHUNzgG8l9jHhg1'*/ tokenResp.data.uid;
    var countS = 0, countF = 0, countW = 0, countI = 0, countC = 0,  countML = 0, count120 = 0;
    var dailyCounts = new Array(120);
    dailyCounts.fill(0);
    const today = new Date();

    const applicationCollection = await db.collection('users').doc(uid).collection('applications').get();
    if (applicationCollection.size > 0) {
        const applications = [];
        for (appl of applicationCollection.docs) {
            let application = appl.data();
            application.id = appl.id;
            application.position = (await application.positionRef.get()).data();
            const dateObj = {_seconds: application.date._seconds, _nanoseconds:application.date._nanoseconds};
            const options = {year: "numeric", month: "numeric", day: "2-digit"};
            const datetime = utilities.firebaseDateToJSDate(dateObj, options);
            // const datetime ="11/23/2020";
            day = datetime.substring(3,5);
            month = datetime.substring(0,2)-1;
            year = datetime.substring(6);
            date = new Date(year,month,day);
            result = Math.abs(today - date) / 1000;
            days = Math.floor(result / 86400);
            if(days<=120){
            count120++;
            dailyCounts[days]+=1;
            }
            if(application.status == "Interview")
                countI++;
            else if(application.status == "Coding Test")
                countC++;
            if(application.position.position_type == "Software Engineering")
                countS++;
            else if(application.position.position_type == "Full Stack")
                countF++;
            else if(application.position.position_type == "Web")
                countW++;
            else if(application.position.position_type == "Machine Learning")
                countML++;
            applications.push(application);
            delete application.positionRef;
        }
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: {
                applications: applications,
                countS: countS,
                countI: countI,
                countF: countF,
                countW: countW,
                countML: countML,
                countC: countC,
                count120: count120,
                dailyCounts: dailyCounts
            }
        });
    } else {
        res.statusCode = 404;
        res.json({
            status: res.statusCode,
            message: 'No applications found',
            data: null
        });
    }
});

router.get('/', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    token = req.query.token;
    status = req.query.status;
    position = req.query.position;
    const tokenResp = await verifyToken(token);
    if (tokenResp.status !== 200) {
        res.statusCode = tokenResp.status;
        res.json(tokenResp);
        return;
    }
    const uid = /*'5bVmAxHkjlc7iNHUNzgG8l9jHhg1'*/ tokenResp.data.uid;

    const applicationCollection = await db.collection('users').doc(uid).collection('applications').get();
    if (applicationCollection.size > 0) {
        const applications = [];
        for (appl of applicationCollection.docs) {
            let application = appl.data();
            application.id = appl.id;
            application.position = (await application.positionRef.get()).data();
            if (position == null || position == undefined) {
                if (status == application.status)
                   applications.push(application);
                else if (status == null || status == undefined){
                    applications.push(application);
                }
    
            }
            else {
                if (application.position.position_type== position)
                applications.push(application);
            }
            delete application.positionRef;
        }
        res.statusCode = 200;
        res.json({
            status: res.statusCode,
            message: 'success',
            data: {
                applications: applications,
            }
        });
    } else {
        res.statusCode = 404;
        res.json({
            status: res.statusCode,
            message: 'No applications found',
            data: null
        });
    }
});

// router.get('/data', async (req, res, next) => {
//     token = req.query.token;
//     const tokenResp = await verifyToken(token);
//     if (tokenResp.status !== 200) {
//         res.statusCode = tokenResp.status;
//         res.json(tokenResp);
//         return;
//     }
//     const uid = /*'5bVmAxHkjlc7iNHUNzgG8l9jHhg1'*/ tokenResp.data.uid;
//     var countS = 0, countF = 0, countW = 0, countI = 0, countC = 0,  countML = 0, count120 = 0;
//     var dailyCounts = new Array(120);
//     dailyCounts.fill(0);
//     const today = new Date();
//     const applicationCollection = await db.collection('users').doc(uid).collection('applications').get();
//     if (applicationCollection.size > 0) {
//         const applications = [];
//         for (appl of applicationCollection.docs) {
//             let application = appl.data();
//             application.id = appl.id;
//             application.position = (await application.positionRef.get()).data();
//             console.log(application.date._seconds);
//             const dateObj = {_seconds: application.date._seconds, _nanoseconds:application.date._nanoseconds};
//             const options = {year: "numeric", month: "numeric", day: "2-digit"};
//             // const datetime = firebaseDateToJSDate(dateObj, options);
//             const datetime ="11/23/2020";
//             var day = datetime.substring(3,5);
//             var month = datetime.substring(0,2)-1;
//             var year = datetime.substring(6);
//             var date = new Date(year,month,day);
//             var res = Math.abs(today - date) / 1000;
//             var days = Math.floor(res / 86400);
//             if(days<=120){
//             count120++;
//             dailyCounts[days]+=1;
//             }
//             if(application.status == "Interview")
//                 countI++;
//             else if(application.status == "Coding Test")
//                 countC++;
//             if(application.position.position_type == "Software Engineering")
//                 countS++;
//             else if(application.position.position_type == "Full Stack")
//                 countF++;
//             else if(application.position.position_type == "Web")
//                 countW++;
//             else if(application.position.position_type == "Machine Learning")
//                 countML++;
//             applications.push(application);
//             delete application.positionRef;
//         }
//         console.log(countS);
//         console.log(countF);
//         console.log(countW);
//         console.log(countI);
//         console.log(countC);
//         console.log(count120);
//         console.log(countML);
//         console.log(dailyCounts);

//         res.statusCode = 200;
//         res.json({
//             status: res.statusCode,
//             message: 'success',
//             data: {
//                 applications: applications
//             }
//         });
//     } else {
//         res.statusCode = 404;
//         res.json({
//             status: res.statusCode,
//             message: 'No applications found',
//             data: null
//         });
//     }
// });


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