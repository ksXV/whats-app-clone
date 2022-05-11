import * as React from "react";

import ChatHeader from "../chat-header/chat-header.component";
import TextMessagesInput from "../text-messages-input/text-messages-input.component";

interface RightMenuProps {}

const RightMenu: React.FC<RightMenuProps> = () => {
  return (
    <div className="flex flex-col justify-between w-[70%] h-screen">
      <ChatHeader />
      {/* DisplayMessages */}
      <div></div>
      <TextMessagesInput />
    </div>
  );
};

export default RightMenu;
