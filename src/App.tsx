import Header from "./components/header/header.component";
import CustomButton from "./components/custom-button/button.component";
import InputBox from "./components/input-box/input-box.component";
import DisplayMessages from "./components/display-messages/display-messages.component";

import { Component, SyntheticEvent } from "react";

import {
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getMessagesFromFirestore,
  messagesRef,
  sendMessageDocRef,
} from "./firebase/firebase.utils";

import "./App.css";

interface IAppState {
  inputMessage: string;
  messages: Array<DocumentData>;
}
interface IAppProps {}
class App extends Component<IAppProps, IAppState> {
  state = {
    inputMessage: "",
    messages: [] as any,
  };
  getInputMessage = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      inputMessage: event.currentTarget.value,
    });
  };
  unsub = function noRef(): void {};
  componentDidMount() {
    getMessagesFromFirestore().then((querySnapshotRecevied) => {
      querySnapshotRecevied.forEach((message) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      });
    });
  }
  componentDidUpdate() {
    // console.log("i UPDATED");
    this.unsub();
  }
  subscribeToMessages = () => {
    const qu = query(messagesRef, orderBy("dateSent", "desc"), limit(1));
    this.unsub = onSnapshot(qu, (snapShot) => {
      snapShot.forEach((message) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      });
    });
  };

  render() {
    const { inputMessage, messages } = this.state;
    // console.log(messages);
    return (
      <div className="chat-root">
        <Header />
        <div className="chat-container">
          <div className="chat-features">
            <div className="messages-container">
              <DisplayMessages messages={messages} />
            </div>
            <div className="send-messages">
              <InputBox
                className="messages-input"
                type="text"
                onChange={this.getInputMessage}
                placeholder="type a message here"
              />
              <CustomButton
                onClick={() => {
                  sendMessageDocRef(inputMessage);
                  this.subscribeToMessages();
                }}
              >
                {"Send"}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
