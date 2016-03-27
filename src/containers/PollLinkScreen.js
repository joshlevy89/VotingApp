import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import styles from '../styles/index.css'


class PollLinkScreen extends Component {
  render() {
  	const pollName = this.props.params.pollName
    const full_link = 'http://localhost:3000/vote/'+ encodeURIComponent(pollName);
    const partial_link = '/vote/'+ encodeURIComponent(pollName);
    return (
      <div className={styles.mainLayout}>
      <h3 className={styles.pageTitle}>Poll Link</h3>
      <div>
      The Link for your poll is: 
      </div>
      <a style={{wordWrap:'break-word'}} onClick={()=>browserHistory.push(partial_link)}>{full_link}</a>
      </div>
    )
  }
}

PollLinkScreen = connect()(PollLinkScreen)

export default PollLinkScreen