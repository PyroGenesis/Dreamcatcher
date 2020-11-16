const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

router.get('/test', async (req, res, next) => {
    const profileRef = db.collection('users').doc('burhan').collection('profile').doc('default');
    // const educationRef = profileRef.collection('education');
    // profileRef.update({
    //     education: [{
    //         university: 'University of California, Irvine',
    //         degree: 'Masters',
    //         major: 'Computer Science',
    //         startYear: 2019,
    //         endYear: 2020
    //     }, {
    //         university: 'University of Mumbai',
    //         degree: 'Bachelors of Engineering',
    //         major: 'Information Technology',
    //         startYear: 2014,
    //         endYear: 2018
    //     }] 
    // });

    // const experience = profileRef.collection('experience');
    // profileRef.update({
    //     experience: [{
    //         position: 'Software Engineer Intern',
    //         company: 'Personable Inc.',
    //         type: 'Fulltime',
    //         start: new Date(2020, 5, 22),
    //         end: new Date(2020, 11, 18),
    //         location: 'Irvine, California, United States',
    //         description: 'Designed and developed 30-40% of all enhancements and improvements for Personable’s prime product, ScanWriter, which significantly improved user experience and expanded core functionality.\nAlso played an important role in transitioning the dev environment to a version-controlled CI / CD environment, which reduced merge errors by up to 50%'
    //     }, {
    //         position: 'Software Engineer',
    //         company: 'Mastek Ltd.',
    //         type: 'Fulltime',
    //         start: new Date(2018, 5, 12),
    //         end: new Date(2020, 7, 16),
    //         location: 'Mumbai, Maharashtra, India',
    //         description: 'Developed an NLP solution consisting of Text Summarization, Sentiment Analysis, and Document Clustering. Adapted the solution into a Review Analytics platform for Mastek’s customers, using Angular as the front-end, Python Flask as the back-end and hosted on Azure Cloud. Designed the Angular UI for a document profiler application, chatbot application, and a machine-learning project.'
    //     }]
    // });
    
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