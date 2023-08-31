// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCVYvpZiHuAkP6ZwhRS7-VVhlFTUYTrZV8",
    authDomain: "scanformenu-d0cf0.firebaseapp.com",
    databaseURL: "https://scanformenu-d0cf0-default-rtdb.firebaseio.com",
    projectId: "scanformenu-d0cf0",
    storageBucket: "scanformenu-d0cf0.appspot.com",
    messagingSenderId: "217661213412",
    appId: "1:217661213412:web:936ff900a546a94766baf1",
    measurementId: "G-6Y8BS663ZZ"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export  {analytics, database };
