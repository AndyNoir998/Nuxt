// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8FdCB8iDRVq7vkVzlwUxUmnrPcOPUCno",
  authDomain: "app-light-1a74e.firebaseapp.com",
  projectId: "app-light-1a74e",
  storageBucket: "app-light-1a74e.appspot.com",
  messagingSenderId: "65635132571",
  appId: "1:65635132571:web:5320376a04dd0f1501d23e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };