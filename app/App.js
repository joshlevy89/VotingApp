import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router'
import routes from './src/modules/routes';
import reducers from './src/reducers';
import { getAllPolls, addPoll, receiveVote, receiveWriteinVote, deletePoll } from './src/actions';

var isProduction = process.env.NODE_ENV === 'production';
const middleware = isProduction ? [ thunk ]:[thunk, logger()];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);


var socket = io.connect('/');

socket.on('polls', function (polls) {
    store.dispatch(getAllPolls(polls))
});

socket.on('add_poll', function(obj) {
	var poll = obj.poll
    store.dispatch(addPoll(poll))
});

socket.on('receive_vote', function(obj) {
	var pollId = obj.pollId
	var optionIndex = obj.optionIndex
	var email = obj.email
	store.dispatch(receiveVote(pollId,optionIndex,email))
})

socket.on('receive_writein_vote', function(obj) {
	var pollId = obj.pollId
	var writeinVote = obj.writeinVote
	var email = obj.email
	store.dispatch(receiveWriteinVote(pollId,writeinVote,email))
})

socket.on('delete_poll', function(obj) {
	var pollId = obj.pollId
    store.dispatch(deletePoll(pollId))
});

export default class App extends Component {
  render() {
    return (
	<Provider store={store}>
	<Router history={browserHistory}>
		{ routes }
	</Router>
	</Provider>
    );
  }
}
