import Header from "./components/header/header.component";
import CustomButton from "./components/custom-button/button.component";
import InputBox from "./components/input-box/input-box.component";
import DisplayMessages from "./components/display-messages/display-messages.component";
import "./App.css";
function App() {
  return (
    <div className="chat-root">
      <Header />
      <div className="chat-container">
        <div className="chat-features">
          <div className="messages-container">
            <DisplayMessages />
          </div>
          <div className="send-messages">
            <InputBox
              className="messages-input"
              type="text"
              placeholder="type a message here"
            />
            <CustomButton>{"Send"}</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
