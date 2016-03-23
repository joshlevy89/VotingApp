import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { createUser } from '../actions'

class NewUserScreen extends Component {
  render() {
    const { dispatch, createUser,a } = this.props
    let email
    let password
    return (
      <div>
      <div>
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
      <button>Submit</button>
      </form>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

NewUserScreen = connect(
mapStateToProps,
{ createUser }
)(NewUserScreen)

export default NewUserScreen
