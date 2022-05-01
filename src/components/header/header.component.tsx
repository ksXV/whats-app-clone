/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

import { User } from "firebase/auth";

import "./header.styles.scss";

interface HeaderProps {
  user: User | null;
  changeModalState: () => void;
  toProfileDrawer: () => void;
  toAddConvoDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  changeModalState,
  toProfileDrawer,
  toAddConvoDrawer,
}) => {
  return (
    <div className="flex items-center justify-between w-[100%] py-[0.4rem] px-3 bg-[#1A2329]">
      <div
        className="w-10 h-10 items-center justify-center flex"
        onClick={toProfileDrawer}
      >
        <img
          src={`${user!.photoURL}`}
          className="rounded-full cursor-pointer unselectable-text"
          alt="profile-picture"
        />
      </div>
      <div className="flex flex-row w-24 items-center justify-between">
        {/*Plus will add a friend and will be worked on later on*/}
        <AiOutlinePlus
          size={"28"}
          onClick={toAddConvoDrawer}
          className="cursor-pointer unselectable-text"
        />
        <BsThreeDotsVertical
          size={"28"}
          className="cursor-pointer unselectable-text"
          onClick={changeModalState}
        />
      </div>
    </div>
  );
};

export default Header;
