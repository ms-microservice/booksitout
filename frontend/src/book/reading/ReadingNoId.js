import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../common/Loading'
import { READING_SESSION_CURRENT_API_URL } from '../../resources/data/apiUrl'

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
