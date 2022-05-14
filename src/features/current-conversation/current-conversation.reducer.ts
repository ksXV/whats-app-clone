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

    default:
      return state;
  }
}

export default CurrentConversationReducer;
