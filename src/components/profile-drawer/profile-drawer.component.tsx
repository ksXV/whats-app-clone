import * as React from "react";
import { useState } from "react";

import LeftDrawerHeader from "../left-drawer-header/left-drawer-header.component";
import InputBox from "../input-box/input-box.component";

import { User } from "firebase/auth";

import { BsFillPencilFill } from "react-icons/bs";

import { connect } from "react-redux";

import { RootState } from "../../app/store";

import { selectUser } from "../../features/user/user.selector";
import { AiOutlineCheck } from "react-icons/ai";

import "./profile-drawer.styles.scss";

interface ProfileDrawerProps extends React.HTMLProps<HTMLDivElement> {
  userData: User | null;
  changeToConvosDrawer: () => void;
  shouldSlide: boolean;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  userData,
  changeToConvosDrawer,
  shouldSlide,
}) => {
  const [allowChangesToNameInput, setAllowChangesToNameInput] =
    useState<Boolean>(false);
  const drawerElement = React.useRef<HTMLDivElement>(null);
  const inputNameElement = React.useRef<HTMLInputElement>(null);

  const changeToConvosDrawerSliding = (): void => {
    changeToConvosDrawer();
    drawerElement.current?.classList.add("slide-out");
  };

  React.useEffect(() => {
    if (shouldSlide === true) {
      drawerElement.current?.classList.add("slide-in");
    }
    return () => {};
  }, [shouldSlide]);

  React.useEffect(() => {
    if (allowChangesToNameInput === true) {
      inputNameElement.current?.focus();
    }
    return () => {};
  }, [allowChangesToNameInput]);

  const handleAllowChangesToUserName = (): void => {
    setAllowChangesToNameInput(!allowChangesToNameInput);
  };

  return (
    <div
      ref={drawerElement}
      className="appear-from-left w-[30%] h-screen border-x-[1px] border-gray-800 absolute left-0 top-0 flex flex-col z-20 bg-main-color"
    >
      <LeftDrawerHeader
        changeToConvosDrawer={changeToConvosDrawerSliding}
        displayText={"Profile"}
      />
      <div className="self-center slide-in appear-from-left mt-16 justify-self-center flex flex-col items-center justify-center w-[100%]">
        <div className="w-36 h-36 items-center mb-5 justify-center flex">
          <img
            className="rounded-full w-36 h-36 cursor-pointer unselectable-text"
            src={`${userData!.photoURL}`}
            alt="profile-picture"
          />
        </div>
        <div className="flex flex-col w-[100%]">
          <h1 className="text-left text-2xl px-7 my-2">{"Your name:"}</h1>
          <div
            className={`p-1 border-b-2 px-2 transition-all duration-200 ${
              allowChangesToNameInput
                ? "border-green-800"
                : "border-gray-800 hover:border-green-800"
            }  mx-6 flex flex-row justify-between font-normal`}
          >
            <InputBox
              ref={inputNameElement}
              type="text"
              className="bg-main-color rounded-xl focus-visible:outline-none cursor-text"
              isDisabled={!allowChangesToNameInput}
              required={false}
              value={`${userData!.displayName!}`}
            />
            {allowChangesToNameInput ? (
              <AiOutlineCheck
                className="m-2 cursor-pointer slowly-fade-in"
                size={"20"}
                onClick={handleAllowChangesToUserName}
              />
            ) : (
              <BsFillPencilFill
                className="m-2 cursor-pointer"
                size={"19"}
                onClick={handleAllowChangesToUserName}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  userData: selectUser(state),
});

export default connect(mapStateToProps)(ProfileDrawer);
