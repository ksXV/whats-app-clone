import { MessagesActionTypes } from "./messages.types";
import { AppDispatch, RootState } from "../../app/store";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

type convertSnapshotToMessagesStartType = () => { type: string };
type convertSnapshotToMessagesSuccessType = (P: DocumentData) => {
  type: string;
  payload: typeof P;
};
type convertSnapshotToMessagesFailureTypee = (P: unknown) => {
  type: string;
  payload: typeof P;
};

export const convertSnapshotToMessagesStart: convertSnapshotToMessagesStartType =
  () => ({
    type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_START,
  });
export const convertSnapshotToMessagesSuccess: convertSnapshotToMessagesSuccessType =
  (messages) => ({
    type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS,
    payload: messages,
  });
export const convertSnapshotToMessagesFailure: convertSnapshotToMessagesFailureTypee =
  (error: unknown) => ({
    type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_FAILURE,
    payload: error,
  });
export const convertSnapshotToMessagesAsync = (
  receivedSnapshot: QuerySnapshot<DocumentData>
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(convertSnapshotToMessagesStart());
      dispatch(
        convertSnapshotToMessagesSuccess(
          receivedSnapshot.docs.map((message) => message)
        )
      );
    } catch (err: unknown) {
      dispatch(convertSnapshotToMessagesFailure(err));
    }
  };
};
