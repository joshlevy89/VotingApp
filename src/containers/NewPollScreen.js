import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { tryAddPoll } from '../actions'
import OptionInput from '../components/OptionInput'
import styles from '../styles/index.css'


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
      <div className={styles.mainLayout}>
        <h3 className={styles.pageTitle}>Create New Poll</h3>
        {email===null ? 
        <div>
        <div>You must be signed in to create a poll!</div>
        <div><Link to="/login">Sign in</Link></div>
        </div>:
        <div>
        PollName: <br/>
        <input ref="pollName" 
              onChange={()=>{this.handlePollNameChange(this.refs.pollName.value)}
        }/>
        {rows}
        <button onClick = {()=>this.handleAddOption()}>Add Option</button>
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
          }
        }}>Submit
        </button>
        <button onClick = {() =>
          browserHistory.push('/polls')
        }
        >Cancel</button>
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