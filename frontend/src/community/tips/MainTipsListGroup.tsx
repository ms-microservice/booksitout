import NoContent from '../../common/NoContent'
import Error from '../../common/Error'
import { ListGroup } from 'react-bootstrap'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const MainTipsListGroup = ({postList}) => {

    if (postList == null) return <Error/>
    if (postList.length === 0) return <NoContent message='아직 꿀팁이 없어요' />

    return (
		<ListGroup className='d-flex'>
			{postList.slice(0, 4).map((post) => {
				return (
					<ListGroup.Item className='pe-0 p-3'>
						<div className='row'>
							<a href={`/introduction/tips/detail/${post.id}`} className='col-12'>
								<div className='row w-100'>
									<div className='col-12 col-lg-9'>
										<div className='text-book'>
											<booksitoutIcon.time className='mb-1' /> 약 {post.estimatedReadTime}분
										</div>

										<h5>{post.title}</h5>
									</div>

									<div className='col-12 col-lg-3'>
										<p className='text-secondary text-end mt-2 mt-md-0 mb-0'>{`${post.createdDate.split('-')[0].slice(2)}년  ${
											post.createdDate.split('-')[1]
										}월`}</p>
									</div>
								</div>
							</a>
						</div>
					</ListGroup.Item>
				)
			})}
		</ListGroup>
	)
}

export default MainTipsListGroup