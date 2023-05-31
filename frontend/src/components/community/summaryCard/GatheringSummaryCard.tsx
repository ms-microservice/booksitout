import { Card } from "react-bootstrap"
import { FaPeopleArrows as PeopleIcon } from 'react-icons/fa'

import GatheringSimpleCard from './GatheringSimpleCard'
import AllButton from "../../common/AllButton"
import NoContent from "../../common/NoContent"
import Error from '../../common/Error';
import CardTitle from "../../../common/CardTitle"

const CommunityRouteGatheringCard = ({ gatheringList, title = '독서모임', minHeight = '500px', col='col-12 col-md-6 col-xl-4' }) => {
	return (
		<Card style={{ minHeight: minHeight }} className='h-100'>
			<a href='/community/gathering/all' className='text-black h-100'>
				<Card.Body className='h-100'>
					<CardTitle icon={<PeopleIcon />} title={title} />

					{gatheringList === undefined ? (
						<Error />
					) : gatheringList == null || gatheringList.length === 0 ? (
						<NoContent message='독서모임이 없어요' />
					) : (
						<div className='row row-eq-height'>
							{gatheringList.slice(0, 6).map((gathering) => {
								return (
									<div className={`${col} mb-3`}>
										<GatheringSimpleCard gathering={gathering} />
									</div>
								)
							})}
						</div>
					)}

					<div className='pt-2' />

					<AllButton url={'/community/gathering/all'} />
				</Card.Body>
			</a>
		</Card>
	)
}

export default CommunityRouteGatheringCard