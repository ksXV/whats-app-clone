import * as React from "react";

import { BiPlus } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import { User } from "firebase/auth";

interface UserBoxProps {
  userData: User | null;
  typeOfButton: string;
  onClick: () => void;
}

const UserBox: React.FC<UserBoxProps> = ({
  userData,
  onClick,
  typeOfButton,
}) => {
  return (
    <div className="border-2 border-gray-700 px-5 py-2 justify-between rounded-md flex flex-row my-1">
      <div className="border-2 flex justify-center items-center rounded-full w-12 h-12 overflow-hidden">
        <img
          className="w-12 h-12"
          alt="profile"
          src={`${userData?.photoURL}`}
        />
      </div>
      <div className="flex flex-col w-[66%]">
        <h2 className="text-left text-lg font-bold">
          {userData?.displayName?.length! >= 16
            ? userData?.displayName?.substring(0, 16) + "..."
            : userData?.displayName}
        </h2>
        <h2 className="text-left text-sm font-normal">
          {userData?.email?.length! >= 28
            ? userData?.email?.substring(0, 28) + "..."
            : userData?.email}
        </h2>
      </div>
      {typeOfButton === "plus" ? (
        <BiPlus onClick={onClick} size={"35"} className="mt-2 cursor-pointer" />
      ) : typeOfButton === "three-dots" ? (
        <BsThreeDotsVertical
          onClick={onClick}
          size={"30"}
          className="mt-2 cursor-pointer"
        />
      ) : null}
    </div>
  );
};

export default UserBox;
