import { Card } from 'react-bootstrap'

import {
	BsFillCalendarCheckFill as CheckingIcon,
	BsFillChatQuoteFill as TalkingIcon,
	BsPersonWorkspace as DiscussionIcon,
	BsClipboardFill as BookReportIcon,
	BsCupHotFill as FreeIcon,
} from 'react-icons/bs'

const GatheringTypeCard = ({ gatheringType }) => {
	return (
		<Card>
			<Card.Body className='pt-2 pb-2'>
				<div className='d-flex align-items-center justify-content-center'>
					<h5 className='me-3'>{getGatheringTypeIcon(gatheringType)}</h5>
					<h5 className='pt-1 text-secondary'>{gatheringType.displayName}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

const getGatheringTypeIcon = ({type}) => {

    if (type === 'CHECKING') return <CheckingIcon className='text-book'/>
    if (type === 'TALKING') return <TalkingIcon className='text-book'/>
    if (type === 'DISCUSSION') return <DiscussionIcon className='text-book'/>
    if (type === 'BOOK_REPORT') return <BookReportIcon className='text-book' />

    return <FreeIcon className='text-book' />
}

export default GatheringTypeCard