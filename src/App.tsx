import * as React from "react";

import ChatPage from "./pages/chat-page/chat-page.compoent";
import SignInPage from "./pages/sign-in/sign-in.component";

import { useState } from "react";

import { auth, googleAuth } from "./firebase/firebase.utils";
import { signInWithPopup, User } from "firebase/auth";

import "./App.scss";

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [isUserAuthed, setisUserAuthed] = useState<Boolean>(false);

  const [user, setUser] = useState<User>();

  const signInWithGoogle = (): void => {
    signInWithPopup(auth, googleAuth).then((result) => {
      if (result.user && result.user.displayName) {
        setUser(result.user);
        setisUserAuthed(true);
      }
    });
  };

  return (
    <div className="display-root">
      {isUserAuthed ? (
        <ChatPage user={user} />
      ) : (
        <SignInPage signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  );
};

export default App;
