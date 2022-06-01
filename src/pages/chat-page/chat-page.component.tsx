import * as React from "react";

import RightMenu from "../../components/right-menu/right-menu.component";
import LeftMenu from "../../components/left-menu/left-menu.component";

import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";

import { storeUserinFireStore } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { converSnapshotToUserFriendsAsync } from "../../features/friends/friends.action";
import { selectMessages } from "../../features/messages/messages.selector";
import { selectUser } from "../../features/user/user.selector";

import { RootState } from "../../app/store";

import "./chat-page.styles.scss";
import { useAppDispatch } from "../../app/hooks";

interface IChatPageProps {
  signUserOut: () => void;
  messages: Array<DocumentData>;
  userData: User | null;
}
const ChatPage: React.FC<IChatPageProps> = ({ userData, signUserOut }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    storeUserinFireStore(userData!);
    dispatch(converSnapshotToUserFriendsAsync(userData!.uid));
    return () => {};
  }, [userData]);

  if (userData !== null) {
    return (
      <div className="flex flex-row">
        <LeftMenu user={userData} logUserOut={signUserOut} />
        <RightMenu />
      </div>
    );
  } else {
    return null;
  }
};
const mapStateToProps = (state: RootState) => ({
  messages: selectMessages(state),
  userData: selectUser(state),
});

export default connect(mapStateToProps)(ChatPage);
