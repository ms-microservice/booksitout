const GOAL_API_URL = `http://localhost/v1/goal/`

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
