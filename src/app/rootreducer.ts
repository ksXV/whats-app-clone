import { combineReducers, Reducer } from "@reduxjs/toolkit";

import { INTIAL_STATE_Interface } from "../features/messages/messages.reducer";
import messagesReducer from "../features/messages/messages.reducer";
import userReducer, { UserIS } from "../features/user/user.reducer";

interface GlobalStateInterface {
  messagesState: INTIAL_STATE_Interface;
  userState: UserIS;
}

const rootReducer: Reducer<GlobalStateInterface, any> = combineReducers({
  messagesState: messagesReducer,
  userState: userReducer,
});

export default rootReducer;
