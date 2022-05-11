import { User } from "firebase/auth";

import { DocumentData } from "firebase/firestore";

export interface UserStateInterface {
  currentUser: null | User;
}
export interface MessagesIntialStateInterface {
  messages: Array<DocumentData>;
  areMessagesFetching: boolean;
  error: null | Error;
}
export interface MessagesActionTypesInterface {
  COVERT_SNAPSHOT_TO_MESSAGES_START: string;
  COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS: string;
  COVERT_SNAPSHOT_TO_MESSAGES_FAILURE: string;
}

export interface FriendsActionTypesInterface {
  COVERT_SNAPSHOT_TO_USER_FRIENDS_START: string;
  COVERT_SNAPSHOT_TO_USER_FRIENDS_SUCCESS: string;
  COVERT_SNAPSHOT_TO_USER_FRIENDS_FAILURE: string;
  CLEAR_USER_FRIENDS_STATE: string;
}

export interface UserActionTypesInterface {
  GET_USER_FROM_FIRESTORE: string;
  SIGN_USER_OUT: string;
}
export interface GlobalStateInterface {
  messagesState: MessagesIntialStateInterface;
  userState: UserStateInterface;
  userFriends: UserFriendsStateInterface;
}

export interface UserFriendsStateInterface {
  friends: Array<DocumentData>;
  areFriendsFetching: boolean;
  error: null | Error;
}

export interface ActionInterface<T, P> {
  type: T;
  payload: P;
}
