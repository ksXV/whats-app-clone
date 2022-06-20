import { Component } from "react";

import InputBox from "../../components/input-box/input-box.component";
import CustomButton from "../../components/custom-button/button.component";

import { auth } from "../../firebase/firebase.utils";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
} from "firebase/auth";

interface SignUpPageProps {
  changeCurrentPage: () => void;
  signUserUp: () => void;
}

interface SignUpPageState {
  email: string;
  password: string;
  username: string;
  checkPassword: string;
  areCredentialsWrong: boolean;
}

class SignUpPage extends Component<SignUpPageProps, SignUpPageState> {
  state = {
    areCredentialsWrong: false,
    email: "",
    password: "",
    username: "",
    checkPassword: "",
  };

  createUser = () => {
    try {
      const { email, password, username, checkPassword } = this.state;
      const { signUserUp } = this.props;
      if (checkPassword !== password) {
        throw new Error("Your passwords don't match.");
      } else if (
        email.length !== 0 &&
        password.length !== 0 &&
        username.length !== 0
      ) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            updateProfile(user, {
              displayName: username,
              photoURL:
                "https://i.ibb.co/D8HyJDn/blank-profile-picture-973460-640.png",
            }).then(() => {
              setPersistence(auth, browserSessionPersistence).then(() => {
                signUserUp();
              });
            });
          })
          .catch((err) => {
            this.setState({ areCredentialsWrong: true });
            console.log(err);
          });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      this.setState({ areCredentialsWrong: true });
      console.log(err);
    }
  };

  getInputValue = (event: React.SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === "text") {
      this.setState({
        username: event.currentTarget.value,
      });
    } else if (event.currentTarget.id === "check-password") {
      this.setState({
        checkPassword: event.currentTarget.value,
      });
    } else {
      this.setState({
        [event.currentTarget.type]: event.currentTarget.value,
      } as unknown as Pick<SignUpPageState, keyof SignUpPageState>);
    }
  };
  listenForEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.createUser();
    }
  };

  render() {
    const { changeCurrentPage } = this.props;
    const { areCredentialsWrong } = this.state;
    return (
      <div className="flex h-screen items-center flex-col justify-center w-96">
        <div
          className={`w-72 h-20 ${
            areCredentialsWrong
              ? `border-2 border-red-800 rounded-md bg-red-900 bg-opacity-50 shake-anim`
              : ""
          }`}
        >
          {areCredentialsWrong ? (
            <h2 className="text-lg font-semibold mt-3">
              Invalid credentials, please check the console.
            </h2>
          ) : null}
        </div>
        <div>
          <InputBox
            required={true}
            type="text"
            className="input-box"
            placeholder="enter your username here"
            label="Username:"
            labelClass="text-left"
            onChange={this.getInputValue}
          />
          <InputBox
            required={true}
            type="email"
            className="input-box"
            placeholder="enter your email here"
            label="Email:"
            labelClass="text-left"
            onChange={this.getInputValue}
          />
          <InputBox
            required={true}
            type="password"
            className="input-box"
            placeholder="enter your password here"
            label="Password:"
            labelClass="text-left"
            onChange={this.getInputValue}
          />
          <InputBox
            required={true}
            id="check-password"
            type="password"
            className="input-box"
            placeholder="confirm your password here"
            label="Confirm password:"
            labelClass="text-left"
            onChange={this.getInputValue}
          />
        </div>
        <div className="flex flex-col justify-between h-32 pt-5 w-48 place-self-center items-center">
          <CustomButton
            className="custom-button w-40"
            onClick={this.createUser}
            onKeyDown={this.listenForEnter}
          >
            Sign Up
          </CustomButton>

          <CustomButton
            className="custom-button w-60"
            onClick={changeCurrentPage}
          >
            Already have an account ?
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
