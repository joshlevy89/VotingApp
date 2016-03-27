import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Link, browserHistory} from 'react-router'
import PollList from '../components/PollList'
import { getPollsList } from '../reducers/polls'
import styles from '../styles/index.css'
import { Button } from 'react-bootstrap';


class PollsScreen extends Component {
  render() {
  	const { polls, email } = this.props
    return (
      <div className={styles.mainLayout}>
        <h3 className={styles.pageTitle}>All Polls</h3>
        {/* create new poll button */}
		<Button  bsStyle="primary" onClick={e=>{
			browserHistory.push('/newpoll')
		}}>Create New Poll
		</Button>
        {/* my polls button */}
		<Button  bsStyle="primary" onClick={e=>{
			browserHistory.push('/mypolls')
		}}>My Polls</Button>
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