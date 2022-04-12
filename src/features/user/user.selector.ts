import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const selectUserState = (state: RootState) => state.userState;
export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.currentUser
);
