import React from 'react'
import { Card } from 'react-bootstrap'
import { booksitoutServer } from '../../functions/axios'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

import NoContent from '../../common/NoContent'
import Error from '../../common/Error';
import AllButton from '../../common/AllButton'
import CardTitle from '../../common/CardTitle'
import { PageType } from '../../types/PageType'

import { MembershipType } from './MembershipType'
import MembershipCard from './MembershipCard'
import MembershipCardLoading from './MembershipCardLoading'
import AddButton from '../../common/AddButton';
import { useNavigate } from 'react-router-dom';

const LibraryRouteMembershipCard = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = React.useState<boolean>(true)
	const [initialFetch, setInitialFetch] = React.useState<boolean>(true)

	const [membershipList, setMembershipList] = React.useState<PageType<MembershipType[]> | undefined>(undefined)
	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 300)

		booksitoutServer
			.get('v5/library/membership')
			.then((res) => setMembershipList(res.data))
			.catch(() => setMembershipList(undefined))
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})
	}, [])

	return (
		<Card style={{ minHeight: '575px' }} className='h-100'>
			<AddButton size='40' top='20px' onClick={() => navigate('/library/membership/add/image')} />

			<a href='/library/membership/all' className='text-black'>
				<Card.Body>
					<CardTitle
						icon={<booksitoutIcon.membership />}
						title={'도서관 회원증'}
						subTitle={'도서관 회원증을 편하게 관리할 수 있어요'}
						textSize={3}
					/>

					{initialFetch ? (
						<></>
					) : loading ? (
						<div className='row'>
							{Array.from({ length: 4 }).map(() => {
								return (
									<div className='col-12 col-md-6 mb-3'>
										<MembershipCardLoading />
									</div>
								)
							})}
						</div>
					) : membershipList === undefined ? (
						<Error move={-140} />
					) : membershipList.content.length === 0 ? (
						<NoContent message='추가하신 회원증이 없어요' move={0} mt={130} />
					) : (
						<div className='row'>
							{membershipList.content.map((membership) => {
								return (
									<div className='col-12 col-md-6 mb-3'>
										<MembershipCard membership={membership} />
									</div>
								)
							})}
						</div>
					)}

					<AllButton url='/library/membership/all' />
				</Card.Body>
			</a>
		</Card>
	)
}

export default LibraryRouteMembershipCard