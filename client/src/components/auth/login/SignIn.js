import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import * as AuthActionTypes from "../../../actionTypes/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        //console.log(data);
        if (data.success) this.props.authSuccess(data.token);
        else this.props.authFailure();
      })
      .catch(() => {
        this.props.authFailure();
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Login</button>
          </div>
          <p>
            Don't have an account ?
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer"
              }}
              onClick={this.props.toggleAuthForm}
            >
              signup
            </span>
          </p>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: token =>
      dispatch({
        type: AuthActionTypes.AUTH_SUCCESS,
        payload: token
      }),
    authFailure: () =>
      dispatch({
        type: AuthActionTypes.AUTH_FAILURE
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
