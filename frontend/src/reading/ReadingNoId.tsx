import React from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../common/Loading'
import utils from '../functions/utils'
import urls from '../settings/urls'

const ReadingNoId = () => {
	const navigate = useNavigate()

	React.useEffect(() => {
		fetch(urls.api.reading.get.current, {
			method: 'GET',
			headers: { Authorization: utils.getToken() ?? '' },
		})
			.then((res) => {
				if (!res.status.toString().startsWith('2')) {
					throw new Error()
				}

				return res.json()
			})
			.then((book) => {
				navigate(`/reading/${book.bookId}`)
			})
			.catch(() => {
				localStorage.removeItem('timer-on')
				localStorage.removeItem('reading-session-time')
				navigate('/book/not-done/all')
			})
	}, [navigate])

	return (
		<div className='container'>
			<Loading />
		</div>
	)
}

export default ReadingNoId
