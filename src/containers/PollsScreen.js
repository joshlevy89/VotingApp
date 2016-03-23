import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Link, browserHistory} from 'react-router'
import PollList from '../components/PollList'
import { getPollsList } from '../reducers/polls'


class PollsScreen extends Component {
  render() {
  	const { polls, email } = this.props
    return (
      <div>
		<button onClick={e=>{
			if (email) {
				browserHistory.push('/newpoll')
			}
			else {
				alert('Must be logged in to create poll!')
			}			
		}}>Create New Poll
		</button>
		<button onClick={e=>{
			if (email) {
				browserHistory.push('/mypolls')
			}
			else {
				alert('Must be logged in to view polls!')
			}		
		}}>My Polls</button>
		<div>
		<PollList polls={polls}/>
		</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		polls: getPollsList(state.polls),
		email: state.login.email
	}
}

PollsScreen = connect(
mapStateToProps
)(PollsScreen)

export default PollsScreen