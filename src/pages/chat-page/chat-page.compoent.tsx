import { Component, SyntheticEvent } from "react";

import Header from "../../components/header/header.component";
import Modal from "../../components/modal/modal.component";
import CustomButton from "../../components/custom-button/button.component";
import InputBox from "../../components/input-box/input-box.component";
import DisplayMessages from "../../components/display-messages/display-messages.component";

import { DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "firebase/auth";
import { messagesRef, sendMessageDocRef } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { BiSearch } from "react-icons/bi";

import { convertSnapshotToMessagesAsync } from "../../features/messages/messages.actions";
import { selectMessages } from "../../features/messages/messages.selector";
import { AppDispatch, RootState } from "../../app/store";

//@styles
import "./chat-page.styles.scss";

interface IChatPageState {
  inputMessage: string;
  isModalHidden: boolean;
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
    isModalHidden: true,
  };
  getInputMessage = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({
      inputMessage: event.currentTarget.value,
    });
  };

  changeModalState = (): void => {
    this.setState((state) => ({
      isModalHidden: !state.isModalHidden,
    }));
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
    const { inputMessage, isModalHidden } = this.state;
    const { user, messages, signUserOut } = this.props;
    if (user !== null) {
      return (
        <div className="">
          <Header user={user} onClick={this.changeModalState} />
          <span>
            {!isModalHidden ? <Modal logUserOut={signUserOut} /> : null}
          </span>
          <div className="w-[30%] p-2 bg-[#0E161A] border-y-[0.2px] border-gray-700">
            <div className="flex flex-row pl-2 border-2 py-1 border-gray-800 rounded-lg w-[100%] bg-input-color">
              <BiSearch size={"28"} className="mr-1" />
              <InputBox
                className="bg-input-color focus-visible:outline-none w-[100%]"
                type="text"
                placeholder="search for a conversation here"
                required={false}
              />
            </div>
          </div>
        </div>
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
