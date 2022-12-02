const READING_SESSION_API_URL = `http://localhost/v1/reading-session/`
const READING_SESSION_CURRENT_API_URL = `http://localhost/v1/reading-session/current`

const getCurrentReadingSession = (bookId, setBook, toggleTimer, token, navigate) => {
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
				alert('진행중인 독서활동이 있어요')
				navigate(`/reading/${readingSession.book.bookId}`)
			}
		})
		.catch(() => {
			startReadingSession(bookId, toggleTimer, setBook, token, navigate)
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

export { startReadingSession, getCurrentReadingSession }
