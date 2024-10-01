// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-536d6.firebaseapp.com",
  projectId: "real-estate-536d6",
  storageBucket: "real-estate-536d6.appspot.com",
  messagingSenderId: "15334488675",
  appId: "1:15334488675:web:7819b3f389e0169efc9656",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
