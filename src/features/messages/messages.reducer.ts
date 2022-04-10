import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { MessagesActionTypes } from "./messages.types";

interface Action_Interface {
  readonly type: string;
  readonly payload:
    | QuerySnapshot<DocumentData>
    | Array<DocumentData>
    | unknown
    | any;
}

export interface INTIAL_STATE_Interface {
  messagesSnapshot: any;
  messages: Array<any>;
  areMessagesFetching: boolean;
  error: null;
}

const INTIAL_STATE: INTIAL_STATE_Interface = {
  messagesSnapshot: {},
  messages: [],
  areMessagesFetching: false,
  error: null,
};

const messagesReducer = (state = INTIAL_STATE, action: Action_Interface) => {
  switch (action.type) {
    case MessagesActionTypes.GET_MESSAGES_SNAPSHOT_FROM_FIRESTORE:
      return {
        ...state,
        messagesSnapshot: action.payload,
      };
    case MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_START:
      return {
        ...state,
        areMessagesFetching: true,
      };
    case MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS:
      return {
        ...state,
        areMessagesFetching: false,
        messages: action.payload,
      };
    case MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_FAILURE:
      return {
        ...state,
        areMessagesFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
