import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { getUserPolls } from '../reducers/polls'
import Poll from '../components/Poll'

class MyPollsScreen extends Component {
  render() {
    const { polls } = this.props
    return (
      <div>
      { polls.map(poll => 
        <Poll key={poll.id} poll={poll}/>
      )}
      </div>
    )
  }
}

function mapStateToProps(state) {
const pollIds = state.login.pollIds
const polls = state.polls
 return {
    polls: getUserPolls(polls, pollIds)
  }
}

MyPollsScreen = connect(
mapStateToProps
)(MyPollsScreen)

export default MyPollsScreen