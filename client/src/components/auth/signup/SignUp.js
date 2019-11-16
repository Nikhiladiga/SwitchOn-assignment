import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as AuthActionTypes from "../../../actionTypes/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
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
      .post("http://localhost:8081/api/auth/signup", {
        name: this.state.firstName + " " + this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        if (data.success) this.props.authSuccess(data.token);
        else this.props.authFailure();
      })
      .catch(err => {
        this.props.authFailure();
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Signup</button>
          </div>
          <p>
            Already have an account ?
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer"
              }}
              onClick={this.props.toggleAuthForm}
            >
              login
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
)(SignUp);
