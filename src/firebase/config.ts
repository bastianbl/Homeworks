import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD00zO18r0pEALGxk1eeMRIxjMMMjI7RA4",
  authDomain: "challenge07-ed0ef.firebaseapp.com",
  projectId: "challenge07-ed0ef",
  storageBucket: "challenge07-ed0ef.appspot.com", 
  messagingSenderId: "482227344015",
  appId: "1:482227344015:web:a78b941ba20fd8451a56fa",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
