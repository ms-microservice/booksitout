import { getToken } from './user'
import urls from '../settings/urls'

const QNA_ALL_API_URL = `${urls.api.base}/v1/qna/all`
const QNA_USER_API_URL = `${urls.api.base}/v1/qna/user`

const getAllQna = () => {
	return fetch(QNA_ALL_API_URL, {
		method: 'GET',
	})
		.then((res) => {
			if (!res.status.toString().startsWith('2')) {
				throw new Error()
			}
			return res.json()
		})
		.then((qnaList) => {
			return qnaList
		})
		.catch(() => {
			return []
		})
}

const getMyQna = () => {
	const token = getToken()

	if (token === '' || token == null) {
		return null
	}

	return fetch(QNA_USER_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith('2')) {
				throw new Error()
			}
			return res.json()
		})
		.then((userQnaList) => {
			return userQnaList
		})
		.catch(() => {
			return []
		})
}

export { getAllQna, getMyQna }
