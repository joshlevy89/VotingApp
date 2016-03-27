import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { createUser } from '../actions'
import styles from '../styles/index.css'
import { Button } from 'react-bootstrap';


class NewUserScreen extends Component {

  handleSubmit(createUser,email,password) {
     createUser({
          email: email,
          password: password
      })
  }

  render() {
    const { createUser, message } = this.props
    let email
    let password
    let createUserMessage
    if (message != null && message !== 'new_user_successfully_created') {
      createUserMessage = 'Email already exists; Try another or sign in.'
    }
    return (
      <div className={styles.mainLayout}>
      <h3 className={styles.pageTitle}>New User Sign Up</h3>
      <div>
      email address:<br/>
      <input ref={node=>{
        email = node
      }}/><br/>
      new password: <br/>
      <input ref={node=>{
        password = node
      }}/> <br/>
      <div>{createUserMessage}</div>
      <Button onClick={()=>this.handleSubmit(createUser,email.value,password.value)}
      bsStyle="primary">Sign up</Button>
      <div><Link to="/polls">View Polls</Link></div>
      <div><Link to="/login">Back to Sign in</Link></div>
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
