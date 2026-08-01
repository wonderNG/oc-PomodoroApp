import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApPICDzpwLilMdZGqoRbvI-LQSYENXCeA",
  authDomain: "oc-pomodoro-app.firebaseapp.com",
  projectId: "oc-pomodoro-app",
  storageBucket: "oc-pomodoro-app.firebasestorage.app",
  messagingSenderId: "538389767459",
  appId: "1:538389767459:web:b91235fb3ca777c1865896"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);