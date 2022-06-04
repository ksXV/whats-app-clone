import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import {
  collection,
  doc,
  DocumentData,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";

import { useAppDispatch } from "../../app/hooks";

import { switchToCurrentConversationAsync } from "../../features/current-conversation/current-conversation.actions";

import BeatLoader from "react-spinners/BeatLoader";

interface ConversationBoxProps {
  friendUID: string;
  currentUserUID: string;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
  friendUID,
  currentUserUID,
}) => {
  const [userFriendData, setUserFriendData] = useState<DocumentData>();
  const [messageObject, setmessageObject] = useState<DocumentData>();
  const dispatch = useAppDispatch();

  const handleUserFriendData = useCallback(() => {
    const friendDataDoc = doc(db, "users", friendUID);
    const fetchFriendData = async () => {
      const friendData = await getDoc(friendDataDoc);
      return friendData;
    };
    fetchFriendData().then((friendData) => {
      setUserFriendData(friendData);
    });
  }, [friendUID]);

  useEffect(() => {
    const messagesCol = collection(
      db,
      "users",
      currentUserUID,
      "friends",
      friendUID,
      "messages"
    );
    const q = query(messagesCol, orderBy("dateSent", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setmessageObject(snapshot.docs[0].data());
    });
    handleUserFriendData();
    return () => {
      console.log("i unsubcribed");
      unsubscribe();
    };
  }, [currentUserUID, friendUID, handleUserFriendData]);
  const cssOptions = "padding :0.5rem;";
  const handleSwtichToOtherConversation = () => {
    dispatch(switchToCurrentConversationAsync(userFriendData!));
  };

  return userFriendData !== undefined && messageObject !== undefined ? (
    <div
      onClick={handleSwtichToOtherConversation}
      className="border-y-[1px] border-r-[1px] w-[100%] hover:bg-slate-800 cursor-pointer border-gray-700 px-5 py-2 justify-start flex flex-row"
    >
      <div className="border-2 flex justify-center items-center rounded-full w-12 h-12 overflow-hidden">
        <img className="w-12 h-12" src={`${userFriendData.data().photoURL}`} />
      </div>
      <div className="flex self-start flex-col pl-3">
        <h2 className="text-left text-xl">
          {userFriendData.data().displayName.length >= 16
            ? userFriendData.data().displayName.substring(0, 10) + "..."
            : userFriendData.data().displayName}
        </h2>
        <h2 className="text-left">
          Last message:{" "}
          {messageObject.message.length >= 20
            ? messageObject.message.substring(0, 20) + "..."
            : messageObject.message}
        </h2>
      </div>
    </div>
  ) : messageObject === undefined ? null : (
    <BeatLoader css={cssOptions} size={12} color={"white"} />
  );
};

export default ConversationBox;
