import React from 'react'
import { Card } from 'react-bootstrap';

const LibraryRegionSummaryCard = ({ region, pagedLibrary }) => {
	return (
		<Card style={{ minHeight: '150px' }}>
			<Card.Body>
				<div className='row align-items-center'>
					<div className='col-12 col-md-8'>
						<div className='d-flex align-items-center'>
							<img
								src={region.depth2 == null ? region.depth1.logo : region.depth2.logo}
								alt=''
								style={{ height: '50px' }}
								className='rounded me-3'
							/>
							<h2 className='pt-2'>
								{region.depth1.koreanName} {region.depth2 == null ? '' : region.depth2.koreanName}
							</h2>
						</div>
					</div>

					<div className='col-12 col-md-4 text-end'>
						<h3 className='text-secondary'>총 {pagedLibrary.totalElements}곳</h3>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default LibraryRegionSummaryCard