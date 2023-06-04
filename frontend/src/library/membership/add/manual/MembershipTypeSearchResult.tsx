import React from 'react'
import {AiFillCheckCircle as CheckIcon} from 'react-icons/ai'
import { ListGroup } from 'react-bootstrap'

const MembershipTypeSearchResult = ({ type, selected }) => {
	return (
		<ListGroup.Item className='d-flex justify-content-center align-items-center rounded clickable p-0 m-0' style={{ height: '60px' }}>
			{selected === type.id && (
				<CheckIcon
					className='img-fluid text-book'
					style={{
						width: '25px',
						height: '25px',
						position: 'absolute',
						top: '0px',
						right: '0px',
						zIndex: 100,
						overflow: 'visible',
					}}
				/>
			)}

			<img
				src={type.logo}
				alt=''
				className='img-fluid me-3'
				style={{ width: '50px', height: '50px', opacity: selected === type.id ? '0.6' : '1.0' }}
			/>
			<p className='m-0' style={{ opacity: selected === type.id ? '0.6' : '1.0' }}>
				{type.name}
			</p>
		</ListGroup.Item>
	)
}

export default MembershipTypeSearchResult