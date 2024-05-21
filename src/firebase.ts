// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "oauth-real-estate.firebaseapp.com",
  projectId: "oauth-real-estate",
  storageBucket: "oauth-real-estate.appspot.com",
  messagingSenderId: "811919963205",
  appId: "1:811919963205:web:81921aab9e5ebbc4b59f2c",
  measurementId: "G-1S1WELFFQH",
};

//todo: Initialize Firebase
export const app = initializeApp(firebaseConfig);
//todo: Analytic firebase
export const analytics = getAnalytics(app);
