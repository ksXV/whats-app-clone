import { Component } from "react";

import LeftMenuHeader from "../left-menu-header/left-menu-header.component";
import LeftDrawer from "../left-drawer/left-drawer.component";
import Modal from "../modal/modal.component";
import CustomSearchBox from "../custom-search-box/custom-search-box.component";
import OpenCoversations from "../open-convos/open-convos.component";

import { User } from "firebase/auth";

import "./left-menu.styles.scss";

interface LeftMenuProps {
  user: User | null;
  logUserOut: () => void;
}
interface LeftMenuState {
  isModalHidden: boolean;
  currentDrawer: string;
  drawerElement: string;
}

class LeftMenu extends Component<LeftMenuProps, LeftMenuState> {
  constructor(props: LeftMenuProps | Readonly<LeftMenuProps>) {
    super(props);
    this.state = {
      isModalHidden: true,
      currentDrawer: "conversations-drawer",
      drawerElement: "",
    };
  }

  changeModalState = (): void => {
    this.setState((state) => ({
      isModalHidden: !state.isModalHidden,
    }));
  };

  changeToProfileDrawer = (): void => {
    this.setState({
      currentDrawer: "profile-drawer",
    });
  };

  changeToConvosDrawer = (): void => {
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
  changeToFriendsList = (): void => {
    this.setState({
      currentDrawer: "manage-friends-list",
    });
  };
  render() {
    const { isModalHidden, currentDrawer } = this.state;
    const { user, logUserOut } = this.props;
    return (
      <>
        <div className="w-[30%] h-screen border-r-[1px] border-gray-800">
          <LeftMenuHeader
            toAddConvoDrawer={this.changeToAddConvoDrawer}
            toProfileDrawer={this.changeToProfileDrawer}
            toFriendsList={this.changeToFriendsList}
            user={user}
            changeModalState={this.changeModalState}
          />
          <span>
            {!isModalHidden ? (
              <Modal isModalHidden={isModalHidden} logUserOut={logUserOut} />
            ) : null}
          </span>
          <div className="w-[100%] p-2 pl-3 bg-[#0E161A] border-y-[0.2px] border-gray-700">
            <CustomSearchBox addFriendBox={false} />
          </div>
          <OpenCoversations />
        </div>
        <LeftDrawer
          changeToConvosDrawer={this.changeToConvosDrawer}
          currentDrawer={currentDrawer}
        />
      </>
    );
  }
}

export default LeftMenu;
