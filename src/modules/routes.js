import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import PollsScreen from '../containers/PollsScreen';
import VoteScreen from '../containers/VoteScreen';
import NewPollScreen from '../containers/NewPollScreen';
import LoginScreen from '../containers/LoginScreen';
import NewUserScreen from '../containers/NewUserScreen';
import MyPollsScreen from '../containers/MyPollsScreen';
import PollLinkScreen from '../containers/PollLinkScreen';
import NavBar from '../components/NavBar';

module.exports = (
<Route path="/" component={NavBar}>
	<IndexRoute component={LoginScreen} />
	<Route path="/login" component={LoginScreen}/>
	<Route path="/mypolls" component={MyPollsScreen}/>
	<Route path="/newuser" component={NewUserScreen}/>
	<Route path="/polls" component={PollsScreen}/>
	<Route path="/newpoll" component={NewPollScreen}/>
	<Route path="/vote/:pollName" component={VoteScreen}/>
	<Route path="/poll-link/:pollName" component={PollLinkScreen}/>
</Route>
)