import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../components/Vote'
import { castVote } from '../actions'
import { Link } from 'react-router'
import { onOptionClick, onOptionWritein } from '../actions'

class VoteScreen extends Component {
  render() {
  	const { polls, email, onOptionClick, onOptionWritein} = this.props
  	const pollId = this.props.params.pollId
  	const poll = polls[pollId];
    return (
      <div>
      <Vote poll={poll} email={email} 
      onOptionClick={onOptionClick} onOptionWritein={onOptionWritein}/>
      <Link to={"/polls"}>Back to polls</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
	polls: state.polls.byId,
  email: state.login.email
	}
}

VoteScreen = connect(
mapStateToProps,
{ onOptionClick, onOptionWritein },
)(VoteScreen)

export default VoteScreen
