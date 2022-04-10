import { Component } from "react";

import InputBox from "../../components/input-box/input-box.component";
import CustomButton from "../../components/custom-button/button.component";

import { auth } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import "./sign-up.styles.scss";

interface SignUpPageProps {
  changeCurrentPage: () => void;
  signUserUp: () => void;
}

interface SignUpPageState {
  email: string;
  password: string;
  username: string;
}

class SignUpPage extends Component<SignUpPageProps, SignUpPageState> {
  state = {
    email: "",
    password: "",
    username: "",
  };

  createUser = () => {
    const { email, password, username } = this.state;
    const { signUserUp } = this.props;
    if (email && password && username) {
      createUserWithEmailAndPassword(auth, email, password).then(
        ({ user }) => {
          updateProfile(user, {
            displayName: username,
          });
          signUserUp();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert("Invalid credentials");
    }
  };

  getInputValue = (event: React.SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === "text") {
      this.setState({
        username: event.currentTarget.value,
      });
    } else {
      this.setState({
        [event.currentTarget.type]: event.currentTarget.value,
      } as Pick<SignUpPageState, keyof SignUpPageState>);
    }
  };
  render() {
    const { changeCurrentPage } = this.props;
    return (
      <div className="sign-up-root">
        <InputBox
          required={true}
          type="text"
          className="input-box"
          placeholder="enter your username here"
          label="Username"
          labelClass="label-input"
          onChange={this.getInputValue}
        />
        <InputBox
          required={true}
          type="email"
          className="input-box"
          placeholder="enter your email here"
          label="Email"
          labelClass="label-input"
          onChange={this.getInputValue}
        />
        <InputBox
          required={true}
          type="password"
          className="input-box"
          placeholder="enter your password here"
          label="Password"
          labelClass="label-input"
          onChange={this.getInputValue}
        />
        <div className="button-container">
          <CustomButton className="custom-button" onClick={this.createUser}>
            Sign Up
          </CustomButton>

          <CustomButton className="custom-button" onClick={changeCurrentPage}>
            Already have an account ?
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
