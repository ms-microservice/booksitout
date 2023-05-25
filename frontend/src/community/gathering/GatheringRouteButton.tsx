import React from 'react'
import { Card, ButtonGroup, ToggleButton } from 'react-bootstrap'

const GatheringRouteButton = ({ type }) => {
	return (
		<Card>
			<Card.Body>
				<ButtonGroup className='w-100'>
					<a href='/community/gathering/all' className='w-100'>
						<ToggleButton
							variant={type.toUpperCase() === 'ALL' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'not-done'}>
							전체
						</ToggleButton>
					</a>

					<a href='/community/gathering/checking' className='w-100'>
						<ToggleButton
							variant={type.toUpperCase() === 'CHECKING' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'done'}>
							서로 확인만
						</ToggleButton>
					</a>

					<a href='/community/gathering/talking' className='w-100'>
						<ToggleButton
							variant={type.toUpperCase() === 'TALKING' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'give-up'}>
							가볍게 얘기만
						</ToggleButton>
					</a>
				</ButtonGroup>

				<ButtonGroup className='w-100'>
					<a href='/community/gathering/discussion' className='w-100'>
						<ToggleButton
							variant={type.toUpperCase() === 'DISCUSSION' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'not-done'}>
							진지하게 토론
						</ToggleButton>
					</a>

					<a href='/community/gathering/book-report' className='w-100'>
						<ToggleButton
							variant={type.toUpperCase() === 'BOOK-REPORT' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'done'}>
							독후감 포함
						</ToggleButton>
					</a>

					<a href='/community/gathering/free' className='w-100'>
						<ToggleButton
							variant={type.toUpperCase() === 'FREE' ? 'book' : 'light'}
							type='radio'
							checked={false}
							className='w-100'
							value={'give-up'}>
							자유롭게
						</ToggleButton>
					</a>
				</ButtonGroup>
			</Card.Body>
		</Card>
	)
}

export default GatheringRouteButton