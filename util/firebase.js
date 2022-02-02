import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "smartnotetaker.firebaseapp.com",
  projectId: "smartnotetaker",
  storageBucket: "smartnotetaker.appspot.com",
  messagingSenderId: "1049937973606",
  appId: "1:1049937973606:web:0d4c9ee23f47dc9680b8a7",
  measurementId: "G-J97L1LB57R"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };