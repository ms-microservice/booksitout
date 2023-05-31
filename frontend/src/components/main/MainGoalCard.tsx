import { Card } from 'react-bootstrap'
import Goal from '../../goal/Goal'
import CardTitle from '../../common/CardTitle'
import { TbTargetArrow as GoalIcon } from 'react-icons/tb'

const MainGoalCard = ({ goal, loading }) => {
	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100 mb-4'>
				<a href='/goal' className='text-black h-100'>
					<CardTitle icon={<GoalIcon />} title={`${new Date().getFullYear()}년 목표`} iconSize={1} />

					<div className='h-100 d-flex align-items-center' style={{ transform: 'translateY(-30px)' }}>
						<Goal goal={goal} loading={loading} />
					</div>
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainGoalCard
