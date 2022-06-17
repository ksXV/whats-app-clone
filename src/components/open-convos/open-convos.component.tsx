import * as React from "react";

import ClipLoader from "react-spinners/ClipLoader";

import ConversationBox from "../convo-box/convo-box.component";

import { DocumentData } from "firebase/firestore";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { User } from "firebase/auth";
import {
  selectAreUserFriendsFetching,
  selectUserFriends,
} from "../../features/friends/friends.selector";
import { selectUser } from "../../features/user/user.selector";

interface OpenConvosProps {
  userFriends: DocumentData[];
  currentUser: User | null;
  areUsersFriendsFetching: boolean;
}

const OpenConversations: React.FC<OpenConvosProps> = ({
  userFriends,
  currentUser,
  areUsersFriendsFetching,
}) => {
  const cssOptions = "margin:50% 40%;";
  return areUsersFriendsFetching ? (
    <ClipLoader size={60} color={"white"} css={cssOptions} />
  ) : (
    <div className="py-1 overflow-y-scroll flex flex-col justify-center items-center">
      {userFriends.map((friendUIDObject) => {
        return (
          <ConversationBox
            key={friendUIDObject.id}
            currentUserUID={currentUser!.uid}
            friendUID={friendUIDObject.id}
          />
        );
      })}
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  userFriends: selectUserFriends(state),
  currentUser: selectUser(state),
  areUsersFriendsFetching: selectAreUserFriendsFetching(state),
});
export default connect(mapStateToProps)(OpenConversations);
