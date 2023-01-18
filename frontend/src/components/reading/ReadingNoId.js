import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
// Functions
// Settings
import urls from '../../settings/urls'
import utils from '../../functions/utils'

const ReadingNoId = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const BOOK_CURRENT_READING_SESSION_API_URL = `${urls.api.base}/v1/book/current-reading-session`

		fetch(BOOK_CURRENT_READING_SESSION_API_URL, {
			method: 'GET',
			headers: { Authorization: utils.getToken() },
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				} else {
					localStorage.removeItem('timer-on')
					localStorage.removeItem('reading-session-time')
					navigate('/book/not-done/all')
				}
			})
			.then((book) => {
				navigate(`/reading/${book.bookId}`)
			})
	}, [navigate])

	return (
		<div className='container'>
			<Loading />
		</div>
	)
}

export default ReadingNoId
