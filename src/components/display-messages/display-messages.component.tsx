import * as React from "react";
import { Message, MESSAGES_EXAMPLES } from "./MESSAGES-EXAMPLE";
import "./display-messages.styles.css";
import Messages from "../messages/messages.component";
interface DisplayMessagesProps {}
const DisplayMessages: React.FC<DisplayMessagesProps> = () => {
  return (
    <div className="messages">
      {MESSAGES_EXAMPLES.map((messageRecevied: Message) => (
        <Messages key={messageRecevied.id} {...messageRecevied} />
      ))}
    </div>
  );
};

export default DisplayMessages;
