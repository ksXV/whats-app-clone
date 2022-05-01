import { Component } from "react";
import { BiSearch } from "react-icons/bi";

import Header from "../header/header.component";
import InputBox from "../input-box/input-box.component";
import LeftDrawer from "../left-drawer/left-drawer.component";
import Modal from "../modal/modal.component";

import { User } from "firebase/auth";

import "./left-menu.styles.scss";

interface LeftMenuProps {
  user: User | null;
  logUserOut: () => void;
}
interface LeftMenuState {
  isModalHidden: boolean;
  currentDrawer: string;
}

class LeftMenu extends Component<LeftMenuProps, LeftMenuState> {
  state = {
    isModalHidden: true,
    currentDrawer: "conversations-drawer",
  };

  changeModalState = (): void => {
    this.setState((state) => ({
      isModalHidden: !state.isModalHidden,
    }));
  };
  changeToProfileDrawer = (): void => {
    this.setState({
      currentDrawer: "profile-drawer",
    });
    setTimeout(() => {
      const profileDrawer = document.getElementById("profile-drawer");
      profileDrawer?.classList.add("slide-in");
      if (profileDrawer?.classList.contains("slide-out")) {
        profileDrawer?.classList.remove("slide-out");
      }
    }, 50);
  };
  changeToConvosDrawer = (): void => {
    const profileDrawer = document.getElementById("profile-drawer");
    profileDrawer?.classList.add("slide-out");
    if (profileDrawer?.classList.contains("slide-in")) {
      profileDrawer?.classList.remove("slide-in");
    }
    setTimeout(() => {
      this.setState({
        currentDrawer: "conversations-drawer",
      });
    }, 300);
  };

  changeToAddConvoDrawer = (): void => {
    this.setState({
      currentDrawer: "add-conversation-drawer",
    });
  };
  render() {
    const { isModalHidden, currentDrawer } = this.state;
    const { user, logUserOut } = this.props;
    return (
      <>
        <div className="w-[30%] h-screen border-r-[1px] border-gray-800">
          <Header
            toAddConvoDrawer={this.changeToAddConvoDrawer}
            toProfileDrawer={this.changeToProfileDrawer}
            user={user}
            changeModalState={this.changeModalState}
          />
          <span>
            {!isModalHidden ? (
              <Modal isModalHidden={isModalHidden} logUserOut={logUserOut} />
            ) : null}
          </span>
          <div className="w-[100%] p-2 pl-3 bg-[#0E161A] border-y-[0.2px] border-gray-700">
            <div className="flex flex-row pl-2 border-2 py-1 border-gray-800 rounded-lg w-[100%] bg-input-color">
              <BiSearch
                size={"28"}
                className="mr-1 cursor-pointer transform hover:scale-105 transition-all duration-150"
                onClick={() => {
                  const input = document.getElementById("filter-input");
                  input?.focus();
                }}
              />
              <InputBox
                id="filter-input"
                className="bg-input-color pb-[1px] focus-visible:outline-none w-[100%]"
                type="text"
                placeholder="search for a conversation here"
                required={false}
              />
            </div>
          </div>
        </div>
        <span>
          <LeftDrawer
            changeToConvosDrawer={this.changeToConvosDrawer}
            currentDrawer={currentDrawer}
          />
        </span>
      </>
    );
  }
}

export default LeftMenu;
