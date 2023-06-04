import React from 'react'
import Barcode from 'react-barcode'
import { Card } from 'react-bootstrap'
import Error from '../../components/common/Error';
import utils from '../../functions/utils';

const MembershipCard = ({ membership, width=2 }) => {
	return (
		<Card style={{ minHeight: '200px' }}>
			<Card.Body>
				{membership == null ? (
					<Error move={0} mt={10} />
				) : (
					<a href={`/library/membership/${membership.id}`}>
						<div className='row'>
							<div className='col-4'>
								<img src={membership.logo} alt='' style={{ width: '50px' }} />
							</div>

							<div className='col-8 text-end'>
								<h5>{membership.name}</h5>
							</div>
						</div>

						<div className='w-100 text-center'>
							<Barcode value={membership.number} height={80} width={width} displayValue={false} />

							<h6>{utils.insertSpace(membership.number)}</h6>
						</div>
					</a>
				)}
			</Card.Body>
		</Card>
	)
}

export default MembershipCard