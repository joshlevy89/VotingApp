import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { getUserPolls } from '../reducers/polls'
import Poll from '../components/Poll'
import { tryDeletePoll } from '../actions'

class MyPollsScreen extends Component {
  render() {
    const { polls, email, tryDeletePoll } = this.props
    return (
      <div>
      { polls.map(poll => 
        <div key={poll.id}>
        <Poll poll={poll}/>
        <button onClick={()=>tryDeletePoll(poll.id,email)}>Delete Poll</button>
        </div>
      )}
      </div>
    )
  }
}

function mapStateToProps(state) {
const pollIds = state.login.pollIds
const polls = state.polls
 return {
    polls: getUserPolls(polls, pollIds),
    email: state.login.email
  }
}

MyPollsScreen = connect(
mapStateToProps,
{ tryDeletePoll }
)(MyPollsScreen)

export default MyPollsScreen