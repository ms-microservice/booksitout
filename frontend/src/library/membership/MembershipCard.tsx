import React from 'react'
import Barcode from 'react-barcode'
import { Card } from 'react-bootstrap'
import Error from '../../common/Error';
import utils from '../../functions/utils';

const MembershipCard = ({ membership, width=2, height=80 }) => {
	return (
		<Card style={{ minHeight: height * 2.5 }}>
			<Card.Body>
				{membership == null ? (
					<Error move={0} mt={10} />
				) : (
					<a href={`/library/membership/${membership.id}`}>
						<div className='row'>
							<div className='col-4'>
								<img src={membership.logo} alt='' style={{ height: '40px' }} />
							</div>

							<div className='col-8 text-end'>
								<h5 className='clamp-1-line'>{membership.name}</h5>
							</div>
						</div>

						<div className='w-100 text-center'>
							<Barcode value={membership.number} height={height} width={width} displayValue={false} />

							<h6>{utils.insertSpace(membership.number)}</h6>
						</div>
					</a>
				)}
			</Card.Body>
		</Card>
	)
}

export default MembershipCard