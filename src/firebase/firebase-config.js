import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBf2Q1o-rJBiqF1mOVpF2m1s7LObj18AU4",
    authDomain: "journal-app-react-edd62.firebaseapp.com",
    projectId: "journal-app-react-edd62",
    storageBucket: "journal-app-react-edd62.appspot.com",
    messagingSenderId: "1081757423708",
    appId: "1:1081757423708:web:2d60360e65c19f7d8cae99"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}