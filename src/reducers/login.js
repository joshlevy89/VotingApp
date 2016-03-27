export default function login(state={ loggedIn: false, email: null, 
									  message: null, pollIds: [] },action) {
	switch (action.type) {
		case 'SIGNOUT': 
			return {
				loggedIn: false,
				email: null,
				message: null,
				pollIds: []
			}
		case 'LOGIN_ATTEMPT':
			if (action.message === 'login_successful') {
				return {
					loggedIn: true,
					email: action.email,
					message: action.message,
					pollIds: action.pollIds
				}
			}
			else {
				return Object.assign({}, state, {
					message: action.message
				})
			}
		case 'CREATE_USER_ATTEMPT':
		  	if (action.message === 'new_user_successfully_created') {
				return {
					loggedIn: true,
					email: action.email,
					message: action.message,
					pollIds: []
				}
			}
			else {
				return Object.assign({}, state, {
					message: action.message
				})
			}
		case 'ADD_POLL':
			return Object.assign({}, state, {
				pollIds: [...state.pollIds, action.poll.id]
			})
		case 'DELETE_POLL':
			var index = state.pollIds.indexOf(action.pollId);
			state.pollIds.splice(index,1);
			return Object.assign({},state,{
				pollIds: state.pollIds
			})
		default:
			return state
	}
}
