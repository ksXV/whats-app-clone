import * as React from "react";

import { RiGroupLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiMessageAdd } from "react-icons/bi";

import { User } from "firebase/auth";

interface LeftMenuHeaderProps {
  user: User;
  changeModalState: () => void;
  toProfileDrawer: () => void;
  toAddConvoDrawer: () => void;
  toFriendsList: () => void;
}

const LeftMenuHeader: React.FC<LeftMenuHeaderProps> = ({
  user,
  changeModalState,
  toProfileDrawer,
  toAddConvoDrawer,
  toFriendsList,
}) => {
  const clickHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    changeModalState();
  };
  return (
    <div className="flex items-center justify-between w-[100%] py-3 px-3 bg-[#1A2329]">
      <div
        className="w-10 h-10 items-center justify-center flex"
        onClick={toProfileDrawer}
      >
        <img
          src={`${user.photoURL}`}
          className="rounded-full cursor-pointer unselectable-text"
          alt="profile-picture"
        />
      </div>
      <div className="flex flex-row w-32 items-center justify-between">
        {/*Plus will add a friend and will be worked on later on*/}
        <RiGroupLine
          size={"26"}
          onClick={toFriendsList}
          className="cursor-pointer mx-1 unselectable-text"
        />
        <BiMessageAdd
          size={"26"}
          onClick={toAddConvoDrawer}
          className="cursor-pointer mx-1 unselectable-text"
        />
        <BsThreeDotsVertical
          size={"26"}
          className="cursor-pointer mx-1 unselectable-text"
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};

export default LeftMenuHeader;
