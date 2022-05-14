import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const selectConversationDataFromStore = (state: RootState) =>
  state.currentConversation;

export const selectUserDataFromConversationData = createSelector(
  [selectConversationDataFromStore],
  (selectedUserData) => selectedUserData.currentConversationUser
);
