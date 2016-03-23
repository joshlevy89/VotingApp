import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginAttempt } from '../actions'

class LoginForm extends Component {
	render() {
		const { dispatch, loginInfo, loginAttempt } = this.props
		let email
		let password
		return (
			<div>
			<form onSubmit={e=>{
				e.preventDefault()

				loginAttempt({
						email: email.value,
						password: password.value
				})
			}}>
			email:<br/>
			<input ref={node=>{
				email = node
			}}/><br/>
			password: <br/>
			<input ref={node=>{
				password = node
			}}/> <br/>
			<button>Login</button>
			<div>{loginInfo.message}</div>
			</form>
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