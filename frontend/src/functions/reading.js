import toast from 'react-hot-toast'
import { API_BASE_URL } from '../settings/urls/apiUrl'
import { getToken } from './user'

const READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/`
const READING_SESSION_CURRENT_API_URL = `${API_BASE_URL}/v1/reading-session/current`

const getCurrentReadingSession = (bookId, setBook, toggleTimer, navigate, setReadingSessionId) => {
	const token = getToken()

	fetch(READING_SESSION_CURRENT_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (res.status.toString().startsWith(2)) {
				return res.json()
			}
			throw new Error()
		})
		.then((readingSession) => {
			if (readingSession.book.bookId == bookId) {
				setBook(readingSession.book)
				setReadingSessionId(readingSession.readingSessionId)
			} else {
				toast.error('진행중인 독서활동이 있어요')
				navigate(`/reading/${readingSession.book.bookId}`)
				setBook(readingSession.book)
			}
		})
		.catch(() => {
			startReadingSession(bookId, toggleTimer, setBook, navigate, setReadingSessionId)
		})
}

const startReadingSession = (bookId, toggleTimer, setBook, setReadingSessionId) => {
	const token = localStorage.getItem('login-token')
	const START_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${bookId}/start`

	fetch(START_READING_SESSION_API_URL, {
		method: 'POST',
		headers: { Authorization: token },
	})
		.then((res) => {
			return res.json()
		})
		.then((readingSession) => {
			setReadingSessionId(readingSession.readingSessionId)
			setBook(readingSession.book)
			toggleTimer(true)
		})
}

const endReadingSessionWithoutSaving = (readingSessionId) => {
	const token = getToken()

	return fetch(`${API_BASE_URL}/v1/reading-session/${readingSessionId}`, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const endReadingSession = (bookId, endPage, e, navigate) => {
	e.preventDefault()

	const token = localStorage.getItem('login-token')
	const readingTime = Math.round(localStorage.getItem('reading-session-time'))
	const READING_SESSION_END_API_URL = `${API_BASE_URL}/v1/reading-session/${bookId}/end?page=${endPage}&time=${readingTime}`

	fetch(encodeURI(READING_SESSION_END_API_URL), {
		method: 'PUT',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status.toString().startsWith(2)) {
				localStorage.removeItem('reading-session-time')

				navigate(`/book/detail/${bookId}`)
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		})
}

const getAllReadingSessionOfBook = (bookId) => {
	const token = getToken()

	return fetch(`${API_BASE_URL}/v1/reading-session/${bookId}`, { method: 'GET', headers: { Authorization: token } })
		.then((res) => res.json())
		.then((readingSessionList) => {
			return readingSessionList
		})
}

const addReadingSession = (bookId, year, month, day, startPage, endPage, readTime) => {
	const token = getToken()
	const ADD_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${bookId}`

	return fetch(ADD_READING_SESSION_API_URL, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			startDate: `${year}-${month}-${day}`,
			startPage: startPage,
			endPage: endPage,
			readTime: readTime,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const deleteReadingSession = (readingSessionId) => {
	const token = getToken()
	const DELETE_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${readingSessionId}`

	return fetch(DELETE_READING_SESSION_API_URL, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

export {
	startReadingSession,
	endReadingSession,
	getCurrentReadingSession,
	endReadingSessionWithoutSaving,
	getAllReadingSessionOfBook,
	addReadingSession,
	deleteReadingSession,
}
