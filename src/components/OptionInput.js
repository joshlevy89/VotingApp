import React, { Component } from 'react'
import { render } from 'react-dom'

class OptionInput extends Component {

	render() {
		const { optionIndex, handleInputChange } = this.props
		return (
			<div>
			<br/>
      		option: <input ref="myInput" 
      				onChange={()=>handleInputChange(this.refs.myInput.value, optionIndex)}/>
      		</div>
		)
	}
}

export default OptionInput
