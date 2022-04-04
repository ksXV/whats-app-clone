import { combineReducers, Reducer } from "@reduxjs/toolkit";

import { INTIAL_STATE_Interface } from "./messages/messages.reducer";
import messagesReducer from "./messages/messages.reducer";

interface GlobalStateInterface {
  messagesState: INTIAL_STATE_Interface;
}

const rootReducer: Reducer<GlobalStateInterface, any> = combineReducers({
  messagesState: messagesReducer,
});

export default rootReducer;
