import { combineReducers } from 'redux'

function vote(state,action) {
	switch (action.type) {
		case 'CAST_VOTE':
			const choiceStr = action.choice;
			return Object.assign({},state,{
				[choiceStr]: state[choiceStr] + 1
			});
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
		case 'CAST_VOTE':
			return Object.assign({},state,{
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
