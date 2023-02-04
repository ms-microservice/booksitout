import axios from 'axios'
import urls from '../settings/urls'
import utils from './utils'

const getGoalList = (duration = 5) => {
	return axios.get(urls.api.goal.get.duration(duration), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.data)
}

const getGoal = (year) => {
	return axios.get(urls.api.goal.get.year(year), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.data)
}

const addGoal = (year, goal) => {
	return axios
		.post(urls.api.goal.add(year, goal), null, { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

const deleteGoal = (year) => {
	return axios
		.delete(urls.api.goal.delete(year), { headers: { Authorization: utils.getToken() } })
		.then((res) => res.status.toString().startsWith('2'))
}

export { getGoal, addGoal, deleteGoal, getGoalList }
