import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
// Functions
import utils from '../../functions/utils'
// Settings
import urls from '../../settings/urls'

const ReadingNoId = () => {
	const navigate = useNavigate()

	useEffect(() => {
		fetch(urls.api.reading.get.current, {
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
