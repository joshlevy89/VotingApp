import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { createUser } from '../actions'

class NewUserScreen extends Component {
  render() {
    const { dispatch, createUser, message } = this.props
    let email
    let password
    let createUserMessage
    if (message != null && message !== 'new_user_successfully_created') {
      createUserMessage = 'Email already exists; Try another or sign in.'
    }
    return (
      <div>
      <div>
      <h3>Sign up</h3>
      <form onSubmit={e=>{
        e.preventDefault()

        createUser({
            email: email.value,
            password: password.value
        })

      }}>
      email address:<br/>
      <input ref={node=>{
        email = node
      }}/><br/>
      new password: <br/>
      <input ref={node=>{
        password = node
      }}/> <br/>
      <div>{createUserMessage}</div>
      <button>Sign up</button>
      <div><Link to="/polls">View Polls</Link></div>
      <div><Link to="/login">Back to Sign in</Link></div>
      </form>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.login.message
  }
}

NewUserScreen = connect(
mapStateToProps,
{ createUser }
)(NewUserScreen)

export default NewUserScreen
