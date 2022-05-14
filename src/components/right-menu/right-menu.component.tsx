import * as React from "react";
import { useEffect, useState } from "react";

import { DocumentData } from "firebase/firestore";

import { connect } from "react-redux";

import { RootState } from "../../app/store";

import { selectUserDataFromConversationData } from "../../features/current-conversation/current-conversation.selector";
import { selectUser } from "../../features/user/user.selector";

import ChatHeader from "../chat-header/chat-header.component";
import MessagesWindow from "../messages-window/messages-window.component";
import TextMessagesInput from "../text-messages-input/text-messages-input.component";

import { User } from "firebase/auth";
import { sendTextToSelectedUser } from "../../firebase/firebase.utils";

interface RightMenuProps {
  selectedUserData: DocumentData;
  currentUser: User | null;
}

const RightMenu: React.FC<RightMenuProps> = ({
  selectedUserData,
  currentUser,
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
  // console.log(selectedUserData);
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
          <MessagesWindow messages={[]} />
          <TextMessagesInput
            sendMessage={() => {
              sendTextToSelectedUser(
                currentUser!.uid,
                selectedUserData.id,
                textFromTextBox
              );
            }}
            onInputChange={listenToTextBox}
          />
        </>
      ) : (
        <h2>Select a conversation from the left menu.</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedUserData: selectUserDataFromConversationData(state),
  currentUser: selectUser(state),
});
export default connect(mapStateToProps)(RightMenu);
