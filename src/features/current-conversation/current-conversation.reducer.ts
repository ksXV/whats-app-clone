import { AnyAction } from "@reduxjs/toolkit";

import { CurrentConversationInterface } from "../interfaces";

import { CurentConversationTypes } from "./current-conversation.types";

const INTIAL_STATE: CurrentConversationInterface = {
  currentConversationUser: {},
  currentConversationMessages: [],
  areMessagesFetching: false,
  error: null,
};

function CurrentConversationReducer(
  state = INTIAL_STATE,
  action: AnyAction
): CurrentConversationInterface {
  switch (action.type as string) {
    case CurentConversationTypes.SWITCH_CURRENT_CONVERSATION:
      return { ...state, currentConversationUser: action.payload };
    case CurentConversationTypes.GET_CURRENT_CONVERSATION_MESSAGES_START:
      return { ...state, areMessagesFetching: true };
    case CurentConversationTypes.GET_CURRENT_CONVERSATION_MESSAGES_SUCCESS:
      return {
        ...state,
        currentConversationMessages: action.payload,
        areMessagesFetching: false,
      };
    case CurentConversationTypes.GET_CURRENT_CONVERSATION_MESSAGES_FAILURE:
      return { ...state, error: action.payload, areMessagesFetching: false };
    default:
      return state;
  }
}

export default CurrentConversationReducer;
