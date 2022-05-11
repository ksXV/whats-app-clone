import * as React from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

import { RootState } from "../../app/store";
import { selectUserFriends } from "../../features/friends/friends.selector";

import CustomSearchBox from "../custom-search-box/custom-search-box.component";
import LeftDrawerHeader from "../left-drawer-header/left-drawer-header.component";
import UserBox from "../user-box/user-box.component";

import { DocumentData } from "firebase/firestore";
//resolve the class slide out
interface AddConversationDrawerProps {
  changeToConvosDrawer: () => void;
  userFriends: Array<DocumentData>;
  shouldSlide: boolean;
}

const AddConversationDrawer: React.FC<AddConversationDrawerProps> = ({
  changeToConvosDrawer,
  userFriends,
  shouldSlide,
}) => {
  const [searchBoxValue, getSearchBoxValue] = useState<string>("");

  const addConvoDrawer = React.useRef<HTMLDivElement>(null);

  const userFriendsFiltered = userFriends.filter((friend) =>
    (friend.data().displayName as string)
      .toLowerCase()
      .includes(searchBoxValue.toLowerCase())
  );

  useEffect(() => {
    if (shouldSlide === true) {
      addConvoDrawer.current?.classList.add("slide-in");
    }
  }, [shouldSlide]);

  const changeToConvosDrawerSliding = (): void => {
    addConvoDrawer.current?.classList.add("slide-out");
    changeToConvosDrawer();
  };

  return (
    <div
      ref={addConvoDrawer}
      className="appear-from-left w-[30%] h-screen border-x-[1px] border-gray-800 left-0 absolute top-0 flex flex-col z-20 bg-main-color"
    >
      <LeftDrawerHeader
        changeToConvosDrawer={changeToConvosDrawerSliding}
        displayText={"Add conversation"}
      />
      <div className="p-2">
        <CustomSearchBox
          addFriendBox={true}
          onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
            getSearchBoxValue(event.currentTarget.value);
          }}
        />
      </div>
      <div className="border-x-2 border-t-2 border-gray-800 p-2 mx-3">
        {userFriends.length !== 0 ? (
          userFriendsFiltered.map((friend) => (
            <UserBox
              key={friend.id}
              userData={friend.data()}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              typeOfButton={"plus"}
            />
          ))
        ) : (
          <h1>You have no friends. Add some! {`:(`} </h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  userFriends: selectUserFriends(state),
});

export default connect(mapStateToProps)(AddConversationDrawer);
