import { User } from "firebase/auth";
import { UserTypes } from "./user.types";

export interface UserIS {
  currentUser: null | User;
}

const INTIAL_STATE = {
  currentUser: null,
};

function userReducer(state: any = INTIAL_STATE, action: any) {
  switch (action.type) {
    case UserTypes.GET_USER_FROM_FIRESTORE:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserTypes.SIGN_USER_OUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}

export default userReducer;
