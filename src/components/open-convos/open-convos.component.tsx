import * as React from "react";
import { useEffect, useState } from "react";

import ConversationBox from "../convo-box/convo-box.component";

import { db } from "../../firebase/firebase.utils";

import {
  collection,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { User } from "firebase/auth";
import { selectUserFriends } from "../../features/friends/friends.selector";
import { selectUser } from "../../features/user/user.selector";

interface OpenConvosProps {
  userFriends: DocumentData[];
  currentUser: User | null;
}

const OpenConversations: React.FC<OpenConvosProps> = ({
  userFriends,
  currentUser,
}) => {
  return (
    <div className="p-2 overflow-y-scroll">
      {userFriends.map((friendUIDObject) => {
        console.log(friendUIDObject);
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
});
export default connect(mapStateToProps)(OpenConversations);
