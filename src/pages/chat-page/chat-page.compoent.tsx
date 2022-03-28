import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/button.component";
import InputBox from "../../components/input-box/input-box.component";
import DisplayMessages from "../../components/display-messages/display-messages.component";

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
} from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { getMessagesFromFirestoreRedux } from "../../app/messages/messages.actions";
import { AppDispatch } from "../../app/store";

import { createStructuredSelector } from "reselect";
//@styles
import "./chat-page.styles.scss";

interface IAppState {
  inputMessage: string;
  messages: Array<DocumentData>;
}
interface IAppProps {
  dispatch: AppDispatch;
}
class ChatPage extends Component<IAppProps, IAppState> {
  state = {
    inputMessage: "",
    messages: [] as Array<DocumentData>,
  };
  getInputMessage = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({
      inputMessage: event.currentTarget.value,
    });
  };
  // this will help us to subscribe/unsubscribe from the onSnapshot method from firebase;
  subscribeToSnapShotMessage = function noRef(): void {};
  componentDidMount(): void {
    // const { dispatch } = this.props;
    getMessagesFromFirestore().then((querySnapshotRecevied) => {
      querySnapshotRecevied.forEach((message) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
        // dispatch(getMessagesFromFirestoreRedux(message));
      });
    });
  }
  componentDidUpdate(): void {
    this.subscribeToSnapShotMessage();
  }

  subscribeToMessages = (): void => {
    const qu = query(messagesRef, orderBy("dateSent", "desc"), limit(1));
    this.subscribeToSnapShotMessage = onSnapshot(qu, (snapShot) => {
      snapShot.forEach((message) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      });
    });
  };

  render() {
    const { inputMessage, messages } = this.state;
    return (
      <div className="chat-root">
        <Header />
        <button
          onClick={() => {
            console.log(this.state.messages);
          }}
        >
          Test
        </button>
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
const mapStateToProps = createStructuredSelector({
  curentState: getMessagesFromFirestoreRedux,
});

export default connect(mapStateToProps)(ChatPage);
