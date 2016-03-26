import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

class PollLinkScreen extends Component {
  render() {
  	const pollName = this.props.params.pollName
    const full_link = 'http://localhost:3000/vote/'+ encodeURIComponent(pollName);
    const partial_link = '/vote/'+ encodeURIComponent(pollName);
    return (
      <div>
      <div>
      The Link for your poll is: 
      </div>
      <div>
      <Link to={partial_link}>{full_link}</Link>
      </div>
      </div>
    )
  }
}

PollLinkScreen = connect()(PollLinkScreen)

export default PollLinkScreen