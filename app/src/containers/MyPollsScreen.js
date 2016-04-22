import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { getUserPolls } from '../reducers/polls'
import Poll from '../components/Poll'
import { tryDeletePoll } from '../actions'
require('../../styles/index.scss');
import { Button, ButtonToolbar } from 'react-bootstrap'

class MyPollsScreen extends Component {
  render() {
    const { polls, email, tryDeletePoll } = this.props
    return (
      <div className="mainLayout">
      <h3 className="pageTitle">My Polls</h3>
      {/* // if email null, tell user must be signed in to view polls and 
      // give a link to the sign in page */}
      {email===null ?
      <div>
      <div>You must be logged in to view your polls!</div>
      <div><Link to="/login">Sign in</Link></div>
      </div>
      :
      <div>
       <Button style={{width:'150px'}} bsStyle="primary"
       onClick={()=>browserHistory.push("/polls")}>All Polls</Button>
      { polls.map(poll => 
        <div key={poll.id}>
        <Poll poll={poll}/>
        <button onClick={()=>tryDeletePoll(poll.id,email)}>Delete Poll</button>
        </div>
      )}
      </div>
      }
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