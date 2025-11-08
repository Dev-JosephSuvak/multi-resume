import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD027ZEivrasgSQMwhcea6X-9I3OtkCtE",
  authDomain: "joseph-suvak-resume.firebaseapp.com",
  projectId: "joseph-suvak-resume",
  storageBucket: "joseph-suvak-resume.firebasestorage.app",
  messagingSenderId: "481334888583",
  appId: "1:481334888583:web:2e6c38282050cf152ed022",
  measurementId: "G-DS26NKP30M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
