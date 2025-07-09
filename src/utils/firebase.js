// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlM68Lcymc4gHz0yc8RQuyG63A0YERFJY",
  authDomain: "netflix-2cb4e.firebaseapp.com",
  projectId: "netflix-2cb4e",
  storageBucket: "netflix-2cb4e.firebasestorage.app",
  messagingSenderId: "402203135039",
  appId: "1:402203135039:web:d77fd8d41ce788893dfc8a",
  measurementId: "G-3PY8F32KE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();