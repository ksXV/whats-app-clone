import * as React from "react";
import { useEffect, useState } from "react";

import ChatPage from "../pages/chat-page/chat-page.compoent";
import SignInPage from "../pages/sign-in/sign-in.component";
import SignUpPage from "../pages/sign-up/sign-up.component";

import { auth, googleAuth } from "../firebase/firebase.utils";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

import { connect } from "react-redux";

import { useAppDispatch } from "./hooks";

import { AppDispatch, RootState } from "./store";

import { selectUser } from "../features/user/user.selector";
import { getUserFromFirestore } from "../features/user/user.actions";

import "./App.scss";

interface IAppProps {
  dispatch: AppDispatch;
  userData: User | null;
}

const App: React.FC<IAppProps> = ({ userData }) => {
  const dispatch = useAppDispatch();
  const [isUserAuthed, setisUserAuthed] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("sign-in");

  const signInWithGoogle = (): void => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, googleAuth).then((result) => {
        if (result.user && result.user.displayName) {
          dispatch(getUserFromFirestore(auth.currentUser));
          setisUserAuthed(true);
        }
      });
    });
  };

  useEffect((): void => {
    if (userData === null) {
      const sessionStorageKeys = Object.keys(window.sessionStorage);
      if (sessionStorageKeys.length !== 0) {
        const userKey = sessionStorageKeys.filter((item) =>
          item.includes("firebase")
        );
        const userData = JSON.parse(window.sessionStorage.getItem(userKey[0])!);
        dispatch(getUserFromFirestore(userData));
        setisUserAuthed(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isUserAuthed ? (
    <ChatPage
      signUserOut={() => {
        setisUserAuthed(false);
        setCurrentPage("sign-in");
        signOut(auth);
        dispatch(getUserFromFirestore(null));
      }}
    />
  ) : currentPage === "sign-in" ? (
    <div className="display-root bg-secondary-color">
      <SignInPage
        changeCurrentPage={() => setCurrentPage("sign-up")}
        signUserIn={() => {
          dispatch(getUserFromFirestore(auth.currentUser));
          setisUserAuthed(true);
        }}
        signInWithGoogle={signInWithGoogle}
      />
    </div>
  ) : currentPage === "sign-up" ? (
    <div className="display-root bg-secondary-color">
      <SignUpPage
        changeCurrentPage={() => setCurrentPage("sign-in")}
        signUserUp={() => {
          dispatch(getUserFromFirestore(auth.currentUser));
          setisUserAuthed(true);
        }}
      />
    </div>
  ) : null;
};

const mapStateToProps = (state: RootState) => ({
  userData: selectUser(state),
});

export default connect(mapStateToProps)(App);
