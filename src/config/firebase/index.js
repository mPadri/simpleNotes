/**
 * npm i firebase --save
 * var firebaseConfig ini setting dari console di firebase
 */

 import firebase from 'firebase/app';
 import 'firebase/auth';
 import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCJuDPMrMkuLVGi7pL-v93oBo6Ha1l5M1s",
    authDomain: "simple-notes-8a1c1.firebaseapp.com",
    databaseURL: "https://simple-notes-8a1c1.firebaseio.com",
    projectId: "simple-notes-8a1c1",
    storageBucket: "simple-notes-8a1c1.appspot.com",
    messagingSenderId: "331973457286",
    appId: "1:331973457286:web:844b5aec78f0daad47a807",
    measurementId: "G-B0ZB3D6F5S"
  };


// const firebaseConfig = process.env.CONFIG_FIREBASE;
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export const database = firebase.database();

export default firebase;