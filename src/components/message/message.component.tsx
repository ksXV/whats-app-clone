import * as React from "react";

interface MessageProps extends React.HTMLAttributes<Element> {
  message: string;
  showRight: boolean;
}

const Message: React.FC<MessageProps> = ({ message, showRight }) => {
  return (
    <div
      className={` ${
        showRight
          ? "self-end bg-[#004A3C] border-[#004a3cdb] "
          : "self-start bg-[#091015] border-[#091015]"
      } w-fit p-2 border-2 rounded-xl my-1 mx-2`}
    >
      <h2 className="text-md">{message}</h2>
    </div>
  );
};

export default Message;
