import { Card } from 'react-bootstrap'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const GatheringLocationCard = ({ gatheringLocation }) => {
	return (
		<Card>
			<Card.Body className='pt-2 pb-2'>
				<div className='d-flex align-items-center justify-content-center'>
					<h5 className='me-3'>{getGatheringLocationTypeIcon(gatheringLocation.type)}</h5>
					<h5 className='pt-1 text-secondary'>{gatheringLocation.description === '' ? '방식 미정' : gatheringLocation.description}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

const getGatheringLocationTypeIcon = (type) => {
	if (type === 'SUBWAY') return <booksitoutIcon.subway className='text-book' />
	if (type === 'ONLINE') return <booksitoutIcon.online className='text-book' />

	return <booksitoutIcon.others className='text-book' />
}

export default GatheringLocationCard
