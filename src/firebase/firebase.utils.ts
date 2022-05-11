// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
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
    if (userDocSnap.exists() === false) {
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

export async function searchUserByDisplayName(userEmail: string) {
  const userDocRef = collection(db, "users");
  const q = query(userDocRef, where("email", "==", userEmail));
  const docRef = await getDocs(q);
  return docRef;
}

export async function addFriendFunction(
  userUID: string,
  userToBeAddedUID: string
) {
  if (userUID !== userToBeAddedUID) {
    const userFriendDocRef = doc(
      db,
      `users/${userUID}/friends`,
      userToBeAddedUID
    );
    const userFriendSnap = await getDoc(userFriendDocRef);
    if (userFriendSnap.exists() === false) {
      await setDoc(userFriendDocRef, {
        isFriends: true,
      }).then(async () => {
        const friendUserDocRef = doc(
          db,
          `users/${userToBeAddedUID}/friends`,
          userUID
        );
        const friendUserSnap = await getDoc(friendUserDocRef);
        if (friendUserSnap.exists() === false) {
          await setDoc(friendUserDocRef, {
            isFriends: true,
          });
        }
      });
    } else {
      throw new Error("You already added this person.");
    }
  } else {
    throw new Error("You can't add yourself dummy!");
  }
}
