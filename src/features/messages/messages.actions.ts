import { MessagesActionTypes } from "./messages.types";
import { AppDispatch, RootState } from "../../app/store";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export const getMessagesSnapshotFromFirestore = (messagesSnapshot: any) => ({
  type: MessagesActionTypes.GET_MESSAGES_SNAPSHOT_FROM_FIRESTORE,
  payload: messagesSnapshot,
});
export const convertSnapshotToMessagesStart = () => ({
  type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_START,
});
export const convertSnapshotToMessagesSuccess = (messages: any) => ({
  type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS,
  payload: messages,
});
export const convertSnapshotToMessagesFailure = (error: any) => ({
  type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_FAILURE,
  payload: error,
});
export const convertSnapshotToMessagesAsync = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(convertSnapshotToMessagesStart());
      const {
        messagesSnapshot,
      }: { messagesSnapshot: QuerySnapshot<DocumentData> } =
        getState().messagesState;
      dispatch(
        convertSnapshotToMessagesSuccess(
          messagesSnapshot.docs.map((message) => message)
        )
      );
    } catch (err: unknown) {
      dispatch(convertSnapshotToMessagesFailure(err));
    }
  };
};
