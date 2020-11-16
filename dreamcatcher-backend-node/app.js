const express = require('express');
const app = express();

const db = require('./firestore-init');
const profileRoutes = require('./profileAPIs');

// MIDDLEWARE
const basicAPI = async (req, res, next) => {
    res.send('Hello');
}

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
