import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import GoalView from './GoalView'

const Goal = () => {
	const [goal, setGoal] = useState({ current: 0, goal: 50 })

	return (
		<div className='container'>
			<Card>
				<Card.Body>
					<GoalView goal={goal} />
				</Card.Body>
			</Card>
		</div>
	)
}

export default Goal
