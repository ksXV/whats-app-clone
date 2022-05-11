import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const selectUserFriendsFromRootState = (state: RootState) => state.userFriends;

export const selectUserFriends = createSelector(
  [selectUserFriendsFromRootState],
  (userFriends) => userFriends.friends
);
