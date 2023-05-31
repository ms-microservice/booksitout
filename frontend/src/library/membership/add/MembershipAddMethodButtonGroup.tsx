import React from 'react'
import { ButtonGroup, Card, ToggleButton } from 'react-bootstrap'

const MembershipAddMethodButtonGroup = ({ method = 'image' }) => {
	return (
		<Card>
			<Card.Body>
				<ButtonGroup className='w-100'>
					<a href='/library/membership/add/image' className='w-100'>
						<ToggleButton variant={method === 'image' ? 'book' : 'light'} type='radio' checked={false} value='image' className='w-100'>
							사진
						</ToggleButton>
					</a>

					<a href='/library/membership/add/manual' className='w-100'>
						<ToggleButton variant={method === 'manual' ? 'book' : 'light'} type='radio' checked={false} value='manual' className='w-100'>
							직접
						</ToggleButton>
					</a>

					{/* <a href='/library/membership/add/login' className='w-100'> */}
					<ToggleButton
						variant={method === 'login' ? 'book' : 'light'}
						type='radio'
						checked={false}
						value='manual'
						className='w-100'
						disabled>
						로그인해서
					</ToggleButton>
					{/* </a> */}
				</ButtonGroup>
			</Card.Body>
		</Card>
	)
}

export default MembershipAddMethodButtonGroup