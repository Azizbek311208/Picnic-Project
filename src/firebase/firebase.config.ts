// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2tS6rLRIkuVN9hYSzNlO_h2h-pN52gYE",
  authDomain: "picnic-projectbyazizbek.firebaseapp.com",
  projectId: "picnic-projectbyazizbek",
  storageBucket: "picnic-projectbyazizbek.firebasestorage.app",
  messagingSenderId: "798761980955",
  appId: "1:798761980955:web:d22f1c0aad1b44a06894be",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
