import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDC9hwpRnEa_IWe058zG7ec_lZFHFRx5Yc",
  authDomain: "my-splash-35351.firebaseapp.com",
  projectId: "my-splash-35351",
  storageBucket: "my-splash-35351.firebasestorage.app",
  messagingSenderId: "816389364045",
  appId: "1:816389364045:web:0e2462868f3dff19763f04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth();

//db
export const db = getFirestore(app);
