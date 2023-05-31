import axios from 'axios'
import urls from '../settings/urls'
import apiSettings from '../settings/api'
import utils from './utils'

const getReadTime = (duration) => {
	return axios.get(urls.api.statistics.get.readTime(duration), { headers: { Authorization: utils.getToken() } }).then((res) => res.data)
}

const getStatisticsSummary = (year) => {
	return axios
		.get(urls.api.statistics.get.summary(year), { headers: { Authorization: utils.getToken() } })
		.then((res) => res)
}

const getLangaugeStatistics = () => {
	return axios.get(urls.api.statistics.get.language, { headers: apiSettings.headers }).then((res) => res.data)
}

const getCategoryStatistics = () => {
	return axios.get(urls.api.statistics.get.category, { headers: apiSettings.headers }).then((res) => res.data)
}

export { getReadTime, getStatisticsSummary, getLangaugeStatistics, getCategoryStatistics }
