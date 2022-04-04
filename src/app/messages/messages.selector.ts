import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectMessagesState = (state: RootState) => state.messagesState;

export const selectMessages = createSelector(
  [selectMessagesState],
  (messagesState) => messagesState.messages
);
