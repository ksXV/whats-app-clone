import { UserActionTypes } from "./user.types";

import { ActionInterface, UserStateInterface } from "../interfaces";

import { User } from "@firebase/auth";

const INTIAL_STATE: UserStateInterface = {
  currentUser: null,
};

function userReducer(
  state = INTIAL_STATE,
  action: ActionInterface<string, User | null>
): UserStateInterface {
  switch (action.type) {
    case UserActionTypes.GET_USER_FROM_FIRESTORE:
      return {
        ...state,
        currentUser: action.payload,
      };
    case "REQUEST_SIGN_OUT":
      return INTIAL_STATE;
    default:
      return state;
  }
}

export default userReducer;
