import React from 'react'
import Barcode from 'react-barcode'
import { Card } from 'react-bootstrap'
import Error from '../../components/common/Error';

const MembershipCard = ({ membership, width=2 }) => {
	return (
		<Card style={{ minHeight: '200px' }}>
			<Card.Body>
				{membership == null ? (
					<Error move={0} mt={10}/>
				) : (
					<a href={`/library/membership/${membership.id}`}>
						<div className='row'>
							<div className='col-4'>
								<img src={membership.region.logo} alt='' style={{ width: '50px' }} />
							</div>

							<div className='col-8 text-end'>
								<h5>{membership.region.koreanName}</h5>
							</div>
						</div>

						<div className='w-100 text-center'>
							<Barcode value={membership.number} height={80} width={width} />
						</div>
					</a>
				)}
			</Card.Body>
		</Card>
	)
}

export default MembershipCard