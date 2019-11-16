import React, { Component } from "react";
import io from "socket.io-client";

import Number from "../project/Number";
import Navbar from "../layout/Navbar";
import CreateNum from "../project/CreateNum";

const socketUrl = "http://localhost:8081";

class Dashboard extends Component {
  state = {
    numbers: [],
    socket: null
  };

  addNumber = number => {
    this.state.socket &&
      this.state.socket.emit("add_number", {
        number
      });
  };

  componentDidMount() {
    const socket = io(socketUrl);
    socket.on("init_data", data => {
      this.setState({
        numbers: data
      });
    });
    socket.on("connect", () => {
      console.log("socket connections established");
    });
    socket.on("new_number_added", data => {
      this.setState(state => {
        return {
          numbers: [...state.numbers, data]
        };
      });
    });
    this.setState({
      socket: socket
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <CreateNum addNumber={this.addNumber} />
        <div className="dashboard container">
          <Number numbers={this.state.numbers} />
        </div>
      </>
    );
  }
}

export default Dashboard;
