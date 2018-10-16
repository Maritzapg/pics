import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCwn8GM1AwKBK1O67t8DvlDmYEjsL2mDTc",
    authDomain: "pics-ec9a0.firebaseapp.com",
    databaseURL: "https://pics-ec9a0.firebaseio.com",
    projectId: "pics-ec9a0",
    storageBucket: "pics-ec9a0.appspot.com",
    messagingSenderId: "372781803730"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};