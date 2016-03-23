import React, { Component } from 'react'
import { render } from 'react-dom'
import Poll from './Poll'

class PollList extends Component {
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

export default PollList
