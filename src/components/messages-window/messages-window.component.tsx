import * as React from "react";

import Messages from "../message/message.component";

interface MessagesWindowProps {
  messages: Array<any>;
}

const FAKE_MESSAGES = [
  "hello there",
  "hi",
  "how are you ?",
  "good you",
  "very good actualy i was doing some homework",
  "glad to hear",
  "hello there",
  "hi",
  "how are you ?",
  "good you",
  "very good actualy i was doing some homework",
  "glad to hear",
  "hello there",
  "hi",
  "how are you ?",
  "good you",
  "very good actualy i was doing some homework",
  "glad to hear",
];

const MessagesWindow: React.FC<MessagesWindowProps> = ({ messages }) => {
  return (
    <div className="overflow-y-scroll flex flex-col">
      {messages.map((message) => {
        return (
          <Messages
            showRight={true}
            key={message.id}
            message={message.data().sentMessage}
          />
        );
      })}
    </div>
  );
};

//upload this into a local state for now
export default MessagesWindow;
