import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MembershipAddMethodButtonGroup = ({ method = 'image' }) => {
	const navigate = useNavigate()

	return (
		<ButtonGroup className="w-100">
			<ToggleButton
				className="w-100"
				variant={method === 'image' ? 'book' : 'light'}
				type="radio"
				checked={false}
				value="image"
				onClick={() => navigate('/add/membership/image')}
			>
				사진
			</ToggleButton>

			<ToggleButton
				className="w-100"
				variant={method === 'manual' ? 'book' : 'light'}
				type="radio"
				checked={false}
				value="manual"
				onClick={() => navigate('/add/membership/manual')}
			>
				직접
			</ToggleButton>
		</ButtonGroup>
	)
}

export default MembershipAddMethodButtonGroup