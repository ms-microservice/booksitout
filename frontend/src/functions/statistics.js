import urls from '../settings/urls'
import { getToken } from './user'

const getReadTime = (duration) => {
	const READ_TIME_API_URL = `${urls.api.base}/v1/statistics/read-time/${duration}`
	const token = localStorage.getItem('login-token')

	return fetch(READ_TIME_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}

			return res.json()
		})
		.then((readTimeList) => {
			return readTimeList
		})
		.catch(() => {
			return null
		})
}

const getStatisticsSummary = (year) => {
	const token = localStorage.getItem('login-token')
	const STATISTICS_SUMMARY_URL = `${urls.api.base}/v1/statistics/year/${year}`

	return fetch(STATISTICS_SUMMARY_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}

			return res.json()
		})
		.then((stats) => {
			return stats
		})
		.catch(() => {
			return null
		})
}

const getLangaugeStatistics = () => {
	const token = getToken()

	return fetch(`${urls.api.base}/v1/statistics/language`, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			return res.json()
		})
		.then((languageStats) => {
			return languageStats
		})
}

const getCategoryStatistics = () => {
	const token = getToken()

	return fetch(`${urls.api.base}/v1/statistics/category`, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			return res.json()
		})
		.then((categoryStats) => {
			return categoryStats
		})
}

export { getReadTime, getStatisticsSummary, getLangaugeStatistics, getCategoryStatistics }
