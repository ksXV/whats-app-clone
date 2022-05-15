import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { AppDispatch, store } from "../../app/store";
import { db } from "../../firebase/firebase.utils";
import { selectUser } from "../user/user.selector";
import { CurentConversationTypes } from "./current-conversation.types";

const switchToCurrentConversation = (userData: DocumentData) => ({
  type: CurentConversationTypes.SWITCH_CURRENT_CONVERSATION,
  payload: userData,
});

const getMessagesFromFirestoreStart = () => ({
  type: CurentConversationTypes.GET_CURRENT_CONVERSATION_MESSAGES_START,
});

const getMessagesFromFirestoreSuccess = (messagesArray: any) => ({
  type: CurentConversationTypes.GET_CURRENT_CONVERSATION_MESSAGES_SUCCESS,
  payload: messagesArray,
});

const getMessagesFromFirestoreFailed = (errorMessage: unknown) => ({
  type: CurentConversationTypes.GET_CURRENT_CONVERSATION_MESSAGES_FAILURE,
  payload: errorMessage,
});

export const switchToCurrentConversationAsync = (userData: DocumentData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(switchToCurrentConversation(userData));
    dispatch(getMessagesFromFirestoreStart());
    try {
      const { uid }: { uid: string } = selectUser(store.getState())!;
      const userMessagesColection = collection(
        db,
        "users",
        uid,
        "friends",
        userData.id,
        "messages"
      );
      const q = query(userMessagesColection, orderBy("dateSent", "asc"));
      onSnapshot(q, (snapShot) => {
        dispatch(getMessagesFromFirestoreSuccess(snapShot.docs));
      });
    } catch (err) {
      getMessagesFromFirestoreFailed(err);
      console.error("Something went wrong getting the messages from firestore");
    }
  };
};
