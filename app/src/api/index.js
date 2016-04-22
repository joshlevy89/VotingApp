export function postApi(action,body) {
		var url = '/' + action
		return (fetch(url, {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		}))
}

export function getApi(action) {
		var url = '/' + action
		return fetch(url)
}