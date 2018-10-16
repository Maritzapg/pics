import { auth } from './firebase';
import firebase from 'firebase';
// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const doSignInWithGoogle = () =>
{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    //const provider = auth.GoogleAuthProvider();
    //auth().signInWithPopup(provider)
}


// Sign out
export const doSignOut = () =>
    auth.signOut();