import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnaLEr5pWnXwBYCvpb-3YFtSC97V3VnVg",
  authDomain: "tinder-clone-9c90d.firebaseapp.com",
  projectId: "tinder-clone-9c90d",
  storageBucket: "tinder-clone-9c90d.appspot.com",
  messagingSenderId: "822996900107",
  appId: "1:822996900107:web:faf168d87001f959c02a0e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
