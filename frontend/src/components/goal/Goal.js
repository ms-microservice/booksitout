import React from 'react'
// Components
import NoContent from '../common/NoContent'
// Resources
import goalIcon from '../../resources/images/statistics/goal.png'
import goalCompleteIcon from '../../resources/images/statistics/goal-complete.png'
// Messages
import messages from '../../settings/messages'

const Goal = ({ goal }) => {
	return (
		<div className='d-flex text-center h-100 w-100 align-items-center'>
			{goal == null ? (
				<div className='h-100 w-100'>
					<NoContent message={messages.goal.noContent} useImage={false}/>
				</div>
			) : (
				<>
					{goal.current >= goal.goal && (
						<div
							className='row position-absolute opacity-100'
							style={{ width: '180px', left: '55%', top: '55%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
							<img src={goalCompleteIcon} className='img-fluid' alt='' />

							<h4 className='mt-2'>목표달성!</h4>
						</div>
					)}

					<div className={'col-6 align-self-center' + (goal.current >= goal.goal ? ' opacity-25' : '')}>
						<img
							src={goalIcon}
							alt=''
							className='img-fluid align-middle'
							style={{
								height: '150px',
							}}
						/>
					</div>

					<div className={'col-6 align-self-center' + (goal.current >= goal.goal ? ' opacity-25' : '')}>
						<h1 style={{ whiteSpace: 'nowrap' }}>
							{goal.current}권 / {goal.goal}권
						</h1>
					</div>
				</>
			)}
		</div>
	)
}

export default Goal
