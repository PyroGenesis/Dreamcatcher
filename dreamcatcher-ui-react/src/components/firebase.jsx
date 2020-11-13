import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';
import { ContactSupportOutlined } from '@material-ui/icons';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
    measurementId:process.env.REACT_APP_MID
};

firebase.initializeApp(config);

console.log(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // console.log(additionalData.userName);
    // console.log(userAuth.user.email);

    const userReference =  firestore.doc(`users/${userAuth.user.uid}`);
    const snapShot =  await userReference.get();
    if(!snapShot.exists) {
        // const userName = additionalData.userName;
        // const email = userAuth.user.email;
        const createdAt = new Date();
        try {
            await userReference.set({
                ...additionalData,
                createdAt
            })
        } catch (error) {
            console.log(error)
        }
    }
    return userReference; 
}

export const getPositionDoc = async (userAuth, additionalData) => {
    if(!userAuth) return
}

