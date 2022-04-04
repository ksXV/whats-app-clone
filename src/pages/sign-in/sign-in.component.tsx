import * as React from "react";
import { Component } from "react";

import CustomButton from "../../components/custom-button/button.component";
import InputBox from "../../components/input-box/input-box.component";

import "./sign-in.styles.scss";

interface ISignInPageState {
  email: string;
  password: string;
}

interface ISignInPageProps {
  signInWithGoogle: () => void;
}

export default class SignInPage extends Component<
  ISignInPageProps,
  ISignInPageState
> {
  state = {
    email: "",
    password: "",
  };

  getInputValue = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.type]: event.currentTarget.value,
    } as Pick<ISignInPageState, keyof ISignInPageState>);
  };

  render() {
    const { signInWithGoogle } = this.props;
    return (
      <div className="sign-in-root">
        <InputBox
          label="Email:"
          type="email"
          className="input-box"
          labelClass="label-input"
          placeholder="type your email here"
          onChange={this.getInputValue}
        />

        <InputBox
          label="Password:"
          type="password"
          className="input-box"
          labelClass="label-input"
          onChange={this.getInputValue}
          placeholder="type your password here"
        />
        <div className="button-container">
          <CustomButton className="custom-button sign-in-button">
            Sign In
          </CustomButton>

          <CustomButton
            onClick={signInWithGoogle}
            className="custom-button google-button"
          >
            Sign In with Google
          </CustomButton>

          <CustomButton className="custom-button sign-up-button">
            Sign Up
          </CustomButton>
        </div>
      </div>
    );
  }
}
