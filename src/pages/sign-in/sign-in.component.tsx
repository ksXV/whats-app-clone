import * as React from "react";
import { Component } from "react";

import CustomButton from "../../components/custom-button/button.component";
import InputBox from "../../components/input-box/input-box.component";

import { auth } from "../../firebase/firebase.utils";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
      setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            signUserIn();
          })
          .catch((err) => console.log(err));
      });
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
      <div className="flex h-screen flex-col justify-center w-96">
        <InputBox
          required={true}
          label="Email:"
          type="email"
          className="input-box"
          labelClass="text-left"
          placeholder="type your email here"
          onChange={this.getInputValue}
        />
        <InputBox
          required={true}
          label="Password:"
          type="password"
          className="input-box"
          labelClass="text-left"
          onChange={this.getInputValue}
          placeholder="type your password here"
        />
        <div className="flex flex-col justify-between h-44 pt-5 w-48 place-self-center">
          <CustomButton className="custom-button" onClick={this.signIn}>
            Sign In
          </CustomButton>
          <CustomButton
            onClick={signInWithGoogle}
            className="google-button custom-button"
          >
            Sign In with Google
          </CustomButton>
          <CustomButton onClick={changeCurrentPage} className="custom-button">
            Sign Up
          </CustomButton>
        </div>
      </div>
    );
  }
}
