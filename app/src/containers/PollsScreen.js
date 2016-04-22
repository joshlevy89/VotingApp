import React, { Component } from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Link, browserHistory} from 'react-router'
import PollList from '../components/PollList'
import { getPollsList } from '../reducers/polls'
require('../../styles/index.scss');
import { Button, ButtonToolbar } from 'react-bootstrap';


class PollsScreen extends Component {
  render() {
  	const { polls, email } = this.props
    return (
      <div className="mainLayout">
        <h3 className="pageTitle">All Polls</h3>
        {/* create new poll button */}
		<Button style={{width:'150px'}} bsStyle="primary" onClick={e=>{
			browserHistory.push('/newpoll')
		}}>Create New Poll
		</Button>
        {/* my polls button */}
		<Button style={{width:'150px'}} bsStyle="primary" onClick={e=>{
			browserHistory.push('/mypolls')
		}}>My Polls</Button>
		<PollList polls={polls}/>
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