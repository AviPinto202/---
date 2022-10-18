// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCPBZF9SUbNgLZ0v1J7vRR6TiUwuIYs0PA",
    authDomain: "planmyday-57327.firebaseapp.com",
    projectId: "planmyday-57327",
    storageBucket: "planmyday-57327.appspot.com",
    messagingSenderId: "730957406560",
    appId: "1:730957406560:web:46fc908284f3b0427cbe05",
    measurementId: "G-V4DWQKMPL3",
    databaseURL: "https://planmyday-57327-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth();