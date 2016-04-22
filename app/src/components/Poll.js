import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'

class Poll extends Component {
	render() {
		const { poll } = this.props
		var displayName = ''
		var charLimit = 40;
		if (poll.pollName.length > charLimit) {
			displayName = poll.pollName.substring(0,charLimit)+'...'
		}
		else {
			displayName = poll.pollName
		}
		return (
			<Link to={"/vote/"+encodeURIComponent(poll.pollName)}>
			<Button style={{width: '350px'}}>
			{displayName}
			</Button>
			</Link>
		)
	}
}

export default Poll
