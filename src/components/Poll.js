import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

class Poll extends Component {
	render() {
		const { poll } = this.props
		return (
			<div>
			<Link to={"/vote/"+poll.id}>
			<button>
			{poll.pollName}
			</button>
			</Link>
			</div>
		)
	}
}

export default Poll
