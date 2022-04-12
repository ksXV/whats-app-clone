import { UserTypes } from "./user.types";
import { User } from "firebase/auth";

export const getUserFromFirestore = (userData: User | null) => ({
  type: UserTypes.GET_USER_FROM_FIRESTORE,
  payload: userData,
});
