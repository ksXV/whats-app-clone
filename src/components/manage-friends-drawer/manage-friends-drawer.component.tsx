import React, { useEffect, useMemo, useRef, useState } from "react";

import CustomSearchBox from "../custom-search-box/custom-search-box.component";
import LeftDrawerHeader from "../left-drawer-header/left-drawer-header.component";
import UserBox from "../user-box/user-box.component";

import {
  addFriendFunction,
  searchUserByDisplayName,
} from "../../firebase/firebase.utils";
import { DocumentData } from "firebase/firestore";

import debounce from "lodash.debounce";

import { selectUser } from "../../features/user/user.selector";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

import { connect } from "react-redux";

import { User } from "firebase/auth";
import { converSnapshotToUserFriendsAsync } from "../../features/friends/friends.action";
import { selectUserFriends } from "../../features/friends/friends.selector";

interface MFDProps {
  changeToConvosDrawer: () => void;
  currentUser: User | null;
  userFriends: Array<DocumentData>;
  shouldSlide: boolean;
}

const ManageFriendsDrawer: React.FC<MFDProps> = ({
  changeToConvosDrawer,
  currentUser,
  userFriends,
  shouldSlide,
}) => {
  const [addFriendBoxValue, setAddFriendBoxValue] = useState<string>("");
  const [usersFound, setUsersFound] = useState<Array<DocumentData>>([]);
  const drawerElement = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldSlide === true) {
      if (drawerElement != null && drawerElement.current !== null)
        drawerElement.current.classList.add("slide-in");
    }
  }, [shouldSlide]);

  useEffect(() => {
    if (addFriendBoxValue.length !== 0) {
      searchUserByDisplayName(addFriendBoxValue).then((docRef) => {
        setUsersFound(docRef.docs);
      });
    }
  }, [addFriendBoxValue]);

  useEffect(() => {
    if (userFriends.length === 0) {
      dispatch(converSnapshotToUserFriendsAsync(currentUser!.uid));
    }
  }, [currentUser, dispatch, userFriends.length]);

  const changeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setAddFriendBoxValue((event.target as HTMLInputElement).value);
  };

  const debounceChangeHandler = useMemo(
    () =>
      debounce((myEvent: React.SyntheticEvent<HTMLInputElement>) => {
        changeHandler(myEvent);
      }, 300),
    []
  );

  const changeToConvosDrawerSliding = (): void => {
    changeToConvosDrawer();
    if (drawerElement !== null && drawerElement.current !== null)
      drawerElement.current.classList.add("slide-out");
  };

  return (
    <div
      ref={drawerElement}
      className="appear-from-left w-[30%] h-screen border-x-[1px] border-gray-800 left-0 absolute top-0 flex flex-col z-20 bg-main-color"
    >
      <LeftDrawerHeader
        changeToConvosDrawer={changeToConvosDrawerSliding}
        displayText={"Your friends"}
      />
      <div className="p-2">
        <CustomSearchBox addFriendBox={true} onChange={debounceChangeHandler} />
      </div>
      <div className="px-3 py-2 h-20">
        {addFriendBoxValue.length === 0 ? (
          <h1 className="text-center text-xl font-bold p-3">
            Add a friend up there.
          </h1>
        ) : addFriendBoxValue.length !== 0 && usersFound.length !== 0 ? (
          usersFound.map((documentData: DocumentData) => (
            <UserBox
              key={documentData.id}
              userData={documentData.data()}
              onClick={() =>
                addFriendFunction(currentUser!.uid, documentData.id)
              }
              typeOfButton={"plus"}
            />
          ))
        ) : (
          <h1 className="text-center text-xl font-bold p-3">
            Could not find the user.
          </h1>
        )}
      </div>
      <span className="border-[1px] border-gray-700 my-2"></span>
      <div className="border-x-2 border-gray-800 p-2 mx-2 overflow-y-scroll">
        {userFriends.length !== 0 ? (
          userFriends.map((friend) => (
            <UserBox
              key={friend.id}
              userData={friend.data()}
              onClick={function(): void {
                throw new Error("Function not implemented.");
              }}
              typeOfButton={"three-dots"}
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
  currentUser: selectUser(state),
  userFriends: selectUserFriends(state),
});

export default connect(mapStateToProps)(ManageFriendsDrawer);
