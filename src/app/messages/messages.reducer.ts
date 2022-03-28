import { DocumentData } from "firebase/firestore";
import { MessagesActionTypes } from "./messages.types";

interface Action_Interface {
  type: string;
  payload: any;
}

const INTIAL_STATE: Array<DocumentData> = [];

const messagesReducer = (state = INTIAL_STATE, action: Action_Interface) => {
  switch (action.type) {
    case MessagesActionTypes.GET_MESSAGES_FROM_FIRESTORE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default messagesReducer;
