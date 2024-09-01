// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo9IlB1LfP9kc1YbOvPPAHqMK9gCJcXgs",
  authDomain: "tunecraft-296b2.firebaseapp.com",
  projectId: "tunecraft-296b2",
  storageBucket: "tunecraft-296b2.appspot.com",
  messagingSenderId: "347811065855",
  appId: "1:347811065855:web:b2800a943b7866c04641ca",
  measurementId: "G-RK3FXGC77J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
