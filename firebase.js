const REACT_FIREBASE_CONFIG = process.env;
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDtdEPqQ1vxsHhhqWO8JIqiMFNkFzWVYgk',
    authDomain: 'revision-be428.firebaseapp.com',
    projectId: 'revision-be428',
    storageBucket: 'revision-be428.appspot.com',
    messagingSenderId: '890040374485',
    appId: '1:890040374485:web:dcab43e10be0197e9d3e5c',
    measurementId: 'G-L5HPBS3LL9',
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
