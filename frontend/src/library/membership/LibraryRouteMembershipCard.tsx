import React from 'react'
import { Card } from 'react-bootstrap'
import { booksitoutServer } from '../../functions/axios'

import NoContent from '../../components/common/NoContent'
import Error from '../../components/common/Error';
import AllButton from '../../components/common/AllButton'
import CardTitle from '../../common/CardTitle'
import { PageType } from '../../types/PageType'

import { MembershipType } from './MembershipType'
import MembershipCard from './MembershipCard'
import MembershipCardLoading from './MembershipCardLoading'
import AddButton from '../../components/common/AddButton';
import { BsFillPersonVcardFill as CardIcon} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const LibraryRouteMembershipCard = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = React.useState<boolean>(true)

	const [membershipList, setMembershipList] = React.useState<PageType<MembershipType[]> | undefined>(undefined)
	React.useEffect(() => {
		booksitoutServer
			.get('v5/library/membership')
			.then((res) => setMembershipList(res.data))
			.catch(() => setMembershipList(undefined))
			.finally(() => setLoading(false))
	}, [])

	return (
		<Card style={{ minHeight: '575px' }} className='h-100'>
			<Card.Body>
				<CardTitle icon={<CardIcon />} title={'도서관 회원증'} subTitle={'도서관 회원증을 편하게 관리할 수 있어요'} textSize={3} />
				<AddButton size='40' top='20px' onClick={() => navigate('/library/membership/add/image')} />

				{loading ? (
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
					<Error />
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
		</Card>
	)
}

export default LibraryRouteMembershipCard