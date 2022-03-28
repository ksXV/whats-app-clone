import { combineReducers, Reducer } from "@reduxjs/toolkit";
import messagesReducer from "./messages/messages.reducer";

interface GlobalStateInterface {
  messages: Array<any>;
}

const rootReducer: Reducer<GlobalStateInterface, any> = combineReducers({
  messages: messagesReducer,
});

export default rootReducer;
