import { combineReducers } from 'redux'
import { Immutable } from 'immutable'

function vote(state,action) {
	switch (action.type) {
		case 'RECEIVE_VOTE':
			var optionIndex = action.optionIndex
			var email = action.email
			var options = state.options
			options[optionIndex].emails.push(email)
			var updated_options = options
			return Object.assign({},state,{
				options: updated_options
			})
		case 'RECEIVE_WRITEIN_VOTE':
			var writeinVote = action.writeinVote
			var email = action.email
			var options = state.options
			var obj = {
				optionName: writeinVote,
				emails: [email]
			}
			options.push(obj)
			var updated_options = options
			return Object.assign({},state,{
				options: updated_options
			})
	}
}

export function byId(state=[],action) {
	switch (action.type) {
		case 'GET_ALL_POLLS':
			return action.polls.reduce((obj,poll) => {
				obj[poll.id] = poll
				return obj
			}, {})
		case 'ADD_POLL':
			return Object.assign({}, state, {
				[action.poll.id]: action.poll
			})
		case 'DELETE_POLL':
			delete state[action.pollId]
			return state
		case 'RECEIVE_VOTE':
			return Object.assign({}, state, {
				[action.pollId]: vote(state[action.pollId],action)
			})
		case 'RECEIVE_WRITEIN_VOTE':
			return Object.assign({}, state, {
				[action.pollId]: vote(state[action.pollId],action)
			})
		default:
			return state			
	}
}

export function Ids(state=[],action) {
	switch (action.type) {
		case 'GET_ALL_POLLS':
			return action.polls.map(poll => poll.id)
		case 'ADD_POLL':
			return [...state,action.poll.id]
		case 'DELETE_POLL':
			var index = state.indexOf(action.pollId);
			state.splice(index,1);
			if (index > -1) {
    			return state
			}
		default:
			return state
	}
}

export default combineReducers({
	Ids,
	byId
})

export function getPollsList(state) {
	return state.Ids.map(id => state.byId[id]).reverse()
}

export function getUserPolls(state, pollIds) {
	return pollIds.map(id => state.byId[id]).reverse()
}

export function hasUserVoted(state,pollId, email) {
	var matches = state.byId[pollId].options.filter(option=> {
		if (option.emails.indexOf(email) !== -1) {
			return true
		}
	})
	// so if the matches is empty, it means the user has not yet voted
	if (matches.length === 0)
		return false;
	else {
		return true
	}
}
