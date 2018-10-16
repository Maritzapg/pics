import React from 'react';
import ReactDOM from 'react-dom';
//import firebase from 'firebase';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

/*const config = {
    apiKey: "AIzaSyCwn8GM1AwKBK1O67t8DvlDmYEjsL2mDTc",
    authDomain: "pics-ec9a0.firebaseapp.com",
    databaseURL: "https://pics-ec9a0.firebaseio.com",
    projectId: "pics-ec9a0",
    storageBucket: "pics-ec9a0.appspot.com",
    messagingSenderId: "372781803730"
};
firebase.initializeApp(config);*/

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
