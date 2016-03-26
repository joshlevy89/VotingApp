import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import LoginForm from '../containers/LoginForm'

class LoginScreen extends Component {
  render() {
  	const { getAllPolls } = this.props

    return (
      <div>
      <h3>Sign in</h3>
      <LoginForm />
      <div>
      <Link to="/newuser">New user?</Link>
      </div>
      <div>
      <Link to="/polls">View Polls</Link>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
	}
}

LoginScreen = connect(
mapStateToProps
)(LoginScreen)

export default LoginScreen
