import { API_BASE_URL } from '../url/apiUrl'
const GOAL_API_URL = `${API_BASE_URL}/v1/goal/`

const getGoal = (year) => {
	const token = localStorage.getItem('login-token')

	return fetch(GOAL_API_URL + year, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}

			return res.json()
		})
		.then((goal) => {
			return goal
		})
		.catch(() => {
			return null
		})
}

export { getGoal }
