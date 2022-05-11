import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";

import { GlobalStateInterface } from "../features/interfaces";

import friendsReducer from "../features/friends/friends.reducer";
import messagesReducer from "../features/messages/messages.reducer";
import userReducer from "../features/user/user.reducer";

const rootReducer: Reducer<GlobalStateInterface, AnyAction | any> =
  combineReducers({
    messagesState: messagesReducer,
    userState: userReducer,
    userFriends: friendsReducer,
  });

export default rootReducer;
