// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByYD4W3tYzIRLTacH31pTnavJ0H_uzdp0",
  authDomain: "indroyd-e628d.firebaseapp.com",
  projectId: "indroyd-e628d",
  storageBucket: "indroyd-e628d.appspot.com",
  messagingSenderId: "912596983636",
  appId: "1:912596983636:web:84e88f81e3d2bed006b2c1",
  measurementId: "G-J24QT4WYG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };