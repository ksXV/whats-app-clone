// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ2Rlc2-XlkpZBhVn6bQ4NfCPQkXnhVY4",
  authDomain: "chat-application-d9e4f.firebaseapp.com",
  projectId: "chat-application-d9e4f",
  storageBucket: "chat-application-d9e4f.appspot.com",
  messagingSenderId: "1027517043352",
  appId: "1:1027517043352:web:93e84272e18aafda6db6ed",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const auth = getAuth();
export const googleAuth = new GoogleAuthProvider();

export async function storeUserinFireStore(userData: User): Promise<void> {
  try {
    const { displayName, photoURL, email, uid } = userData;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists() === true) {
      console.log("does exist");
    } else {
      await setDoc(userDocRef, {
        displayName,
        photoURL,
        email,
        joined: new Date(),
      }).catch((err) => {
        console.error(err);
      });
    }
  } catch {
    console.log("Something went wrong here : storeUserinFireStore");
  }
}
