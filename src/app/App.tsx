import * as React from "react";

import ChatPage from "../pages/chat-page/chat-page.compoent";
import SignInPage from "../pages/sign-in/sign-in.component";
import SignUpPage from "../pages/sign-up/sign-up.component";

import { useState } from "react";

import { auth, googleAuth } from "../firebase/firebase.utils";
import { signInWithPopup, signOut, User } from "firebase/auth";

import "./App.scss";

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [isUserAuthed, setisUserAuthed] = useState<Boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState<string>("sign-in");

  const signInWithGoogle = (): void => {
    signInWithPopup(auth, googleAuth).then((result) => {
      if (result.user && result.user.displayName) {
        setUser(result.user);
        setisUserAuthed(true);
      }
    });
  };
  // window.addEventListener("load", () => {
  //   console.log(auth.currentUser);
  //   if (auth.currentUser !== null) {
  //     setUser(auth.currentUser);
  //     setisUserAuthed(true);
  //   }
  // });

  return (
    <div className="display-root">
      {isUserAuthed ? (
        <ChatPage
          signUserOut={() => {
            setisUserAuthed(false);
            setCurrentPage("sign-in");
            signOut(auth);
            setUser(null);
          }}
          user={user}
        />
      ) : currentPage === "sign-in" ? (
        <SignInPage
          changeCurrentPage={() => setCurrentPage("sign-up")}
          signUserIn={() => {
            setUser(auth.currentUser);
            setisUserAuthed(true);
          }}
          signInWithGoogle={signInWithGoogle}
        />
      ) : currentPage === "sign-up" ? (
        <SignUpPage
          changeCurrentPage={() => setCurrentPage("sign-in")}
          signUserUp={() => {
            setUser(auth.currentUser);
            setisUserAuthed(true);
          }}
        />
      ) : null}
    </div>
  );
};

export default App;
