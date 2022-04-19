import { User } from "firebase/auth";

export interface UserStateInterface {
  currentUser: null | User;
}
export interface MessagesIntialStateInterface {
  messages: Array<any>;
  areMessagesFetching: boolean;
  error: null;
}
export interface MessagesActionTypesInterface {
  COVERT_SNAPSHOT_TO_MESSAGES_START: string;
  COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS: string;
  COVERT_SNAPSHOT_TO_MESSAGES_FAILURE: string;
}

export interface UserActionTypesInterface {
  GET_USER_FROM_FIRESTORE: string;
  SIGN_USER_OUT: string;
}
export interface GlobalStateInterface {
  messagesState: MessagesIntialStateInterface;
  userState: UserStateInterface;
}
export interface ActionInterface<T, P> {
  type: T;
  payload: P;
}
