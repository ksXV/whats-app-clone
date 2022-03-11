import * as React from "react";
import "./messages.styles.css";

interface MessagesSentProps {
  user: string;
  message: string;
}

const MessagesSent: React.FC<MessagesSentProps> = ({ user, message }) => {
  return (
    <div className="messages-recevied">
      <div className="user">
        <h3>{`${user}:`}</h3>
      </div>
      <div className="message">
        <h4>{message}</h4>
      </div>
    </div>
  );
};

export default MessagesSent;
