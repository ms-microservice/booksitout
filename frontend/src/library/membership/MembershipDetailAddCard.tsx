import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../../common/CardTitle'
import { BsFillPersonVcardFill as CardIcon} from 'react-icons/bs'

import appleWallet from './icons/apple-wallet-korean-small.png'
import googleWallet from './icons/google-wallet-english-small.png'
import { booksitoutServer } from '../../functions/axios'
import toast from 'react-hot-toast'

const MembershipDetailAddCard = ({ id }) => {

	const getAppleWalletPass = () => {
		toast.loading('애플월렛용 도서관 회원증을 만들고 있어요')

		booksitoutServer({
			url: `/v5/library/membership/apple-wallet/${id}`,
			method: 'GET',
			responseType: 'blob',
		})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'appleWalletPass.pkpass')
				document.body.appendChild(link)
				link.click()
				toast.success('회원증을 만들었어요!')
			})
			.catch(() => toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요'))
	}

	return (
		<Card style={{ minHeight: '250px' }}>
			<Card.Body>
				<CardTitle icon={<CardIcon />} title={'추가하기'} subTitle={undefined} textSize={2} />

				<div className='row justify-content-center align-items-center mt-3' style={{ minHeight: '150px' }}>
					<div className='col-12 text-center'>
						<div onClick={getAppleWalletPass}>
							<img src={appleWallet} alt='' className='clickable' style={{ width: '244px' }} />
							<div className='mb-3 ms-2 me-2' />
						</div>
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