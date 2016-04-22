import { combineReducers } from 'redux'
import polls from './polls'
import login from './login'

export default combineReducers({
	polls,
	login
})