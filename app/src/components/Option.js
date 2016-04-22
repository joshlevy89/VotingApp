import React, { Component } from 'react'
import { render } from 'react-dom'

class Option extends Component {
	render() {
		const { option, poll, email, optionIndex, onOptionClick } = this.props
		return (
			<button onClick={()=>onOptionClick(poll.id,optionIndex,email)}>
			{option.optionName}
			<div>
			{option.emails.length}
			</div>
			</button>
		)
	}
}

export default Option
