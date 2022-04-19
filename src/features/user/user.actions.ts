import { User } from "firebase/auth";

import { UserActionTypes } from "./user.types";

export type getUserFromFirestoreType = (P: User | null) => {
  type: string;
  payload: User | null;
};

export const getUserFromFirestore: getUserFromFirestoreType = (userData) => ({
  type: UserActionTypes.GET_USER_FROM_FIRESTORE,
  payload: userData,
});
