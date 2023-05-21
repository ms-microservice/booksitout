import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Card, Alert } from 'react-bootstrap'

import Loading from '../common/Loading'
import PostPopular from '../community/post/PostPopular';
import MainTipsCard from '../community/tips/MainTipsCard';

import { getLastBook } from '../../functions/book'
import { getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'
import { getAlertMessage, getIsAlertShowing, updateAlertCloseTime } from '../../functions/alert'
import uiSettings from '../../settings/ui'
import '../../resources/css/mainReadChart.css'
import '../../resources/css/mainLoginPrompt.css'
import placeholderData from './placeholderData';
import MainNoLoginPrompt from './MainNoLoginPrompt'
import MainLastReadBookCard from './MainLastReadBookCard';
import MainReadingTimeCard from './MainReadingTimeCard';
import MainSummaryStatisticsCard from './MainSummaryStatisticsCard';
import MainGoalCard from './MainGoalCard';
import MainBoarding from '../info/MainBoarding';
import { RootState } from '../../redux/store';
import { GoalType } from '../../types/GoalType'
import { StatisticsType } from '../../types/StatisticsType';
import { BookType } from '../../types/PostType';

const MainRoute = () => {
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

	const [loading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(getIsAlertShowing())

	const [lastBook, setLastBook] = useState<BookType | null>(null)
	const [readTime, setReadTime] = useState<number[] | null>()
	const [goal, setGoal] = useState<GoalType | null | undefined>(null)
	const [statistics, setStatistics] = useState<StatisticsType | null>(null)
	
	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, uiSettings.initalFetchTime)

		if (!isLogin) {
			setLastBook(placeholderData.lastBook)
			setReadTime(placeholderData.readTime)
			setGoal(placeholderData.goal)
			setStatistics(placeholderData.statistics)

			setInitialFetch(false)
			setIsLoading(false)
			return
		}

		Promise.all([
			getLastBook().then((book) => setLastBook(book)),
			getReadTime(7).then((readTime) => setReadTime(readTime)),
			getGoal(new Date().getFullYear()).then((res) => (res.status === 204 ? setGoal(undefined) : setGoal(res.data))),
			getStatisticsSummary(new Date().getFullYear()).then((stats) => setStatistics(stats || null)),
		]).finally(() => {
			console.log(goal)
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [isLogin])

	const closeAlert = () => {
		setShowAlert(false)
		updateAlertCloseTime()
	}

	if (initialFetch) return <></>
	if (loading) return <Loading />

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<div className='row mb-5 p-0'>
				{showAlert && (
					<div className='container'>
						<Alert variant='success' dismissible onClose={() => closeAlert()}>
							{isLogin ? getAlertMessage() : '독서와 친해지고 싶은 모든 이들을 위한, 책잇아웃!'}
						</Alert>
					</div>
				)}

				<div>
					<div className={`${isLogin ? 'd-none' : 'd-block d-md-none'} mb-4`}>
						<MainBoarding />
					</div>

					<div className={`${isLogin ? 'd-block' : 'd-none'} d-md-block`}>
						{!isLogin && <MainNoLoginPrompt />}

						<Card style={{ opacity: isLogin ? 1.0 : 0.3, pointerEvents: isLogin ? 'auto' : 'none' }} className='mb-4'>
							<Card.Body>
								<div className='row row-eq-height'>
									<div className='col-12 col-md-6 col-xl-4 mt-2 mb-2'>
										<MainLastReadBookCard lastBook={lastBook} />
									</div>

									<div className='col-12 col-md-6 col-xl-4 mt-2 mb-2'>
										<MainReadingTimeCard readTime={readTime} />
									</div>

									<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
										<MainSummaryStatisticsCard statistics={statistics} />
									</div>

									<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
										<MainGoalCard goal={goal} />
									</div>
								</div>
							</Card.Body>
						</Card>
					</div>

					<Card className='mb-4'>
						<Card.Body>
							<div className='row row-eq-height'>
								<div className='col-12 col-xl-6 mt-2 mb-2'>
									<MainTipsCard />
								</div>

								<div className='col-12 col-xl-6 mt-2 mb-2'>
									<PostPopular />
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default MainRoute