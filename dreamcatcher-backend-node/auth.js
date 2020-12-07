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
        about: "This user hasn't shared anything about themselves yet",
        fullname: firstName + ' ' + lastName,
        headline: "I am new to Dreamcatchers!",
        location: 'Unknown',
        // default image is a blank user image
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAgMAAACJFjxpAAAADFBMVEXFxcX////p6enW1tbAmiBwAAAFiElEQVR4AezAgQAAAACAoP2pF6kAAAAAAAAAAAAAAIDbu2MkvY0jiuMWWQoUmI50BB+BgRTpCAz4G6C8CJDrC3AEXGKPoMTlYA/gAJfwETawI8cuBs5Nk2KtvfiLW+gLfK9m+r3X82G653+JP/zjF8afP1S//y+An4/i51//AsB4aH+/QPD6EQAY/zwZwN8BAP50bh786KP4+VT+3fs4/noigEc+jnHeJrzxX+NWMDDh4g8+EXcnLcC9T8U5S/CdT8bcUeBEIrwBOiI8ki7Ba5+NrePgWUy89/nYyxQ8Iw3f+pWY4h1gb3eAW7sDTPEOsLc7wK1TIeDuDB+I/OA1QOUHv/dFsZQkhKkh4QlEfOULYz2nGj2/Nn1LmwR/86VxlCoAW6kCsHRGANx1RgCMo5Qh2EsZgrXNQZZShp5Liv7Il8eIc5C91EHY2hxk6bwYmNscZIReDBwtCdhbErC1JGBpScBcOgFMLQsZMQs5Whayd+UQsLYsZGlZyNyykKllISNmIUfAwifw8NXvTojAjGFrdYi11SGWVoeYWx1i6lmQCiEjFkKOVgjZ+xxIhZCtFULWHkCqxCw9gNQKmP9vNHzipdEPrRcxtVbAeDkAvve0iM2QozVD9hfjhp4YP/UrkJYDbD2AtBxgfSkAvvHEeNcDSAsilgtAWxIy91J8AXgZAJ5e33+4tuACcAG4AFwALgBXRXQB6AFcB5MXAuA6nl9/0Vx/011/1V5/1/dfTPJvRtdnu/zL6beeFO/7r+fXBYbrEkt/j+i6ytXfpuvvE/ZXOnsA/a3a/l5xf7O6v1t+Xe/vOyz6HpO8yyboM8o7rfJes77bru83THk48p7TvOs27zvOO6/73vO++z7l4cgnMPQzKPopHC0N9noSSz6LJp/Gk88jyicy5TOp6qlc+VyyfDJbPpuuns6XzyfMJzTmMyrrKZ35nNJ8Ums+q7af1tvPK+4nNodEnPKp3fnc8npyez67/qVP7+/fL8hfcMjfsOhf8cjfMclfcnn9+BkOnLECP8Q58OYeyJ40eoyF6Ee/En/JHlP6mIlRVXprF4BxtAvArV0AxtEuALd2ARhHuwDc2gVgHPX/hFv9fMBddjIGeKg/WCxlCsI46u+Ga5mCcJd+sIG9UkGAW32ZbApFAHhod4Bb3eo04h3god0BbiUHYApVCNjbHeBW+QDAXT4a7qg7r7e214057vg0QhkEHkoSwq0kIdydXw4/Q3H8hjYJ3vL0WConBJhCHQaOToeBrU0BljYFmEoVgHGUKgAPnREAt84IgLuqFgAYSUEOAHszDwuAtSkHAZhLGYIpdCLgKGUIHtocZG1zkLmUIRhxDnJU1RDA1uYga5uDzKUOwhTnIEfnxcDe5iBrcyQAYGlzkKkUYhhxDrKXQgxbSwLWUohhbknA1JKAEZOAvSUBW0sC1pYEzC0JmFoSMMJyCDhaFrK3JGDtyiFgaVnI3LKQqWUhI2YhR8tC9paFrC0LWVoWMrcsZGpZyIhZyNGykL2rSIGtlQHWVgZYWhlgbmWAqZUBRiwDHK0MsLcywNbKAGsOoNUhllaHmFsdYmp1iBHrEEerQ+w5gFYI2VodYm11iKXVIeYcQCuETK0QMmIh5MgBtELI3gohWyuErDmAVolZWiFkzgG0SszUKjGjfj6gVmKOVonZcwCtFbB9HQC+ozWDbz1bvGu9iKW1AuYcQOtFTLEX1GbIaFegN0OOHEBrhuw5gNYM2XIArRuz5gDacoB3bTnAEktxXQ4wfw0AvveM8b4tiJjSJOwLIsbXsAKeNeKCiOO3D+AVbUl0AfjGs8ZPbUnIdgFoa1LWC0BblfMuB9AeC1j6gqQE0J9LmC8AOYD2ZMb7i4bt2ZTpWoHfPoB7Tj2fXzT8N1X41vkq/QHOAAAAAElFTkSuQmCC'
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
