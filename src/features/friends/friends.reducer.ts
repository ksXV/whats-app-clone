import { AnyAction } from "@reduxjs/toolkit";
import { UserFriendsStateInterface } from "../interfaces";

import { FriendsActionTypes } from "./friends.types";

const INTIAL_STATE: UserFriendsStateInterface = {
  friends: [],
  areFriendsFetching: false,
  error: null,
};

function friendsReducer(
  state = INTIAL_STATE,
  action: AnyAction
): UserFriendsStateInterface {
  switch (action.type) {
    case FriendsActionTypes.COVERT_SNAPSHOT_TO_USER_FRIENDS_START:
      return { ...state, areFriendsFetching: true };
    case FriendsActionTypes.COVERT_SNAPSHOT_TO_USER_FRIENDS_SUCCESS:
      return { ...state, areFriendsFetching: false, friends: action.payload };
    case FriendsActionTypes.COVERT_SNAPSHOT_TO_USER_FRIENDS_FAILURE:
      return { ...state, areFriendsFetching: false, error: action.payload };
    case "REQUEST_SIGN_OUT":
      return INTIAL_STATE;
    default:
      return state;
  }
}

export default friendsReducer;
