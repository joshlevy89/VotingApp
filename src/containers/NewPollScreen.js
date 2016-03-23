import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { tryAddPoll } from '../actions'
import OptionInput from '../components/OptionInput'

class VoteScreen extends Component {
  constructor(props) {
    super(props)
    this.numOptions = 2
    this.state = { pollName: '', options: ['',''] }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(val, optionIndex) {
    var options = this.state.options
    options[optionIndex] = val
    this.setState({
      options: options
    })
  }

  handlePollNameChange(val) {
    this.setState({
      pollName: val
    })
  }

  render() {
     const { tryAddPoll, email } = this.props
     var numOptions = this.numOptions
     var rows = [];
      for (var i=0; i < numOptions; i++) {
      rows.push(<OptionInput key={i} optionIndex={i} handleInputChange={this.handleInputChange}/>);
      }     
    return (
      <div>
        PollName: <br/>
        <input ref="pollName" 
              onChange={()=>{this.handlePollNameChange(this.refs.pollName.value)}
        }/>
        {rows}
        <button onClick={()=>{
            // if any of the fields are empty, alert user
            var trimmedVals = this.state.options.map(option=>{
                return option.trim()
            })
            trimmedVals.push(this.state.pollName.trim())
          if (trimmedVals.indexOf("") !== -1) {
             alert('Poll Name and Option fields must be filled out!')
          }
          else {

            // add emails field to each option contains only 
            var options = this.state.options.map(optionName=>{
                  return {
                    optionName: optionName,
                    emails: []
                  }
            })

            tryAddPoll(this.state.pollName, email, options)
            browserHistory.push('/polls')
          }
        }}>Submit
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.login.email
  }
}

VoteScreen = connect(
mapStateToProps,
{ tryAddPoll }
)(VoteScreen)

export default VoteScreen