import * as React from "react";
import "./messages.styles.scss";

interface MessagesProps {
  user: string;
  message: string;
}

const Messages: React.FC<MessagesProps> = ({ user, message }) => {
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

export default Messages;
