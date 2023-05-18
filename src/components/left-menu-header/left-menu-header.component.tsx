import * as React from "react";

import { RiGroupLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiMessageAdd } from "react-icons/bi";

import { User } from "firebase/auth";
import Modal from "../modal/modal.component";

interface LeftMenuHeaderProps {
  user: User;
  changeModalState: () => void;
  isModalHidden: boolean;
  toProfileDrawer: () => void;
  toAddConvoDrawer: () => void;
  toFriendsList: () => void;
  logUserOut: () => void;
}

const LeftMenuHeader: React.FC<LeftMenuHeaderProps> = ({
  user,
  isModalHidden,
  changeModalState,
  toProfileDrawer,
  toAddConvoDrawer,
  toFriendsList,
  logUserOut,
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
          alt="avatar"
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
        <span className="relative">
          <BsThreeDotsVertical
            size={"26"}
            className="cursor-pointer mx-1 unselectable-text"
            onClick={clickHandler}
          />
          {!isModalHidden ? (
            <Modal
              isModalHidden={isModalHidden}
              toProfileDrawer={toProfileDrawer}
              toFriendsList={toFriendsList}
              logUserOut={logUserOut}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
};

export default LeftMenuHeader;
