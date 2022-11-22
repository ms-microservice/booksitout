import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ReadingNoId = ({ token }) => {
	const READING_SESSION_CHECK_API_URL = `http://localhost/v1/reading-session/current`
	const READING_SESSION_URL = `/reading/`

	const navigate = useNavigate()

	useEffect(() => {
		fetch(READING_SESSION_CHECK_API_URL, {
			method: 'GET',
			headers: { Authorization: token },
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				}

				return
			})
			.then((data) => {
				console.log(data)
				navigate(`${READING_SESSION_URL}${data.book.bookId}`)
			})
	}, [])

	return (
		<div className='container'>
			<h1>ReadingNoId</h1>
		</div>
	)
}

export default ReadingNoId
