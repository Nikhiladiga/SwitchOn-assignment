import React, { Component } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import axios from "axios";
import Auth from "./components/auth";
import { connect } from "react-redux";
import * as AuthActionTypes from "./actionTypes/auth";
import * as AuthConstants from "./constants/auth";

class App extends Component {
  render() {
    let toRender = null;
    if (this.props.authStatus === AuthConstants.AUTH_LOADING)
      toRender = <h1 style={{ color: "white" }}>Loading...</h1>;
    else if (this.props.authStatus === AuthConstants.AUTHENTICATED)
      toRender = <Dashboard />;
    else toRender = <Auth />;
    return toRender;
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) this.props.authFailure();
    else {
      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:8081/api/auth/check_auth", {
          token
        })
        .then(({ data }) => {
          /*
          { success: true/false }
        */
          if (data.success) this.props.authSuccess(token);
          else this.props.authFailure();
        })
        .catch(() => {
          this.props.authFailure();
        });
    }
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authStatus
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(App);
