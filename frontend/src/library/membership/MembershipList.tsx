import React from 'react'
import { booksitoutServer } from '../../functions/axios';

import { PageType } from '../../types/PageType'
import Error from '../../components/common/Error';
import NoContent from '../../components/common/NoContent'
import RouteTitle from '../../common/RouteTitle';

import { MembershipType } from './MembershipType'
import MembershipCard from './MembershipCard';
import MembershipCardLoading from './MembershipCardLoading';
import { BsFillPersonVcardFill as CardIcon} from 'react-icons/bs'

import InfiniteScrollLoading from '../../components/common/InfiniteScrollLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from 'react-bootstrap';

const MembershipList = () => {
    const [loading, setLoading] = React.useState<boolean>(true)

    const [membershipPaged, setMembershipPaged] = React.useState<PageType<MembershipType[]> | null>(null)
    const [page, setPage] = React.useState<number>(1)
    React.useEffect(() => {
        booksitoutServer
			.get(`v5/library/membership?page=${page}`)
			.then((res) => setMembershipPaged(res.data))
			.finally(() => setLoading(false))
	}, [page])

	return (
		<div className='container-xl' style={{ minHeight: '500px' }}>
			<RouteTitle icon={<CardIcon />} title={'모든 도서관 회원증'} />

			{loading ? (
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
				<>
					<NoContent message='도서관 회원증이 없어요' />
					<div className='row justify-content-center'>
						<div className='col-12 col-md-6'>
							<a href='/library/membership/add/image'>
								<Button variant='book' className='w-100'>
									바로 추가하기
								</Button>
							</a>
						</div>
					</div>
				</>
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