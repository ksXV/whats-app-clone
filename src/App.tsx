import * as React from "react";

import ChatPage from "./pages/chat-page/chat-page.compoent";
import SignInPage from "./pages/sign-in/sign-in.component";

import { useState } from "react";

import "./App.scss";

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUserAuthed, setisUserAuthed] = useState<Boolean>(true);

  return <>{isUserAuthed ? <SignInPage /> : <ChatPage />}</>;
};

export default App;
