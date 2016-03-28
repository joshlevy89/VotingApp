import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router'
import routes from './modules/routes'
import { getAllPolls, addPoll, receiveVote, receiveWriteinVote, deletePoll } from './actions'

const middleware = [ thunk, logger() ];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);


var PORT = Number(process.env.PORT || 2999);
console.log('wup wup listening at ' + PORT)
const socket = io('http://localhost:' + PORT + '/');

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

ReactDOM.render(
	<Provider store={store}>
	<Router history={browserHistory}>
	{ routes }
	</Router>
	</Provider>,
	document.getElementById('root')
);
