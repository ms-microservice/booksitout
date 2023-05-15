import MainTipCard from '../tips/MainTipCard';
import ForumRouteGatheringCard from './ForumRouteGatheringCard';
import ForumRoutePopularBookCard from './ForumRoutePopularBookCard';
import ForumRoutePopularQuizCard from './ForumRoutePopularQuizCard';
import ForumRoutePopularSurveyCard from './ForumRoutePopularSurveyCard';
import ForumRoutePostCard from './ForumRoutePostCard'

const ForumMain = () => {
	return (
		<div className='container-xl'>
			<div className='row'>
				<div className='cl-12 col-md-8'>
					<ForumRoutePostCard />
				</div>

				<div className='col-12 col-md-4'>
					<ForumRoutePopularBookCard />
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
					<MainTipCard />
				</div>

				<div className='mb-5' />
			</div>
		</div>
	)
}

export default ForumMain