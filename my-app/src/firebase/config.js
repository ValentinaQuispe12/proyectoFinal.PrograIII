import app from "firebase/app"
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB0CghTlxjr_8wneyD8M7ANSQ9dhZOqHUg",
    authDomain: "proyectofinal-prograiii.firebaseapp.com",
    projectId: "proyectofinal-prograiii",
    storageBucket: "proyectofinal-prograiii.appspot.com",
    messagingSenderId: "824997037927",
    appId: "1:824997037927:web:935f527841e605c8ed91c2"
  };

  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth();
  export const db = app.firestore();
  export const storage = app.storage();
  