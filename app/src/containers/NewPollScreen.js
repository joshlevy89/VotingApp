import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { tryAddPoll } from '../actions'
import OptionInput from '../components/OptionInput'
import { Button } from 'react-bootstrap';
require('../../styles/index.scss');


class VoteScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { pollName: '', options: ['',''], numOptions: 2 }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(val, optionIndex) {
    var options = this.state.options
    options[optionIndex] = val
    this.setState({
      options: options
    })
  }

  handleAddOption() {
    this.setState({
      options: [...this.state.options, ''],
      numOptions: this.state.numOptions+1
    })
  }

  handlePollNameChange(val) {
    this.setState({
      pollName: val
    })
  }

  render() {
     const { tryAddPoll, email } = this.props
     var numOptions = this.state.numOptions
     var rows = [];
      for (var i=0; i < numOptions; i++) {
      rows.push(<OptionInput key={i} optionIndex={i} handleInputChange={this.handleInputChange}/>);
      }     
    return (
      <div className="mainLayout">
        <h3 className="pageTitle">Create New Poll</h3>
        {email===null ? 
        <div>
        <div>You must be signed in to create a poll!</div>
        <div><Link to="/login">Sign in</Link></div>
        </div>:
        <div>
        <h4>Poll Name:</h4>
        <input ref="pollName" 
              onChange={()=>{this.handlePollNameChange(this.refs.pollName.value)}
        }/>
        {rows}
        <div className="buttonGroup">
        <Button bsStyle="primary" onClick = {()=>this.handleAddOption()}>Add Option</Button>
        <Button bsStyle="success" onClick={()=>{
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
          }
        }}>Submit
        </Button>
        <Button bsStyle="danger" onClick = {() =>
          browserHistory.push('/polls')
        }
        >Cancel</Button>
        </div>
      </div>
    }
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