import { signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { Component } from "react";

import CustomButton from "../../components/custom-button/button.component";
import InputBox from "../../components/input-box/input-box.component";
import { auth } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

interface SignInPageState {
  email: string;
  password: string;
}

interface SignInPageProps {
  signInWithGoogle: () => void;
  changeCurrentPage: () => void;
  signUserIn: () => void;
}

export default class SignInPage extends Component<
  SignInPageProps,
  SignInPageState
> {
  state = {
    email: "",
    password: "",
  };
  signIn = () => {
    const { email, password } = this.state;
    const { signUserIn } = this.props;
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          signUserIn();
        })
        .catch((err) => console.log(err));
    }
  };
  getInputValue = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.type]: event.currentTarget.value,
    } as Pick<SignInPageState, keyof SignInPageState>);
  };

  render() {
    const { signInWithGoogle, changeCurrentPage } = this.props;
    return (
      <div className="sign-in-root">
        <InputBox
          required={true}
          label="Email:"
          type="email"
          className="input-box"
          labelClass="label-input"
          placeholder="type your email here"
          onChange={this.getInputValue}
        />
        <InputBox
          required={true}
          label="Password:"
          type="password"
          className="input-box"
          labelClass="label-input"
          onChange={this.getInputValue}
          placeholder="type your password here"
        />
        <div className="button-container">
          <CustomButton
            className="custom-button sign-in-button"
            onClick={this.signIn}
          >
            Sign In
          </CustomButton>
          <CustomButton
            onClick={signInWithGoogle}
            className="custom-button google-button"
          >
            Sign In with Google
          </CustomButton>
          <CustomButton
            onClick={changeCurrentPage}
            className="custom-button sign-up-button"
          >
            Sign Up
          </CustomButton>
        </div>
      </div>
    );
  }
}
