import React from 'react'
// Components
import NoContent from '../common/NoContent'
// Resources
import goalIcon from '../../resources/images/general/goal.png'

const GoalView = ({ goal }) => {
	return (
		<div className='row text-center' style={{ height: '80%' }}>
			{goal == null ? (
				<NoContent message='목표가 설정되지 않았어요' />
			) : (
				<>
					<div className='col-6 align-self-center'>
						<img
							src={goalIcon}
							alt=''
							className='img-fluid align-middle'
							style={{
								width: '150px',
								height: '150px',
							}}
						/>
					</div>

					<div className='col-6 align-self-center'>
						<h1>
							{goal.current}권 / {goal.goal}권
						</h1>
					</div>
				</>
			)}
		</div>
	)
}

export default GoalView
