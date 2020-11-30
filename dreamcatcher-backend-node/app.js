const express = require('express');
const app = express();
// helps express parse JSON in body
app.use(express.json())

const firebase = require('./firestore-init');
const db = firebase.firestore();

const auth = require('./auth');
const profileRoutes = require('./profileAPIs');
const applications = require('./applications');
// routes for testing purposes
const testRoutes = require('./testing');

// MIDDLEWARE
const basicAPI = async (req, res, next) => {
    res.statusCode = 500;
    res.json({
        status: 500,
        message: 'API was not setup / called correctly. Caught by fallback.',
        data: null
    });
}

// Be careful of the order here!
app.use('/tests', testRoutes);
app.use('/applications', applications);
app.use('/auth', auth);
app.use('/profiles', profileRoutes);
app.use('/', basicAPI)


// ROUTES

app.get('/allUsers', async (req, res) => {
    const snapshot = await db.collection('users').get();
    console.log(snapshot);
    if (snapshot.size > 0) {
        const users = [];
        snapshot.forEach((doc) => {
            users.push(doc.data());
        });
        res.json({
            status: 'success',
            users: users
        });
    } else {
        res.json({status: 'error'});
    }
    res.end()
});

app.listen(5000)
