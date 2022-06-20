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
  areCredentialsWrong: boolean;
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
    areCredentialsWrong: false,
  };
  signIn = () => {
    const { email, password } = this.state;
    const { signUserIn } = this.props;
    if (email !== "" && password !== "") {
      setPersistence(auth, browserSessionPersistence).then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            signUserIn();
          })
          .catch((err) => {
            console.error(err);
            this.setState({ areCredentialsWrong: true });
          });
      });
    } else {
      this.setState({ areCredentialsWrong: true });
    }
  };

  listenForEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.signIn();
    }
  };

  getInputValue = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.type]: event.currentTarget.value,
    } as unknown as Pick<SignInPageState, keyof SignInPageState>);
  };

  render() {
    const { signInWithGoogle, changeCurrentPage } = this.props;
    const { areCredentialsWrong } = this.state;
    return (
      <div className="flex h-screen flex-col justify-center items-center w-96">
        <div
          className={`w-72 h-20 ${
            areCredentialsWrong
              ? `border-2 border-red-800 rounded-md bg-red-900 bg-opacity-50 shake-anim`
              : ""
          }`}
        >
          {areCredentialsWrong ? (
            <h2 className="text-lg font-semibold mt-5">
              Invalid email or password!
            </h2>
          ) : null}
        </div>
        <div className="mt-2">
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
        </div>
        <div className="flex flex-col justify-between h-44 pt-5 w-48 place-self-center">
          <CustomButton
            className="custom-button"
            onClick={this.signIn}
            onKeyPress={this.listenForEnter}
          >
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
