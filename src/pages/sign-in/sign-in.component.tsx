import * as React from "react";
import { Component } from "react";
import InputBox from "../../components/input-box/input-box.component";

import "./sign-in.styles.scss";

export default class SignInPage extends Component {
  render() {
    return (
      <>
        <InputBox
          label="Enter your email"
          type="text"
          labelClass="sula"
          placeholder="type a message here"
        />
      </>
    );
  }
}
