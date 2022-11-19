import React from 'react'
import { Alert } from 'react-bootstrap'

const Statistics = () => {
	const ALERT_MESSAGE = `${localStorage.getItem('user-name')}님이 열심히 한 독서활동을 다 보여 드릴게요!`

	return (
		<div className='container'>
			<Alert variant='success'>{ALERT_MESSAGE}</Alert>
		</div>
	)
}

export default Statistics
