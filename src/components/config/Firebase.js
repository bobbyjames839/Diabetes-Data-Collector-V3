// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6nHFrEfvBBUfHJJOV3GJzusf3mQT-sUw",
  authDomain: "diabetes-99312.firebaseapp.com",
  projectId: "diabetes-99312",
  storageBucket: "diabetes-99312.appspot.com",
  messagingSenderId: "1059463476068",
  appId: "1:1059463476068:web:0c93f0783a0e031d978071"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
