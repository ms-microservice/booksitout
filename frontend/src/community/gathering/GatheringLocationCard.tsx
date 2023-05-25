import { Card } from 'react-bootstrap'
import { BsTrainFrontFill as SubwayIcon, BsWebcamFill as OnlineIcon, BsFillQuestionCircleFill as OthersIcon } from 'react-icons/bs'

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
	if (type === 'SUBWAY') return <SubwayIcon className='text-book' />
	if (type === 'ONLINE') return <OnlineIcon className='text-book' />

	return <OthersIcon className='text-book' />
}

export default GatheringLocationCard
