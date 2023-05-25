import goalIcon from './images/goal.png'
import goalCompleteIcon from './images/goal-complete.png'
import { Card, Placeholder } from 'react-bootstrap'
import Error from '../components/common/Error';

const Goal = ({ goal }) => {
	return (
		<div className='d-flex text-center w-100 h-100 justify-content-center align-items-center'>
			{goal === undefined ? (
				<Error />
			) : (
				<>
					{goal != null && goal.current >= goal.goal && (
						<div
							className='row position-absolute opacity-100'
							style={{ width: '180px', left: '55%', top: '55%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
							<img src={goalCompleteIcon} className='img-fluid' alt='' />

							<h4 className='mt-2'>목표달성!</h4>
						</div>
					)}
					<div className='row w-100'>
						<div className={'col-12 col-md-6 align-self-center' + (goal != null && goal.current >= goal.goal ? ' opacity-25' : '')}>
							<img src={goalIcon} alt='' className='img-fluid' style={{ height: '150px' }} />
						</div>

						<div className={'col-12 col-md-6 align-self-center' + (goal != null && goal.current >= goal.goal ? ' opacity-25' : '')}>
							<h1 className='force-1-line p-2'>
								{goal == null ? (
									<Placeholder as={Card.Text} animation='wave'>
										<Placeholder xs='2' /> 권<span> / </span>
										<Placeholder xs='2' /> 권
									</Placeholder>
								) : (
									<>
										<span className='text-book' style={{ fontWeight: 'bold' }}>
											{goal.current}
										</span>
										권 / {goal.goal}권
									</>
								)}
							</h1>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Goal
