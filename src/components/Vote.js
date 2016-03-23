import React, { Component } from 'react'
import { render } from 'react-dom'
import Option from './Option'

class Vote extends Component {
	render() {
		const { poll } = this.props
		const options = poll.options
		return (
			<div>
			{options.map((option,ind) => 
				<Option {...this.props} option={option} optionIndex={ind} key={ind}/>
			)}
			</div>
		)
	}
}

export default Vote