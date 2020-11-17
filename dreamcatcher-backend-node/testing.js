const express = require('express');
const router = express.Router();

const firebase = require('./firestore-init');
const db = firebase.firestore();

// These paths start from /tests

router.get('/', (req, res) => {
    res.send('Test API works!');
});

// used to add a hardcoded user with all details
router.get('/addUser',  async (req, res) => {
    // await db.collection('users').doc('5bVmAxHkjlc7iNHUNzgG8l9jHhg1').collection('profile').doc('default').create({about: 'abc'})
    const userRef = db.collection('users').doc('5bVmAxHkjlc7iNHUNzgG8l9jHhg1');
    // const profileRef = userRef.collection('profile').doc('default');

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

    userRef.update({
        createdAt: new Date(),
        email: "burhan123786@gmail.com",
        firstName: "Burhanuddin",
        lastName: "Lakdawala",
        username: "burhan"
    })

    res.end();
});

module.exports = router;