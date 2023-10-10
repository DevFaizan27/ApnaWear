import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpa5cdSO84fKhSrQe4jcTbSGUmnqMW_LE",
    authDomain: "apnawear-69d8c.firebaseapp.com",
    projectId: "apnawear-69d8c",
    storageBucket: "apnawear-69d8c.appspot.com",
    messagingSenderId: "809514753472",
    appId: "1:809514753472:web:0693d6eab533ee2074fc25",
    measurementId: "G-SCDNNTQNT3"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default firebase;