import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBFKouFMuODQVjlTniFU9oBXFxgkj3OC6o",
    authDomain: "react-curso-25e60.firebaseapp.com",
    projectId: "react-curso-25e60",
    storageBucket: "react-curso-25e60.appspot.com",
    messagingSenderId: "939417983640",
    appId: "1:939417983640:web:cb69e03288d79866978eed"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider, 
    firebase
}
 