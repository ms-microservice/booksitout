import MainTipsCard from '../tips/MainTipsCard';
import ForumRouteGatheringCard from './ForumRouteGatheringCard';
import CommunityRoutePopularBookCard from './ForumRoutePopularBookCard';
import ForumRoutePopularQuizCard from './ForumRoutePopularQuizCard';
import ForumRoutePopularSurveyCard from './ForumRoutePopularSurveyCard';
import CommunityRoutePostCard from './ForumRoutePostCard'

const CommunityRoute = () => {
	return (
		<div className='container-xl'>
			<div className='row'>
				<div className='cl-12 col-md-8'>
					<CommunityRoutePostCard />
				</div>

				<div className='col-12 col-md-4'>
					<CommunityRoutePopularBookCard />
				</div>

				{/* <div className='col-12 col-md-6'>
					<ForumRoutePopularSurveyCard />
				</div>

				<div className='col-12 col-md-6'>
					<ForumRoutePopularQuizCard />
				</div>

				<div className='col-12'>
					<ForumRouteGatheringCard />
				</div> */}

				<div className='col-12'>
					<MainTipsCard />
				</div>

				<div className='mb-5' />
			</div>
		</div>
	)
}

export default CommunityRoute