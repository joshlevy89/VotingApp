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
import { getAllPolls, addPoll, receive_vote } from './actions'

const middleware = [ thunk, logger() ];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);

const socket = io('http://localhost:2999/');

socket.on('polls', function (polls) {
    store.dispatch(getAllPolls(polls))
});

socket.on('add_poll', function (obj) {
	var poll = obj.poll
    store.dispatch(addPoll(poll))
});

socket.on('receive_vote', function(obj) {
	var pollId = obj.pollId
	var optionIndex = obj.optionIndex
	var email = obj.email
	store.dispatch(receive_vote(pollId,optionIndex,email))
})

ReactDOM.render(
	<Provider store={store}>
	<Router routes={routes} history={browserHistory}>
	</Router>
	</Provider>,
	document.getElementById('root')
);
