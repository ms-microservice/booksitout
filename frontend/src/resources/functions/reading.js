import toast from 'react-hot-toast'

const READING_SESSION_API_URL = `http://localhost/v1/reading-session/`
const READING_SESSION_CURRENT_API_URL = `http://localhost/v1/reading-session/current`

const getCurrentReadingSession = (bookId, setBook, toggleTimer, navigate) => {
	const token = localStorage.getItem('login-token')

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
				toggleTimer(true)
			} else {
				toast.error('진행중인 독서활동이 있어요')
				navigate(`/reading/${readingSession.book.bookId}`)
			}
		})
		.catch(() => {
			startReadingSession(bookId, toggleTimer, setBook, navigate)
		})
}

const startReadingSession = (bookId, toggleTimer, setBook, token, navigate) => {
	fetch(READING_SESSION_API_URL + bookId, {
		method: 'POST',
		headers: { Authorization: token },
	})
		.then((res) => {
			return res.json()
		})
		.then((readingSession) => {
			setBook(readingSession)
			toggleTimer(true)
		})
		.catch((res) => {
			// alert('진행중인 독서활동이 있어요 ')
			// navigate(`/reading/${res.json().bookId}`)
		})
}

const deleteReadingSession = (token, navigate) => {
	fetch(READING_SESSION_CURRENT_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (res.status.toString().startsWith(4)) {
				throw new Error()
			} else {
				return res.json()
			}
		})
		.then((currentReadingSession) => {
			return currentReadingSession.readingSessionId
		})
		.then((readingSessionId) => {
			fetch(READING_SESSION_API_URL + readingSessionId, {
				method: 'DELETE',
				headers: { Authorization: token },
			}).then((res) => {
				if (res.status.toString().startsWith(2)) {
					localStorage.removeItem('reading-session-time')

					toast.success('독서활동을 저장하지 않고 끝냈어요')
					navigate('/book/not-done')
				} else {
					toast.error('오류가 났어요 다시 시도해 주세요')
				}
			})
		})
		.catch((e) => {
			toast.error('오류가 났어요')
			return
		})
}

const endReadingSession = (bookId, endPage, e, navigate) => {
	e.preventDefault()

	const token = localStorage.getItem('login-token')
	const READING_SESSION_END_API_URL = `http://localhost/v1/reading-session/${bookId}/end?page=${endPage}&time=${localStorage.getItem(
		'reading-session-time'
	)}`

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

export { startReadingSession, endReadingSession, getCurrentReadingSession, deleteReadingSession }
