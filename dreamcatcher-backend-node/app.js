const express = require('express');
const app = express();
// helps express parse JSON in body
app.use(express.json())

const firebase = require('./firestore-init');
const db = firebase.firestore();

const auth = require('./auth');
const profileRoutes = require('./profileAPIs');

// MIDDLEWARE
const basicAPI = async (req, res, next) => {
    res.send('Hello');
}

// Be careful of the order here!
app.use('/auth', auth);
app.use('/profile', profileRoutes);
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
