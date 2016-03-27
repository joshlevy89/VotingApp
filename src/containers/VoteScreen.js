import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../components/Vote'
import { castVote } from '../actions'
import { Link } from 'react-router'
import { onOptionClick, onOptionWritein } from '../actions'
import { getPollsList, getPollByName } from '../reducers/polls'
import styles from '../styles/index.css'

class VoteScreen extends Component {
  render() {
  	const { pollsList, email, onOptionClick, onOptionWritein } = this.props
  	const pollName = this.props.params.pollName

    // check to see whether api has retrieved polls (if direct call to this url)
    if (pollsList.length === 0) {
      return (
        <div>
        </div>
        )
    }
    const poll = getPollByName(pollsList, pollName)

    return (
      <div className={styles.mainLayout}>
      <h3 className={styles.pageTitle}>{pollName}</h3>
      <Vote poll={poll} email={email} 
      onOptionClick={onOptionClick} onOptionWritein={onOptionWritein}/>
      <Link to={"/polls"}>Back to polls</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
	pollsList: getPollsList(state.polls),
  email: state.login.email
	}
}

VoteScreen = connect(
mapStateToProps,
{ onOptionClick, onOptionWritein }
)(VoteScreen)

export default VoteScreen
