// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi8C8mEbzkZlppDw6ekWIycDi_ZnyR5Tc",
  authDomain: "eventspot-19f51.firebaseapp.com",
  projectId: "eventspot-19f51",
  storageBucket: "eventspot-19f51.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);