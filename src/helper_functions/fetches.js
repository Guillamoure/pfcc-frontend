import localhost from '../localhost'

export const getFetch = url => {
	return fetch(`${localhost}/api/v1/${url}`)
		.then(r => r.json())
}

export const postFetch = (url, body) => {

}

export const patchFetch = (url, body) => {
	return fetch(`${localhost}/api/v1/${url}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Response': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(r => r.json())
}

export const deleteFetch = url => {

}
