import { Component, SyntheticEvent } from "react";

import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/button.component";
import InputBox from "../../components/input-box/input-box.component";
import DisplayMessages from "../../components/display-messages/display-messages.component";

import { DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "firebase/auth";
import { messagesRef, sendMessageDocRef } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { convertSnapshotToMessagesAsync } from "../../features/messages/messages.actions";
import { selectMessages } from "../../features/messages/messages.selector";
import { AppDispatch, RootState } from "../../app/store";

//@styles
import "./chat-page.styles.scss";

interface IChatPageState {
  inputMessage: string;
}
interface IChatPageProps {
  dispatch: AppDispatch;
  signUserOut: () => void;
  messages: Array<DocumentData>;
  user: User | null;
}
class ChatPage extends Component<IChatPageProps, IChatPageState> {
  state = {
    inputMessage: "",
  };
  getInputMessage = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({
      inputMessage: event.currentTarget.value,
    });
  };
  componentDidMount(): void {
    const { dispatch } = this.props;
    const q = query(messagesRef, orderBy("dateSent", "asc"));
    onSnapshot(
      q,
      (snapshot) => {
        dispatch(convertSnapshotToMessagesAsync(snapshot));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  render() {
    const { inputMessage } = this.state;
    const { user, messages, signUserOut } = this.props;
    if (user !== null) {
      return (
        <>
          <Header displayName={user.displayName} />
          <button
            onClick={() => {
              signUserOut();
            }}
          >
            {"Sign out"}
          </button>
          <div className="chat-container">
            <div className="chat-features">
              <div className="messages-container">
                <DisplayMessages messages={messages} />
              </div>
              <div className="send-messages">
                <InputBox
                  required={false}
                  className="messages-input"
                  type="text"
                  onChange={this.getInputMessage}
                  placeholder="type a message here"
                />
                <CustomButton
                  onClick={() => {
                    sendMessageDocRef(inputMessage, user!.displayName!);
                  }}
                >
                  {"Send"}
                </CustomButton>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state: RootState) => ({
  messages: selectMessages(state),
});

export default connect(mapStateToProps)(ChatPage);
