import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const selectUserFriendsFromRootState = (state: RootState) => state.userFriends;

export const selectUserFriends = createSelector(
  [selectUserFriendsFromRootState],
  (userFriendsState) => userFriendsState.friends
);
export const selectAreUserFriendsFetching = createSelector(
  [selectUserFriendsFromRootState],
  (userFriendsState) => userFriendsState.areFriendsFetching
);
