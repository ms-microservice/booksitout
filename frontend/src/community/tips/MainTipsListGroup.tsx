import { BiTime as TimeIcon } from 'react-icons/bi'

import NoContent from '../../components/common/NoContent'
import Error from '../../components/common/Error'
import { ListGroup } from 'react-bootstrap'

const MainTipsListGroup = ({postList}) => {

    if (postList == null) return <Error/>
    if (postList.length === 0) return <NoContent message='아직 꿀팁이 없어요' />

    return (
		<div className='row'>
			{postList.map((post, i) => {
				return (
					<a href={`/introduction/tips/detail/${post.id}`} className={`col-12 col-md-6 ${i % 2 === 0 ? 'pe-md-0' : 'ps-md-0'}`}>
						<ListGroup.Item className='d-flex w-100 pe-0 p-3'>
							<div className='row w-100'>
								<div className='col-12 col-lg-9'>
									<div className='text-book'>
										<TimeIcon className='mb-1' /> 약 {post.estimatedReadTime}분
									</div>

									<h5 style={{ height: '40px' }}>{post.title}</h5>
								</div>

								<div className='col-12 col-lg-3'>
									<p className='text-secondary text-end mt-2 mt-md-0 mb-0'>{`${post.createdDate.split('-')[0].slice(2)}년  ${
										post.createdDate.split('-')[1]
									}월`}</p>
								</div>
							</div>
						</ListGroup.Item>
					</a>
				)
			})}
		</div>
	)
}

export default MainTipsListGroup