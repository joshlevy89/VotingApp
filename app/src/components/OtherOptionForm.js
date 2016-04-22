import React, { Component } from 'react'
import { render } from 'react-dom'

class OtherOptionForm extends Component {

constructor(props) {
    super(props)
    this.state = { inputVal: '' }
}

handleInputChange(val) {
	this.setState({
		inputVal: val
	})
}

render() {
	const { onOptionWritein, poll,email } = this.props
	return (
		<div>
		Other: 
		<form onSubmit = {e=>{
			e.preventDefault()
			var writeinVote = this.state.inputVal
			onOptionWritein(poll.id,writeinVote,email)
		}}>
		<input ref="myinput" onChange = {()=>this.handleInputChange(this.refs.myinput.value)}></input>
		</form>
		</div>
	)
}
}

export default OtherOptionForm
