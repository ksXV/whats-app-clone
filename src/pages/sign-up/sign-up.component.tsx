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
}

class SignUpPage extends Component<SignUpPageProps, SignUpPageState> {
  state = {
    email: "",
    password: "",
    username: "",
    checkPassword: "",
  };

  createUser = () => {
    const { email, password, username, checkPassword } = this.state;
    const { signUserUp } = this.props;
    if (checkPassword !== password) {
      alert("Your passwords don't match.");
    } else if (email && password && username) {
      createUserWithEmailAndPassword(auth, email, password).then(
        ({ user }) => {
          updateProfile(user, {
            displayName: username,
          }).then(() => {
            setPersistence(auth, browserSessionPersistence).then(() => {
              signUserUp();
            });
          });
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
    } else if (event.currentTarget.id === "check-password") {
      this.setState({
        checkPassword: event.currentTarget.value,
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
      <div className="flex h-screen flex-col justify-center w-96">
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
        <div className="flex flex-col justify-between h-32 pt-5 w-48 place-self-center items-center">
          <CustomButton
            className="custom-button w-40"
            onClick={this.createUser}
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
