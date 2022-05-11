import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { AppDispatch, RootState } from "../../app/store";
import { db } from "../../firebase/firebase.utils";
import { FriendsActionTypes } from "./friends.types";

type convertSnapshotToUserFriendsStartType = () => {
  type: string;
};
type convertSnapshotToUserFriendsFailureType = (P: Error | unknown) => {
  type: string;
  payload: typeof P;
};

type converSnapshotToUserFriendsSuccessType = (P: Array<DocumentData>) => {
  type: string;
  payload: typeof P;
};

type clearUserFriendsStateType = () => {
  type: string;
};

export const convertSnapshotToUserFriendsStart: convertSnapshotToUserFriendsStartType =
  () => ({
    type: FriendsActionTypes.COVERT_SNAPSHOT_TO_USER_FRIENDS_START,
  });
export const convertSnapshotToUserFriendsFailure: convertSnapshotToUserFriendsFailureType =
  (error) => ({
    type: FriendsActionTypes.COVERT_SNAPSHOT_TO_USER_FRIENDS_FAILURE,
    payload: error,
  });
export const convertSnapshotToUserFriendsSuccess: converSnapshotToUserFriendsSuccessType =
  (friendsArray) => ({
    type: FriendsActionTypes.COVERT_SNAPSHOT_TO_USER_FRIENDS_SUCCESS,
    payload: friendsArray,
  });

export const clearUserFriendsState: clearUserFriendsStateType = () => ({
  type: FriendsActionTypes.CLEAR_USER_FRIENDS_STATE,
});

export const converSnapshotToUserFriendsAsync = (
  currentUserUID: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(convertSnapshotToUserFriendsStart());
      const userFriendsDocRef = collection(
        db,
        `users/${currentUserUID}/friends`
      );
      onSnapshot(userFriendsDocRef, (SnapShot) => {
        Promise.all(
          SnapShot.docs.map(async (document) => {
            const userFriendData = doc(db, "users", document.id);
            const userFriendSnapshot = await getDoc(userFriendData);
            return userFriendSnapshot;
          })
        ).then((userFriendsArray) => {
          dispatch(convertSnapshotToUserFriendsSuccess(userFriendsArray));
        });
      });
    } catch (err: unknown | Error) {
      dispatch(convertSnapshotToUserFriendsFailure(err));
    }
  };
};
