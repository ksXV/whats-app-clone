import * as React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
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
            src={
              "https://i.pinimg.com/originals/06/8c/e3/068ce387d4a2d024d63f3b17ce77cd98.jpg"
            }
            className="rounded-full cursor-pointer unselectable-text"
            alt="profile-picture"
          />
        </div>
        <div className="px-4 pb-2">
          <h2 className="text-lg font-semibold unselectable-text">George</h2>
        </div>
      </div>
      <BsThreeDotsVertical size={"25"} className="cursor-pointer" />
    </div>
  );
};

export default ChatHeader;
