import React from 'react'
import { booksitoutServer } from '../../functions/axios';

import { PageType } from '../../types/PageType'
import Error from '../../common/Error';
import NoContent from '../../common/NoContent'
import RouteTitle from '../../common/RouteTitle';

import { MembershipType } from './MembershipType'
import MembershipCard from './MembershipCard';
import MembershipCardLoading from './MembershipCardLoading';
import { BsFillPersonVcardFill as CardIcon} from 'react-icons/bs'

import InfiniteScrollLoading from '../../common/InfiniteScrollLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddButton from '../../common/AddButton';
import { useNavigate } from 'react-router-dom';

const MembershipList = () => {
	const navigate = useNavigate()

    const [loading, setLoading] = React.useState<boolean>(true)
	const [initialFetch, setInitialFetch] = React.useState<boolean>(true)

    const [membershipPaged, setMembershipPaged] = React.useState<PageType<MembershipType[]> | null>(null)
    const [page, setPage] = React.useState<number>(1)
    React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 300)

        booksitoutServer
			.get(`v5/library/membership?page=${page}`)
			.then((res) => setMembershipPaged(res.data))
			.finally(() => {
				setLoading(false)
				setInitialFetch(false)
			})
	}, [page])

	return (
		<div className='container-xl' style={{ minHeight: '500px' }}>
			<RouteTitle icon={<CardIcon />} title={'모든 도서관 회원증'} />
			<AddButton size={40} top='80px' onClick={() => navigate('/library/membership/add/image')} />

			{initialFetch ? (
				<></>
			) : loading ? (
				Array.from({ length: 4 }).map(() => {
					return (
						<div className='mb-4'>
							<MembershipCardLoading />
						</div>
					)
				})
			) : membershipPaged === null ? (
				<Error move={-60} />
			) : membershipPaged.content.length === 0 ? (
				<NoContent message='도서관 회원증이 없어요' move={-60} />
			) : (
				membershipPaged.content.map((membership) => {
					return (
						<InfiniteScroll
							dataLength={membershipPaged.totalElements}
							next={() => setPage(page + 1)}
							hasMore={!membershipPaged.last}
							loader={<InfiniteScrollLoading />}
							className='overflow-hidden'>
							<div className='mb-4'>
								<MembershipCard membership={membership} />
							</div>
						</InfiniteScroll>
					)
				})
			)}
		</div>
	)
}

export default MembershipList