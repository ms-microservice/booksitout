import React from 'react'
import { Card } from "react-bootstrap"
import GatheringSimpleCard from './GatheringSimpleCard'
import AllButton from "../../common/AllButton"
import NoContent from "../../common/NoContent"
import Error from '../../common/Error';
import CardTitle from '../../common/CardTitle'
import { booksitoutServer } from '../../functions/axios'
import { GatheringType } from '../../community/gathering/GatheringType'
import booksitoutIcon from '../../common/icons/booksitoutIcon';

const CommunityRouteGatheringCard = ({ title = '독서모임', minHeight = '500px', col = 'col-12 col-md-6 col-xl-4' }) => {
	const [gatheringList, setGatheringList] = React.useState<GatheringType[] | null>(null)
	React.useEffect(() => {
		booksitoutServer
			.get(`/v4/forum/gathering/all`)
			.then((res) => setGatheringList(res.data.content))
			.catch((e) => {
				throw e
			})
	}, [])

	return (
		<Card style={{ minHeight: minHeight }} className='h-100'>
			<a href='/community/gathering/all' className='text-black h-100'>
				<Card.Body className='h-100'>
					<CardTitle icon={<booksitoutIcon.gathering />} title={title} />

					{gatheringList == null ? (
						<Error />
					) : gatheringList.length === 0 ? (
						<NoContent message='독서모임이 없어요'/>
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