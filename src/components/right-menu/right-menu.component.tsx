import * as React from "react";
import { useEffect, useState } from "react";

import { connect } from "react-redux";

import { RootState } from "../../app/store";

import {
  selectMessagesFromConversationData,
  selectUserDataFromConversationData,
} from "../../features/current-conversation/current-conversation.selector";

import ChatHeader from "../chat-header/chat-header.component";
import MessagesWindow from "../messages-window/messages-window.component";
import TextMessagesInput from "../text-messages-input/text-messages-input.component";

import { DocumentData } from "firebase/firestore";
import { sendMessageToFirestore } from "../../firebase/firebase.utils";

interface RightMenuProps {
  selectedUserData: DocumentData;

  currentMessages: Array<DocumentData>;
}

const RightMenu: React.FC<RightMenuProps> = ({
  selectedUserData,
  currentMessages,
}) => {
  const [isChatShowing, setIsChatShowing] = useState<boolean>(false);
  const [textFromTextBox, setTextFromTextBox] = useState<string>("");

  const listenToTextBox = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTextFromTextBox(event.currentTarget.value);
  };

  useEffect(() => {
    if (Object.keys(selectedUserData).length !== 0) {
      setIsChatShowing(true);
    } else {
      setIsChatShowing(false);
    }
    return () => setIsChatShowing(false);
  }, [selectedUserData]);
  return (
    <div
      className={`w-[70%] h-screen flex ${
        isChatShowing
          ? "flex-col justify-between"
          : "justify-center items-center"
      }`}
    >
      {Object.keys(selectedUserData).length !== 0 ? (
        <>
          <ChatHeader conversationDataConverted={selectedUserData.data()} />
          <MessagesWindow messages={currentMessages} />
          <TextMessagesInput
            sendMessage={() => {
              sendMessageToFirestore(textFromTextBox);
            }}
            onInputChange={listenToTextBox}
          />
        </>
      ) : (
        <h2 className="font-bold text-lg">
          Select a conversation from the left menu.
        </h2>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedUserData: selectUserDataFromConversationData(state),
  currentMessages: selectMessagesFromConversationData(state),
});
export default connect(mapStateToProps)(RightMenu);
