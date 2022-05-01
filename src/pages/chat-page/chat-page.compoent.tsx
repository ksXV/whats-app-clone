import { Component, SyntheticEvent } from "react";

import LeftMenu from "../../components/left-menu/left-menu.component";

import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { storeUserinFireStore, db } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { convertSnapshotToMessagesAsync } from "../../features/messages/messages.actions";
import { selectMessages } from "../../features/messages/messages.selector";
import { selectUser } from "../../features/user/user.selector";

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
  userData: User | null;
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
    const { userData } = this.props;
    storeUserinFireStore(userData!);
  }

  render() {
    const { inputMessage } = this.state;
    const { userData, messages, signUserOut } = this.props;
    if (userData !== null) {
      return (
        <div>
          <LeftMenu user={userData} logUserOut={signUserOut} />
          {/*Left Section*/}
          <span></span>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  messages: selectMessages(state),
  userData: selectUser(state),
});

export default connect(mapStateToProps)(ChatPage);
