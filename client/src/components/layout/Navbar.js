import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { AUTH_FAILURE } from "../../actionTypes/auth";

class Navbar extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="nav-wrapper grey darken-3">
          <div className="container">
            <Link to='/' className="brand-logo center">Numbers</Link>
            <button className="btn"
						onClick={this.props.logout}
						>Logout</button>
          </div>
        </nav>
      </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch({ type: AUTH_FAILURE })
	}
}

export default connect(null, mapDispatchToProps)(Navbar);
