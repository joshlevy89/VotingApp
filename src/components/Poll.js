import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

class Poll extends Component {
	render() {
		const { poll } = this.props
		return (
			<Link to={"/vote/"+encodeURIComponent(poll.pollName)}>
			<button>
			{poll.pollName}
			</button>
			</Link>
		)
	}
}

export default Poll
