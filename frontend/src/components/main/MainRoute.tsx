import React from 'react'
import { useSelector } from 'react-redux';
import { Card, Alert } from 'react-bootstrap'

import Loading from '../common/Loading'
import PostPopular from '../community/post/PostPopular';
import MainTipsCard from '../../community/tips/MainTipsCard';

import { getLastBook } from '../../functions/book'
import { getReadTime, getStatisticsSummary } from '../../functions/statistics'
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
import { GoalType } from '../../goal/GoalType'
import { StatisticsType } from '../../types/StatisticsType';
import { BookType } from '../../types/PostType';
import { booksitoutServer } from '../../functions/axios';
import GatheringSummaryCard from '../community/summaryCard/GatheringSummaryCard';
import MainBookNotLoginCard from './MainBookNotLoginCard';
import { GatheringType } from '../../community/gathering/GatheringType';

const MainRoute = () => {
	const isLogin = useSelector((state: RootState) => state.user.isLogin)

	const [loading, setIsLoading] = React.useState(true)
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [showAlert, setShowAlert] = React.useState(getIsAlertShowing())

	const [lastBook, setLastBook] = React.useState<BookType | null | undefined>(null)
	const [readTime, setReadTime] = React.useState<number[] | null>(null)
	const [goal, setGoal] = React.useState<GoalType | null | undefined>(null)
	const [statistics, setStatistics] = React.useState<StatisticsType | null | undefined>(null)

	const [gathering, setGathering] = React.useState<GatheringType[] | null | undefined>(null)

	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, uiSettings.initalFetchTime)

		booksitoutServer
			.get('v4/forum/gathering/all?size=4')
			.then((res) => setGathering(res.data.content))
			.catch(() => setGathering(undefined))

		if (!isLogin) {
			setReadTime(placeholderData.readTime)
			setStatistics(undefined)

			setInitialFetch(false)
			setIsLoading(false)
			return
		}

		Promise.all([
			getLastBook()
				.then((res) => (res.status === 204 ? setLastBook(null) : setLastBook(res.data)))
				.catch(() => setLastBook(undefined)),

			getReadTime(7).then((readTime) => setReadTime(readTime)),

			booksitoutServer
				.get(`/v1/goal/${new Date().getFullYear()}`)
				.then((res) => (res.status === 204 ? setGoal(null) : setGoal(res.data)))
				.catch(() => setGoal(undefined)),

			getStatisticsSummary(new Date().getFullYear()).then((stats) => setStatistics(stats || null)),
		]).finally(() => {
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
							{isLogin
								? getAlertMessage()
								: '책잇아웃 - 책을 기록하고, 원하는 책을 도서관/중고책/구독 등 한 번에 검색/알림. 책 관련 커뮤니티까지.'}
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
										{isLogin ? <MainLastReadBookCard lastBook={lastBook} /> : <MainBookNotLoginCard />}
									</div>

									<div className='col-12 col-md-6 col-xl-4 mt-2 mb-2'>
										<MainReadingTimeCard readTime={readTime} />
									</div>

									<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
										<MainSummaryStatisticsCard statistics={statistics} loading={statistics == null || statistics === undefined} />
									</div>

									<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
										<MainGoalCard goal={isLogin ? goal : null} />
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

								<div className='col-12 col-xl-6 mt-2 mb-2'>
									<GatheringSummaryCard gatheringList={gathering} title='지금 모집중인 독서모임' col='col-12' />
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