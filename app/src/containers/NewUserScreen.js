import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { createUser } from '../actions'
require('../../styles/index.scss');
import { Button } from 'react-bootstrap';


class NewUserScreen extends Component {

  handleSubmit(createUser,email,password) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)===false) {
      alert('Invalid email address')
    }
    else {
     createUser({
          email: email,
          password: password
      })
   }
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
      <div className="mainLayout">
      <h3 className="pageTitle">New User Sign Up</h3>
      <div>
      email address:<br/>
      <input ref={node=>{
        email = node
      }}/><br/>
      password: <br/>
      <input type="password" ref={node=>{
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
