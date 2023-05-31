import MainTipsCard from '../../../community/tips/MainTipsCard';
import GatheringSummaryCard from '../summaryCard/GatheringSummaryCard';
import CommunityRoutePopularBookCard from './CommunityRoutePopularBookCard';
import CommunityRoutePopularQuizCard from './CommunityRoutePopularQuizCard';
import CommunityRoutePopularSurveyCard from './CommunityRoutePopularSurveyCard';
import CommunityRoutePostCard from './CommunityRoutePostCard'
import { useLoaderData } from 'react-router-dom';
import { GatheringType } from '../../../community/gathering/GatheringType';
import { booksitoutServer } from '../../../functions/axios';
import { BsPeopleFill as CommunityIcon } from 'react-icons/bs'
import RouteTitle from '../../../common/RouteTitle';

export async function loader({ params }) {
	return booksitoutServer
		.get(`/v4/forum/gathering/all`)
		.then((res) => res.data.content)
		.catch((e) => {
			throw e
		})
}

const CommunityRoute = () => {
	const gatheringList = useLoaderData() as GatheringType[]
	document.title = '커뮤니티 | 책잇아웃'

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px', overflowX: 'hidden', overflowY: 'hidden' }}>
			<RouteTitle icon={<CommunityIcon />} title={'커뮤니티'} />

			<div className='row row-eq-height'>
				<div className='col-12 mb-4 col-md-4'>
					<CommunityRoutePopularBookCard />
				</div>

				<div className='col-12 mb-4 col-md-8'>
					<CommunityRoutePostCard />
				</div>

				{/* <div className='col-12 mb-4 col-md-6'>
					<ForumRoutePopularSurveyCard />
				</div>

				<div className='col-12 mb-4 col-md-6'>
					<ForumRoutePopularQuizCard />
				</div> */}

				<div className='col-12 mb-4'>
					<GatheringSummaryCard gatheringList={gatheringList} />
				</div>

				<div className='col-12 mb-4'>
					<MainTipsCard />
				</div>

				<div className='mb-5' />
			</div>
		</div>
	)
}

export default CommunityRoute