import React from 'react'
import { booksitoutServer } from '../../functions/axios'
import { GatheringDetailType } from './GatheringType'
import { useLoaderData } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import UserCard from '../../components/community/post/UserCard'
import GatheringTypeCard from './GatheringTypeCard'
import GatheringLocationCard from './GatheringLocationCard'
import parse from 'html-react-parser'

export async function loader({ params }) {
	const id = params.id

	return booksitoutServer
		.get(`/v4/forum/gathering/${id}`)
		.then((res) => res.data)
		.catch((e) => {
			throw e
		})
}

const GatheringDetail = () => {
    const gathering = useLoaderData() as GatheringDetailType

    return (
		<div className='container-xl'>
			<Card className='mb-3'>
				<Card.Body>
					<div className='row h-100'>
						<div className='col-12 col-md-8'>
							<h5 className='mb-4 clamp-two-lines'>
								{gathering.title.slice(0, 50)} {gathering.title.length > 50 && <span className='text-secondary'>...</span>}
							</h5>

							<div className='mb-2 mb-md-0'>
								<UserCard user={gathering.user} />
							</div>
						</div>

						<div className='col-12 col-md-4 d-flex flex-column align-items-center justify-content-center mt-2'>
							<div className='w-100 mb-2 mb-md-2'>
								<GatheringTypeCard gatheringType={gathering.type} />
							</div>

							<div className='w-100 mb-2 mb-md-2'>
								<GatheringLocationCard gatheringLocation={gathering.location} />
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>

			<Card style={{ minHeight: '300px' }} className='mb-3'>
				<Card.Body className='d-flex align-items-center'>
					<p>{parse(gathering.content)}</p>
				</Card.Body>
			</Card>

			<Card style={{ minHeight: '200px' }} className='mb-3'>
				<Card.Body className='row align-items-center justify-content-center'>
					<h2 className='text-center p-0'>
						<span className='text-book'>{gathering.joinCount}</span> / {gathering.capacityCount}
					</h2>

					<div className='col-12 col-md-7'>
						<a href={`/community/gathering/join/${gathering.id}`}>
							<Button variant='book' className='w-100' disabled={gathering.joinCount >= gathering.capacityCount}>
								신청하기
							</Button>
						</a>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default GatheringDetail