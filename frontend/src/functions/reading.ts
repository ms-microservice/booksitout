import axios from 'axios'
import toast from 'react-hot-toast'
import urls from '../settings/urls'
import apiSettings from '../settings/api'
import messages from '../settings/messages'

const getBookOfCurrentReadingSession = () => {
	return axios
		.get(urls.api.reading.get.currentBook, { headers: apiSettings.headers })
		.then((res) => {
			if (res.status === 404) throw new Error()
			return res.data
		})
		.catch((e) => {
			return null
		})
		.then((book) => book)
}

const getAllReadingSessionOfBook = (bookId) => {
	return axios.get(urls.api.reading.get.all(bookId), { headers: apiSettings.headers }).then((res) => res.data)
}

const startReadingSession = (bookId) => {
	return axios.post(urls.api.reading.add.start(bookId), null, { headers: apiSettings.headers }).then((res) => [res.data != null, res.data])
}

const endReadingSessionWithoutSaving = () => {
	return axios.delete(urls.api.reading.delete.notSaving, { headers: apiSettings.headers }).then((res) => res.status.toString().startsWith('2'))
}

const endReadingSession = (book, endPage: number) => {
	const readingTime = Math.round(Number(localStorage.getItem('reading-session-time')) ?? 1)
	return axios
		.put(urls.api.reading.edit.end(book.bookId, endPage, readingTime), null, { headers: apiSettings.headers })
		.then((res) => {
			if (res.status === 200) {
				return res.data
			} else {
				throw new Error(res.data)
			}
		})
		.then(() => {
			localStorage.removeItem('reading-session-time')
			toast.success(
				Number(book.endPage) === Number(endPage) ? '책을 다 읽으셨어요! 별점, 감상, 요약을 추가해 보세요!' : messages.reading.add.success
			)
			return true
		})
		.catch((data) => {
			toast.error(data.message)
			return false
		})
}

const addReadingSession = (bookId, readingSession) => {
	return axios
		.post(urls.api.reading.add.all(bookId), readingSession, { headers: apiSettings.headers })
		.then((res) => res.status)
		.then((status) => status.toString().startsWith('2'))
}

const editReadingSession = (readingSessionId, editedReadingSession) => {
	return axios
		.put(urls.api.reading.edit.id(readingSessionId), editedReadingSession, { headers: apiSettings.headers })
		.then((res) => res.status.toString().startsWith('2'))
}

const deleteReadingSession = (readingSessionId) => {
	return axios
		.delete(urls.api.reading.delete.all(readingSessionId), { headers: apiSettings.headers })
		.then((res) => res.status.toString().startsWith('2'))
}

export {
	startReadingSession,
	endReadingSession,
	endReadingSessionWithoutSaving,
	getAllReadingSessionOfBook,
	addReadingSession,
	deleteReadingSession,
	editReadingSession,
	getBookOfCurrentReadingSession,
}
