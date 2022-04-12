import { MessagesActionTypes } from "./messages.types";
import { AppDispatch } from "../../app/store";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export const convertSnapshotToMessagesStart = () => ({
  type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_START,
});
export const convertSnapshotToMessagesSuccess = (messages: DocumentData) => ({
  type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_SUCCESS,
  payload: messages,
});
export const convertSnapshotToMessagesFailure = (error: unknown) => ({
  type: MessagesActionTypes.COVERT_SNAPSHOT_TO_MESSAGES_FAILURE,
  payload: error,
});
export const convertSnapshotToMessagesAsync = (
  receivedSnapshot: QuerySnapshot<DocumentData>
) => {
  return (dispatch: AppDispatch) => {
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
