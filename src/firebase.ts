import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT9PlVCH8m0TqHMsONySUYB-Xscyg2pak",
  authDomain: "parcial-02-b16d0.firebaseapp.com",
  projectId: "parcial-02-b16d0",
  storageBucket: "parcial-02-b16d0.firebasestorage.app",
  messagingSenderId: "399254538692",
  appId: "1:399254538692:web:8e9b3f0f3679e0202b7c91",
  measurementId: "G-TYKV5Y3E0D",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);