import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";

import { GlobalStateInterface } from "../features/interfaces";

import friendsReducer from "../features/friends/friends.reducer";
import messagesReducer from "../features/messages/messages.reducer";
import userReducer from "../features/user/user.reducer";
import CurrentConversationReducer from "../features/current-conversation/current-conversation.reducer";

// const appReducer: Reducer<GlobalStateInterface, AnyAction | any> =
//   combineReducers({
//     messagesState: messagesReducer,
//     userState: userReducer,
//     userFriends: friendsReducer,
//     currentConversation: CurrentConversationReducer,
//   });

// const rootReducer: rootReducerType = (state, action) => {
//   if (action.type === "REQUEST_SIGN_OUT") {
//     return appReducer(undefined, action);
//   }

//   return appReducer(state, action);
// };

const rootReducer: Reducer<GlobalStateInterface, AnyAction | any> =
  combineReducers({
    messagesState: messagesReducer,
    userState: userReducer,
    userFriends: friendsReducer,
    currentConversation: CurrentConversationReducer,
  });

// type rootReducerType = (
//   S: GlobalStateInterface,
//   A: AnyAction | any
// ) => GlobalStateInterface;
export default rootReducer;
