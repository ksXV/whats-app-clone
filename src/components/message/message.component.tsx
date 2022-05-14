import * as React from "react";

interface MessageProps extends React.HTMLAttributes<Element> {
  message: string;
  showRight?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, showRight }) => {
  return (
    <div
      className={` ${
        showRight ? "self-end" : ""
      } w-fit bg-[#004A3C] border-[#004a3cdb] p-2 border-2 rounded-xl m-2`}
    >
      <h2>{message}</h2>
    </div>
  );
};

export default Message;
