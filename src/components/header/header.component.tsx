/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

import { User } from "firebase/auth";

import "./header.styles.scss";

interface HeaderProps {
  user: User | null;
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onClick }) => {
  return (
    <div className="flex items-center justify-between w-[30%] py-[0.4rem] px-6 bg-[#1A2329]">
      <div className="w-12 h-12 items-center justify-center flex">
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
          className="cursor-pointer unselectable-text"
        />
        <BsThreeDotsVertical
          size={"28"}
          className="cursor-pointer unselectable-text"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Header;
