import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { AiFillCheckCircle as CheckIcon } from 'react-icons/ai'

const RegionSearchResult = ({ region, selected }) => {
	return (
		<ListGroup.Item className='d-flex justify-content-center align-items-center rounded clickable p-0 m-0' style={{ height: '60px' }}>
			{selected === region.id && (
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
				src={region.logo}
				alt=''
				className='img-fluid me-3'
				style={{ width: '50px', height: '50px', opacity: selected === region.id ? '0.6' : '1.0' }}
			/>
			<p className='m-0' style={{ opacity: selected === region.id ? '0.6' : '1.0' }}>
				{region.name.korean}
			</p>
		</ListGroup.Item>
	)
}

export default RegionSearchResult