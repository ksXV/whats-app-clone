import * as React from "react";

import ProfileDrawer from "../profile-drawer/profile-drawer.component";
import AddConversationDrawer from "../add-convo-drawer/add-convo-drawer.component";
import ManageFriendsDrawer from "../manage-friends-drawer/manage-friends-drawer.component";

interface LeftDrawerProps {
  currentDrawer: string;
  changeToConvosDrawer: () => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  currentDrawer,
  changeToConvosDrawer,
}) => {
  return (
    <span>
      {currentDrawer === "add-conversation-drawer" ? (
        <AddConversationDrawer
          shouldSlide={true}
          changeToConvosDrawer={changeToConvosDrawer}
        />
      ) : currentDrawer === "profile-drawer" ? (
        <ProfileDrawer
          shouldSlide={true}
          changeToConvosDrawer={changeToConvosDrawer}
        />
      ) : currentDrawer === "manage-friends-list" ? (
        <ManageFriendsDrawer
          shouldSlide={true}
          changeToConvosDrawer={changeToConvosDrawer}
        />
      ) : null}
    </span>
  );
};

export default LeftDrawer;
