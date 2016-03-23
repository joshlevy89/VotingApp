export default function login(state={ loggedIn: false, email: null, 
									  message: null, pollIds: [] },action) {
	switch (action.type) {
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
		default:
			return state
	}
}
