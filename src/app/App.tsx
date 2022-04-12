import * as React from "react";
import { useState } from "react";

import ChatPage from "../pages/chat-page/chat-page.compoent";
import SignInPage from "../pages/sign-in/sign-in.component";
import SignUpPage from "../pages/sign-up/sign-up.component";

import { auth, googleAuth } from "../firebase/firebase.utils";
import { signInWithPopup, signOut, User } from "firebase/auth";

import { connect } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { selectUser } from "../features/user/user.selector";
import { getUserFromFirestore } from "../features/user/user.actions";

import "./App.scss";

interface IAppProps {
  dispatch: AppDispatch;
  userData: User | null;
}

const App: React.FC<IAppProps> = ({ dispatch, userData }) => {
  const [isUserAuthed, setisUserAuthed] = useState<Boolean>(false);

  const [currentPage, setCurrentPage] = useState<string>("sign-in");

  const signInWithGoogle = (): void => {
    signInWithPopup(auth, googleAuth).then((result) => {
      if (result.user && result.user.displayName) {
        dispatch(getUserFromFirestore(auth.currentUser));
        setisUserAuthed(true);
      }
    });
  };
  return (
    <div className="display-root">
      {isUserAuthed ? (
        <ChatPage
          signUserOut={() => {
            setisUserAuthed(false);
            setCurrentPage("sign-in");
            signOut(auth);
            dispatch(getUserFromFirestore(null));
          }}
          user={userData}
        />
      ) : currentPage === "sign-in" ? (
        <SignInPage
          changeCurrentPage={() => setCurrentPage("sign-up")}
          signUserIn={() => {
            dispatch(getUserFromFirestore(auth.currentUser));
            setisUserAuthed(true);
          }}
          signInWithGoogle={signInWithGoogle}
        />
      ) : currentPage === "sign-up" ? (
        <SignUpPage
          changeCurrentPage={() => setCurrentPage("sign-in")}
          signUserUp={() => {
            dispatch(getUserFromFirestore(auth.currentUser));
            setisUserAuthed(true);
          }}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  userData: selectUser(state),
});

export default connect(mapStateToProps)(App);
