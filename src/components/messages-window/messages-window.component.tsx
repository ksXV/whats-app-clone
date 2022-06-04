import * as React from "react";
import { createRef } from "react";

import Messages from "../message/message.component";

import { DocumentData } from "firebase/firestore";

interface MessagesWindowProps {
  messages: Array<DocumentData>;
}
//get the focus on the last message

const MessagesWindow: React.FC<MessagesWindowProps> = ({ messages }) => {
  const divElement = createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (messages.length !== 0) {
      const divElementHeight = divElement.current!.clientHeight;
      divElement.current?.scrollTo(0, divElementHeight * Infinity);
    }
  }, [divElement, messages]);

  return (
    <div
      ref={divElement}
      className="overflow-y-scroll p-2 flex flex-col justify-start content-start h-screen"
    >
      {messages.map((message) => {
        if (message.data().isRecevied === false) {
          return (
            <Messages
              showRight={true}
              key={message.id}
              message={message.data().message}
            />
          );
        } else if (message.data().isRecevied === true) {
          return (
            <Messages
              showRight={false}
              key={message.id}
              message={message.data().message}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default MessagesWindow;
