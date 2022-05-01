import * as React from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

import { connect } from "react-redux";

import { RootState } from "../../app/store";

import { selectUser } from "../../features/user/user.selector";

import { User } from "firebase/auth";

interface LeftDrawerProps {
  currentDrawer: string;
  userData: User | null;
  changeToConvosDrawer: () => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  currentDrawer,
  userData,
  changeToConvosDrawer,
}) => {
  return (
    <>
      {currentDrawer === "add-conversation-drawer" ? (
        <div onClick={function noRef() {}}>add-conversation-drawer</div>
      ) : currentDrawer === "profile-drawer" ? (
        <div
          id="profile-drawer"
          className="appear-from-left w-[30%] h-screen border-x-[1px] border-gray-800 absolute left-0 top-[100px] flex flex-col z-20 bg-main-color"
        >
          <div className="flex items-center justify-between w-[100%] py-[0.4rem] px-6 bg-[#1A2329] h-28 relative top-[-100px]">
            <h2 className="text-xl unselectable-text">Profile</h2>
            <AiOutlineArrowLeft
              className="cursor-pointer unselectable-text"
              size={"30"}
              onClick={changeToConvosDrawer}
            />
          </div>
          <div className="self-center justify-self-center flex flex-col items-center justify-center w-[100%]">
            <div className="w-44 h-44 items-center mb-5 justify-center flex">
              <img
                className="rounded-full w-44 h-44 cursor-pointer unselectable-text"
                src={`${userData!.photoURL}`}
                alt="profile-picture"
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <h1 className="text-left text-2xl px-7">{"Your name:"}</h1>
              <h2 className="text-2xl p-1 border-2 px-2 border-gray-800 mx-6 rounded-lg flex flex-row justify-between cursor-pointer font-normal">
                {userData?.displayName}
                <BsFillPencilFill className="m-2 cursor-pointer" size={"20"} />
              </h2>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userData: selectUser(state),
});

export default connect(mapStateToProps)(LeftDrawer);
