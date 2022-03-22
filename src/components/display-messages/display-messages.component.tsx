import * as React from "react";

import { DocumentData } from "firebase/firestore";

import Messages from "../messages/messages.component";

import "./display-messages.styles.css";

interface DisplayMessagesProps {
  messages: Array<DocumentData>;
}
const DisplayMessages: React.FC<DisplayMessagesProps> = ({ messages }) => {
  // console.log(messages);
  return (
    <div className="messages">
      {messages.map((message: DocumentData) => {
        return (
          <Messages
            key={message.id}
            user={message.data().user}
            message={message.data().message}
          />
        );
      })}
    </div>
  );
};

//upload this into a local state for now
export default DisplayMessages;
