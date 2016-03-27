import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();
import { browserHistory } from 'react-router'
import { postApi, getApi } from '../api'
import { hasUserVoted } from '../reducers/polls'

export function tryDeletePoll(pollId,email) {
	return (dispatch) => {
		const body = {
			pollId: pollId,
			email: email
		}
		postApi('TRY_DELETE_POLL',body)
	}
}

export function deletePoll(pollId) {
	return {
		type: 'DELETE_POLL',
		pollId: pollId
	}
}


export function onOptionClick(pollId,optionIndex,email) {
return (dispatch, getState) => {
	if (email === null) {
		alert('You must be signed in to vote!')
	}
    else if (hasUserVoted(getState().polls, pollId, email)) {
      alert('You can only vote on a poll once!');
    }
	else {
		dispatch(castVote(pollId,optionIndex,email))
	}
}
}

export function onOptionWritein(pollId,writeinVote,email) {
return (dispatch, getState) => {
	if (email === null) {
	  alert('You must be signed in to vote!')
	}
    else if (hasUserVoted(getState().polls, pollId, email)) {
      alert('You can only vote on a poll once!');
    }
	else {
		dispatch(castWriteinVote(pollId,writeinVote,email))
	}
}
}

export function receiveVote(pollId,optionIndex,email) {
	return {
		type: "RECEIVE_VOTE",
		pollId: pollId,
		optionIndex: optionIndex,
		email: email
	}
}

export function receiveWriteinVote(pollId,writeinVote,email) {
	return {
		type: "RECEIVE_WRITEIN_VOTE",
		pollId: pollId,
		writeinVote: writeinVote,
		email: email
	}
}

export function castVote(pollId,optionIndex,email) {
	return (dispatch) => {
		const body = {
			pollId: pollId,
			optionIndex: optionIndex,
			email: email
		}
		postApi('CAST_VOTE',body)
	}
}

export function castWriteinVote(pollId,writeinVote,email) {
	return (dispatch) => {
		const body = {
			pollId: pollId,
			writeinVote: writeinVote,
			email: email
		}
		postApi('WRITEIN_VOTE',body)
	}
}

export function getAllPolls(polls) {
	return {
		type: 'GET_ALL_POLLS',
		polls: polls
	}
}

export function addPoll(poll,id,email) {
	return {
		type: 'ADD_POLL',
		poll: poll
	}
}

export function tryAddPoll(pollName, email, options) {
	return (dispatch) => {
		const body = {
			pollName: pollName,
			email: email,
			options: options
		}
		postApi('TRY_ADD_POLL',body)
		.then(function(response) {
		    return response.json();
		})
		.then(function(data) {
			if (data.message === 'poll_with_this_name_already_exists') {
				alert('poll with this name already exists!')
			}
			else if (data.message === 'poll_added_successfully') {
				browserHistory.push('/poll-link/' + encodeURIComponent(pollName))
			}
		})
	}
}

export function loginAttempt(userData) {
	return (dispatch) => {
		const body = {
			email: userData.email,
			password: userData.password
		}
		postApi('LOGIN_ATTEMPT',body)
		.then(function(res) {
		    return res.json()
		})
		.then(function(json) {
			const { message, pollIds } = json
			dispatch({
    			type: "LOGIN_ATTEMPT",
		    	message: message,
		    	pollIds: pollIds,
		    	email: userData.email
			})
			if (message === 'login_successful') {
			browserHistory.push('/polls')
			}
		})
	}
}

export function signOut() {
	return {
		type: 'SIGNOUT'
	}
}

export function createUser(userData) {
	return (dispatch) => {
		const body = {
			email: userData.email,
			password: userData.password
		}
		postApi('CREATE_USER', body)
		.then(function(response) {
		    return response.json();
		})
		.then(function(message) {
			dispatch({
				type: 'CREATE_USER_ATTEMPT',
				message: message,
				email: userData.email
			})
			if (message === 'new_user_successfully_created') {
				browserHistory.push('/polls')
			}
		})
	}
}



