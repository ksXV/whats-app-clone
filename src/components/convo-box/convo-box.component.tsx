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

type ConversationData = {
  message: string;
  isRecevied: boolean;
  dateSent: Date;
};

const ConversationBox: React.FC<ConversationBoxProps> = ({
  friendUID,
  currentUserUID,
}) => {
  const [userFriendData, setUserFriendData] = useState<DocumentData>({});
  const [messageObject, setMessageObject] = useState<ConversationData>();
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
      setMessageObject(snapshot.docs[0].data() as ConversationData);
    });
    handleUserFriendData();
    return () => {
      unsubscribe();
    };
  }, [currentUserUID, friendUID, handleUserFriendData]);
  const cssOptions = "padding :0.5rem;";
  const handleSwtichToOtherConversation = () => {
    dispatch(switchToCurrentConversationAsync(userFriendData));
  };

  return typeof userFriendData === "object" &&
    "data" in userFriendData &&
    messageObject !== undefined ? (
    <div
      onClick={handleSwtichToOtherConversation}
      className="border-y-[1px] border-r-[1px] w-[100%] hover:bg-slate-800 cursor-pointer border-gray-700 px-5 py-2 justify-start flex flex-row"
    >
      <div className="border-2 flex justify-center items-center rounded-full w-12 h-12 overflow-hidden">
        <img
          alt="profile"
          className="w-12 h-12"
          src={`${userFriendData.data().photoURL}`}
        />
      </div>
      <div className="flex self-start flex-col pl-3">
        <h2 className="text-left text-ellipsis overflow-hidden whitespace-nowrap w-30 text-xl">
          {userFriendData.data().displayName}
        </h2>
        <p className="text-left text-ellipsis overflow-hidden whitespace-nowrap w-30 text-sm text-gray-400">
          {messageObject.message}
        </p>
      </div>
    </div>
  ) : messageObject === undefined || userFriendData === undefined ? null : (
    <BeatLoader css={cssOptions} size={12} color={"white"} />
  );
};

export default ConversationBox;
