import React, { Component } from "react";

import LeftMenuHeader from "../left-menu-header/left-menu-header.component";
import LeftDrawer from "../left-drawer/left-drawer.component";
import Modal from "../modal/modal.component";
import CustomSearchBox from "../custom-search-box/custom-search-box.component";
import OpenCoversations from "../open-convos/open-convos.component";

import { User } from "firebase/auth";

import "./left-menu.styles.scss";
import { connect } from "react-redux";
import { selectUserFriends } from "../../features/friends/friends.selector";
import { RootState } from "../../app/store";
import { DocumentData } from "firebase/firestore";

interface LeftMenuProps {
  user: User;
  logUserOut: () => void;
  userFriends: DocumentData[];
}
interface LeftMenuState {
  isModalHidden: boolean;
  currentDrawer: string;
  drawerElement: string;
  filteredUserFriends: DocumentData[];
}

class LeftMenu extends Component<LeftMenuProps, LeftMenuState> {
  constructor(props: LeftMenuProps | Readonly<LeftMenuProps>) {
    super(props);
    this.state = {
      isModalHidden: true,
      currentDrawer: "conversations-drawer",
      drawerElement: "",
      filteredUserFriends: [],
    };
  }
  componentDidMount() {
    window.addEventListener("click", this.handleCheckIsModalOpen);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleCheckIsModalOpen);
  }
  // componentDidUpdate(prevProps: any, prevState: any) {
  //   const { userFriends } = this.props;
  //   if (this.state.filteredUserFriends.length === 0) {
  //     this.setState({
  //       filteredUserFriends: userFriends,
  //     });
  //   }
  //   console.log(this.state.filteredUserFriends);
  // }

  handleCheckIsModalOpen = () => {
    setTimeout(() => {
      if (!this.state.isModalHidden) {
        this.changeModalState();
      }
    }, 300);
  };
  changeModalState = (): void => {
    this.setState((state) => ({
      ...state,
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
  //this not working yet
  filterOpenConvosByUserName = (searchBoxValue: string) => {
    const { filteredUserFriends } = this.state;
    this.setState((prevState) => {
      return {
        ...prevState,
        filteredUserFriends: filteredUserFriends.filter((friend) =>
          (friend.data().displayName as string)
            .toLowerCase()
            .includes(searchBoxValue.toLowerCase())
        ),
      };
    });
  };
  getSeachBoxValue = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.filterOpenConvosByUserName(event.currentTarget.value);
  };
  render() {
    const { isModalHidden, currentDrawer } = this.state;
    const { user, logUserOut, userFriends } = this.props;
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
              <Modal
                isModalHidden={isModalHidden}
                toProfileDrawer={this.changeToProfileDrawer}
                toFriendsList={this.changeToFriendsList}
                logUserOut={logUserOut}
              />
            ) : null}
          </span>
          <div className="w-[100%] p-2 pl-3 bg-[#0E161A] border-y-[0.2px] border-gray-700">
            <CustomSearchBox
              addFriendBox={false}
              onChange={this.getSeachBoxValue}
            />
          </div>
          <OpenCoversations userFriends={userFriends} />
        </div>
        <LeftDrawer
          changeToConvosDrawer={this.changeToConvosDrawer}
          currentDrawer={currentDrawer}
        />
      </>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  userFriends: selectUserFriends(state),
});

export default connect(mapStateToProps)(LeftMenu);
