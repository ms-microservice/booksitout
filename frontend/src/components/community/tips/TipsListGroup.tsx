import React from 'react'
import { BiTime as TimeIcon } from 'react-icons/bi'

import TipsType from '../../../types/TipsType'

import NoContent from '../../common/NoContent'
import Error from '../../common/Error'
import Loading from '../../common/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteScrollLoading from '../../common/InfiniteScrollLoading'
import { booksitoutServer } from '../../../functions/axios'

const TipsListGroup = ({ range }) => {
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

	const [currentPage, setCurrentPage] = React.useState(1)	
	const [totalPages, setTotalPages] = React.useState(0)	

	const [postList, setPostList] = React.useState<TipsType[]>([])
	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 500)

		getNextPage()
	}, [])

	const getNextPage = () => {
		booksitoutServer
			.get(`/v4/forum/tips?type=${range}&size=18&page=${currentPage}`)
			.then((res) => {
				setTotalPages(res.data.totalPages)
				setPostList([...postList, ...res.data.content])
				setCurrentPage(currentPage + 1)
			})
			.catch(() => {
				setError(true)
			})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
	}

	if (initialFetch) return <></>
	if (loading) return <Loading />
	if (postList == null || error) return <Error />
	if (postList.length === 0) return <NoContent message='아직 꿀팁이 없어요' useImage={false} mb='75px' mt='75px' />

	return (
		<InfiniteScroll loader={<InfiniteScrollLoading />} next={getNextPage} hasMore={currentPage < totalPages} dataLength={totalPages} className='overflow-hidden'>
			<div className='row'>
				{postList.map((post, i) => {
					return (
						<a href={`/introduction/tips/detail/${post.id}`} className='mb-3'>
							<li className='d-flex w-100 pe-0 border p-3 rounded'>
								<div className='row w-100'>
									<div className='col-12 col-md-8'>
										<div className='text-book'>
											<TimeIcon className='mb-1' /> 약 {post.estimatedReadTime}분
										</div>

										<h5>{post.title}</h5>
									</div>

									<div className='col-12 col-md-4'>
										<p className='text-secondary text-end mt-3'>{`${post.createdDate?.split('-')[0].slice(2) ?? '-'}년  ${
											post.createdDate?.split('-')[1] ?? '-'
										}월`}</p>
									</div>
								</div>
							</li>
						</a>
					)
				})}
			</div>
		</InfiniteScroll>
	)
}

export default TipsListGroup
