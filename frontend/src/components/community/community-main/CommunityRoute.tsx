import MainTipsCard from '../tips/MainTipsCard';
import CommunityRouteGatheringCard from './CommunityRouteGatheringCard';
import CommunityRoutePopularBookCard from './CommunityRoutePopularBookCard';
import CommunityRoutePopularQuizCard from './CommunityRoutePopularQuizCard';
import CommunityRoutePopularSurveyCard from './CommunityRoutePopularSurveyCard';
import CommunityRoutePostCard from './CommunityRoutePostCard'

const CommunityRoute = () => {
	return (
		<div className='container-xl'>
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
				</div>

				<div className='col-12 mb-4'>
					<ForumRouteGatheringCard />
				</div> */}

				<div className='col-12 mb-4'>
					<MainTipsCard />
				</div>

				<div className='mb-5' />
			</div>
		</div>
	)
}

export default CommunityRoute