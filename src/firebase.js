import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  doc, 
  onSnapshot,
  orderBy,
  limit,
  setDoc,
  getDoc
} from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBjRR0CiU6lUNJUX84gGLeLNWAhsOkdh1Q",
  authDomain: "lifetrack-298c2.firebaseapp.com",
  projectId: "lifetrack-298c2",
  storageBucket: "lifetrack-298c2.appspot.com",
  messagingSenderId: "272784721328",
  appId: "1:272784721328:web:5f69debd6d387e1d7b4275",
  measurementId: "G-XW0KTBWJVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { 
  auth, 
  db, 
  messaging,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  limit,
  setDoc,
  getDoc
};

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BPi_lkaW0lHy4LOwciWJ2M668lsUEG2QJBve_M-ZH7eYX9HDPYMLs14kHhyYhmxRiS-Z9lhfL5feM9ToyGZ5V7w"
      });
      console.log("Firebase Token:", token);
      return token;
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.log("Error getting token:", error);
  }
  return null;
};