import axios from 'axios'
import urls from '../settings/urls'
import apiSettings from '../settings/api'

const getReadTime = (duration) => {
	return axios.get(urls.api.statistics.get.readTime(duration), { headers: apiSettings.headers }).then((res) => res.data)
}

const getStatisticsSummary = (year) => {
	return axios.get(urls.api.statistics.get.summary(year), { headers: apiSettings.headers }).then((res) => res.data)
}

const getLangaugeStatistics = () => {
	return axios.get(urls.api.statistics.get.language, { headers: apiSettings.headers }).then((res) => res.data)
}

const getCategoryStatistics = () => {
	return axios.get(urls.api.statistics.get.category, { headers: apiSettings.headers }).then((res) => res.data)
}

export { getReadTime, getStatisticsSummary, getLangaugeStatistics, getCategoryStatistics }
