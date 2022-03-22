// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
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
export const messagesRef = collection(db, "messages");

export async function getMessagesFromFirestore() {
  //This will get  the messages
  const q = query(messagesRef, orderBy("dateSent", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export async function sendMessageDocRef(message: string) {
  //This will send messages to the firestore database
  try {
    if (message && message.length !== 0) {
      const docRef = await addDoc(messagesRef, {
        user: "John Smith",
        message: message,
        dateSent: new Date(),
      });
      if (docRef && docRef.id) {
        return "Success";
      }
    } else {
      throw Error;
    }
  } catch (err) {
    // eslint-disable-next-line no-throw-literal
    throw "Error sending message " + err;
  }
}
