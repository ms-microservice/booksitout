import React from 'react'
import { Card } from 'react-bootstrap'

const StatisticsInfoCard = ({ icon, count, textFront, textBack }) => {
	return (
		<Card style={{ height: '100px' }}>
			<Card.Body>
				<div className="text-center">
					<h3 className="text-book">{icon}</h3>

					<div className="clamp-1-line">
						{textFront} <b className="text-book">{count}</b>
						{textBack}
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default StatisticsInfoCard