import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollLinkScreen extends Component {
  render() {
  	const pollName = this.props.params.pollName
    return (
      <div>
      <div>
      The Link for your poll is: 
      </div>
      <div>
      { 'http://localhost:3000/vote/'+ encodeURIComponent(pollName) }
      </div>
      </div>
    )
  }
}

PollLinkScreen = connect()(PollLinkScreen)

export default PollLinkScreen