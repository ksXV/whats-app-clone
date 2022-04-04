import * as React from "react";

import Messages from "../messages/messages.component";

import { DocumentData } from "firebase/firestore";

import "./display-messages.styles.scss";

interface DisplayMessagesProps {
  messages: Array<any>;
}
const DisplayMessages: React.FC<DisplayMessagesProps> = ({ messages }) => {
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
