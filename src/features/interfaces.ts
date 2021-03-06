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
}

export interface UserActionTypesInterface {
  GET_USER_FROM_FIRESTORE: string;
}

export interface GlobalStateInterface {
  messagesState: MessagesIntialStateInterface;
  userState: UserStateInterface;
  userFriends: UserFriendsStateInterface;
  currentConversation: CurrentConversationInterface;
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

export interface CurrentConversationInterface {
  currentConversationUser: DocumentData | {};
  currentConversationMessages: Array<DocumentData>;
  areMessagesFetching: boolean;
  error: unknown;
}
export interface FirebaseUserData {
  displayName: string;
  email: string;
  joined: {
    seconds: number;
    nanoseconds: number;
  };
  photoURL: string;
}
/*
Rewrite the redux logic so we have add conversation 
& and get current conversation & get all conversations;

get all conversation array > object : 
{ 

  ...user data,
  lastMessageData:{
    ...messsage data
  }
}

*/
