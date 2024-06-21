// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfjGivVY_AEL4L_XirRS4KILSmCFLal2g",
  authDomain: "labfer202.firebaseapp.com",
  projectId: "labfer202",
  storageBucket: "labfer202.appspot.com",
  messagingSenderId: "847404764277",
  appId: "1:847404764277:web:5449b653435f64a8547c3c",
  measurementId: "G-VY3QBLYSBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const storage = getStorage();
