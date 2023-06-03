import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../../common/CardTitle'
import { BsFillPersonVcardFill as CardIcon} from 'react-icons/bs'

import appleWallet from './icons/apple-wallet-korean-small.png'
import googleWallet from './icons/google-wallet-english-small.png'
import urls from '../../settings/urls'

const MembershipDetailAddCard = ({ id }) => {
	return (
		<Card style={{ minHeight: '250px' }}>
			<Card.Body>
				<CardTitle icon={<CardIcon />} title={'추가하기'} subTitle={undefined} textSize={2} />

				<div className='row justify-content-center align-items-center mt-3' style={{ minHeight: '150px' }}>
					<div className='col-12 text-center'>
						<a href={`${urls.api.base}/v5/library/membership/apple-wallet/${id}`} target='_blank' rel='noreferrer'>
							<img src={appleWallet} alt='' className='clickable' style={{ width: '244px' }} />
							<div className='mb-3 ms-2 me-2' />
						</a>
					</div>

					{/* <div className='col-12 col-md-6 text-center'>
						<img src={googleWallet} alt='' className='clickable' style={{ width: '244px' }} />
						<div className='mb-3 ms-2 me-2' />
					</div> */}
				</div>
			</Card.Body>
		</Card>
	)
}

export default MembershipDetailAddCard