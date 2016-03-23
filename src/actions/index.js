import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();
import { browserHistory } from 'react-router'
import { postApi, getApi } from '../api'

export function receiveVote(pollId,optionIndex,email) {
	return {
		type: "RECEIVE_VOTE",
		pollId: pollId,
		optionIndex: optionIndex,
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



