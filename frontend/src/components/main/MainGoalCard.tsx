import { Card } from 'react-bootstrap'
import Goal from '../../goal/Goal'
import CardTitle from '../../common/CardTitle'
import { TbTargetArrow as GoalIcon } from 'react-icons/tb'
import Error from '../common/Error';
import NoContent from '../common/NoContent';

const MainGoalCard = ({ goal, loading }) => {
	return (
		<Card className='h-100' style={{ minHeight: '400px' }}>
			<Card.Body className='h-100 mb-5'>
				<a href='/goal' className='text-black h-100'>
					<CardTitle icon={<GoalIcon />} title={`${new Date().getFullYear()}년 목표`} iconSize={1} />

					{goal == null && loading ? (
						<div style={{ transform: `translateY(40px)` }}>
							<Goal goal={goal} loading={true} />
						</div>
					) : goal == null ? (
						<NoContent message={`${new Date().getFullYear()}년 목표가 없어요`} move={40} />
					) : goal === undefined ? (
						<Error />
					) : (
						<div className='h-100 d-flex align-items-center' style={{ transform: 'translateY(-30px)' }}>
							<Goal goal={goal} loading={false} />
						</div>
					)}
				</a>
			</Card.Body>
		</Card>
	)
}

export default MainGoalCard
