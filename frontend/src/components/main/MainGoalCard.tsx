import { Card } from 'react-bootstrap'
import Goal from '../../goal/Goal'

const MainGoalCard = ({ goal }) => {
	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100 mb-4'>
				<a href='/goal' className='text-decoration-none text-black h-100'>
					<h3>{new Date().getFullYear()}년 목표</h3>

					<div className='h-100'>
						<Goal goal={goal} />
					</div>
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainGoalCard
