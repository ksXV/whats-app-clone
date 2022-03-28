import { MessagesActionTypes } from "./messages.types";

export const getMessagesFromFirestoreRedux = (messages: any) => ({
  type: MessagesActionTypes.GET_MESSAGES_FROM_FIRESTORE,
  payload: messages,
});
