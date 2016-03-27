import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginAttempt } from '../actions'
import { Button } from 'react-bootstrap';

class LoginForm extends Component {

	handleSubmit(loginAttempt,email,password) {
		loginAttempt({
				email: email,
				password: password
		})
	}

	render() {
		const { loginInfo, loginAttempt } = this.props
		let email
		let password
		let loginMessage
		if (loginInfo.message != null && loginInfo.message !== 'login_successful') {
			loginMessage = 'Email and/or password incorrect'
		}
		return (
			<div>
			email:<br/>
			<input ref={node=>{
				email = node
			}}/><br/>
			password: <br/>
			<input ref={node=>{
				password = node
			}}/> <br/>
			<Button onClick = {()=>this.handleSubmit(loginAttempt,email.value,password.value)} 
			bsStyle="primary">Sign in</Button>
			<div>{loginMessage}</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		loginInfo: state.login
	}
}

LoginForm = connect(
mapStateToProps,
{ loginAttempt }
)(LoginForm)

export default LoginForm