import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../components/Vote'
import { castVote } from '../actions'
import { Link } from 'react-router'

class VoteScreen extends Component {
  render() {
  	const { polls, email, onOptionClick } = this.props
  	const pollId = this.props.params.pollId
  	const poll = polls[pollId];
    return (
      <div>
      <Vote poll={poll} email={email} onOptionClick={onOptionClick} />
      <Link to={"/polls"}>Back to polls</Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onOptionClick: (pollId,optionIndex,email) => {
      dispatch(castVote(pollId,optionIndex,email))
    }
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
mapDispatchToProps
)(VoteScreen)

export default VoteScreen
