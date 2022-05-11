import * as React from "react";

import LeftDrawerHeader from "../left-drawer-header/left-drawer-header.component";

import { User } from "firebase/auth";

import { BsFillPencilFill } from "react-icons/bs";

import { connect } from "react-redux";

import { RootState } from "../../app/store";

import { selectUser } from "../../features/user/user.selector";

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
  const drawerElement = React.useRef<HTMLDivElement>(null);

  const changeToConvosDrawerSliding = (): void => {
    changeToConvosDrawer();
    drawerElement.current?.classList.add("slide-out");
  };

  React.useEffect(() => {
    if (shouldSlide === true) {
      drawerElement.current?.classList.add("slide-in");
    }
  }, [shouldSlide]);

  return (
    <div
      ref={drawerElement}
      className="appear-from-left w-[30%] h-screen border-x-[1px] border-gray-800 absolute left-0 top-0 flex flex-col z-20 bg-main-color"
    >
      <LeftDrawerHeader
        changeToConvosDrawer={changeToConvosDrawerSliding}
        displayText={"Profile"}
      />
      <div className="self-center mt-20 justify-self-center flex flex-col items-center justify-center w-[100%]">
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
  );
};
const mapStateToProps = (state: RootState) => ({
  userData: selectUser(state),
});

export default connect(mapStateToProps)(ProfileDrawer);
