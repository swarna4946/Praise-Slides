import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIjLCVUDTUg4KHatUmUByciKEeKjxJn18",
  authDomain: "praise-slides.firebaseapp.com",
  projectId: "praise-slides",
  storageBucket: "praise-slides.firebasestorage.app",
  messagingSenderId: "847935205379",
  appId: "1:847935205379:web:0fc71fee5ec9568bf51e36"
};

const app = initializeApp(firebaseConfig);

// Create Firestore database instance
export const db = getFirestore(app);