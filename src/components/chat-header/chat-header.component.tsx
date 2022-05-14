import * as React from "react";

import { FirebaseUserData } from "../../features/interfaces";

import { BsThreeDotsVertical } from "react-icons/bs";

interface ChatHeaderProps {
  conversationDataConverted: FirebaseUserData;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversationDataConverted,
}) => {
  return (
    <div className="flex flex-row items-center justify-between w-[100%] py-3 px-5 bg-[#1A2329]">
      <div className="flex flex-row justify-center items-center">
        <div
          className="w-10 h-10 items-center justify-center flex"
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <img
            src={`${conversationDataConverted.photoURL}`}
            className="rounded-full cursor-pointer unselectable-text"
            alt="profile-picture"
          />
        </div>
        <div className="px-4 pb-2">
          <h2 className="text-lg font-semibold unselectable-text">
            {conversationDataConverted.displayName}
          </h2>
        </div>
      </div>
      <BsThreeDotsVertical
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        size={"25"}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ChatHeader;
