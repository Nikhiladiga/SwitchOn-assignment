import React, { Component } from "react";
import Login from "./login/SignIn";
import Signup from "./signup/SignUp";

class Auth extends Component {
  state = {
    showLogin: true
  };

  toggleAuthForm = () => {
    this.setState(
      (state, props) => {
        return {
          showLogin: !state.showLogin
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return this.state.showLogin ? (
      <Login toggleAuthForm={this.toggleAuthForm} />
    ) : (
      <Signup toggleAuthForm={this.toggleAuthForm} />
    );
  }
}


export default Auth;