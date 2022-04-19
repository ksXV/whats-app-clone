import { AnyAction } from "@reduxjs/toolkit";
import { MessagesIntialStateInterface } from "../interfaces";
import { MessagesActionTypes } from "./messages.types";

const INTIAL_STATE: MessagesIntialStateInterface = {
  messages: [],
  areMessagesFetching: false,
  error: null,
};

function messagesReducer(state = INTIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_START:
      return {
        ...state,
        areMessagesFetching: true,
      };
    case MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS:
      return {
        ...state,
        areMessagesFetching: false,
        messages: action.payload,
      };
    case MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_FAILURE:
      return {
        ...state,
        areMessagesFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default messagesReducer;
