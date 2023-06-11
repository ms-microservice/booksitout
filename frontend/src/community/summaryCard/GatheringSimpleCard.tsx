import { Card } from 'react-bootstrap'
import UserCard from '../post/UserCard'
import GatheringTypeCard from '../../community/gathering/GatheringTypeCard'
import GatheringLocationCard from '../../community/gathering/GatheringLocationCard'

const GatheringSimpleCard = ({ gathering }) => {
	return (
		<Card className='h-100'>
			<Card.Body className='h-100'>
				<a href={`/community/gathering/detail/${gathering.id}`} className='h-100'>
					<div className='row h-100'>
						<div className='col-12 col-md-7 col-xl-8'>
							<h5 className='mb-4 clamp-two-lines'>
								{gathering.title.slice(0, 50)} {gathering.title.length > 50 && <span className='text-secondary'>...</span>}
							</h5>

							<div className='mb-2 mb-md-0'>
								<UserCard user={gathering.user} />
							</div>
						</div>

						<div className='col-12 col-md-5 col-xl-4 d-flex flex-column align-items-center justify-content-center mt-2'>
							<div className='w-100 mb-2 mb-md-2'>
								<GatheringTypeCard gatheringType={gathering.type} />
							</div>

							<div className='w-100 mb-2 mb-md-2'>
								<GatheringLocationCard gatheringLocation={gathering.location} />
							</div>
						</div>
					</div>
				</a>
			</Card.Body>
		</Card>
	)
}

export default GatheringSimpleCard