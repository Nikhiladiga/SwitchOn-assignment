import React, { Component } from "react";
import { connect } from "react-redux";
import { insertNumber } from "../../store/actions/numberActions";

class CreateNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: "",
      randomNumber: 0
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addNumber(this.state.randomNumber);
  }


  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Insert Number</h5>
          <div className="input-field">
            <input
              type="text"
              value={this.state.randomNumber}
              id="randomNumber"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Insert</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNum: randomNumber =>
      dispatch({
        type: insertNumber.INSERT_NUMBER,
        payload: randomNumber
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateNum);
