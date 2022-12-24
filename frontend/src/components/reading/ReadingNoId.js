import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
// URL
import { READING_SESSION_CURRENT_API_URL } from '../../settings/urls/apiUrl'

const ReadingNoId = ({ token }) => {
	const navigate = useNavigate()

	useEffect(() => {
		fetch(READING_SESSION_CURRENT_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				}

				navigate('/book/not-done')
			})
			.then((data) => {
				navigate(`/reading/${data.book.bookId}`)
			})
	}, [])

	return (
		<div className='container'>
			<Loading />
		</div>
	)
}

export default ReadingNoId
