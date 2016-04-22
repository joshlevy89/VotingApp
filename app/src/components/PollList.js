import React, { Component } from 'react'
import { render } from 'react-dom'
import Poll from './Poll'

class PollList extends Component {
	render() {
		const { polls } = this.props
		return (
			<div>
			{ polls.map(poll =>
				<div key={poll.id}>
				<Poll poll={poll}/>
				</div>
			)}
			</div>
		)
	}
}

export default PollList
