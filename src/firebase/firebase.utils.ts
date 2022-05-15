// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { selectUserDataFromConversationData } from "../features/current-conversation/current-conversation.selector";
import { store } from "../app/store";
import { selectUser } from "../features/user/user.selector";

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
/*
We are going to get the uids from the redux state and then 
fetch them into this function and then write the messages 
into firestore with specifed keys i.e : recevied / sent 
and with the date they were sent 
and we are only going to pass an argument the text to write
*/

export async function sendMessageToFirestore(messageToWrite: string) {
  try {
    //this is our current user UID
    const { uid }: { uid: string } = selectUser(store.getState())!;

    //this is the selected user UID
    const { id } = selectUserDataFromConversationData(
      store.getState()
    ) as DocumentData;

    const friendUserDocRef = collection(
      db,
      `users/${id as string}/friends`,
      uid,
      "messages"
    );
    await addDoc(friendUserDocRef, {
      receivedMessage: messageToWrite,
      dateRecevied: new Date(),
    }).then(async () => {
      const friendUserDocRef = collection(
        db,
        `users/${uid}/friends`,
        id,
        "messages"
      );
      await addDoc(friendUserDocRef, {
        sentMessage: messageToWrite,
        dateSent: new Date(),
      });
    });
  } catch {
    console.log("Something went wrong sending the message.");
  }
}
