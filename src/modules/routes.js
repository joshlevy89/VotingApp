import React from 'react'
import { Route } from 'react-router'
import PollsScreen from '../containers/PollsScreen';
import VoteScreen from '../containers/VoteScreen';
import NewPollScreen from '../containers/NewPollScreen';
import LoginScreen from '../containers/LoginScreen';
import NewUserScreen from '../containers/NewUserScreen';
import MyPollsScreen from '../containers/MyPollsScreen';


module.exports = (
<div>
<Route path="/login" component={LoginScreen}/>
<Route path="/mypolls" component={MyPollsScreen}/>
<Route path="/newuser" component={NewUserScreen}/>
<Route path="/polls" component={PollsScreen}/>
<Route path="/newpoll" component={NewPollScreen}/>
<Route path="/vote/:pollId" component={VoteScreen}/>
</div>
)