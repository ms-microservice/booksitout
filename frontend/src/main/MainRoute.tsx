import React from 'react'
import { Card, Alert } from 'react-bootstrap'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import PostPopular from '../community/post/PostPopular';
import MainTipsCard from '../community/tips/MainTipsCard';
import { getLastBook } from '../functions/book'
import { getAlertMessage } from '../functions/alert'
import uiSettings from '../settings/ui'
import './mainReadChart.css'
import './mainLoginPrompt.css'
import placeholderData from './placeholderData';
import MainNoLoginPrompt from './MainNoLoginPrompt'
import MainLastReadBookCard from './MainLastReadBookCard';
import MainReadingTimeCard from './MainReadingTimeCard';
import MainSummaryStatisticsCard from './MainSummaryStatisticsCard';
import MainGoalCard from './MainGoalCard';
import MainBoarding from '../info/MainBoarding';
import GatheringSummaryCard from '../community/summaryCard/GatheringSummaryCard';
import MainLastReadBookCardLoading from './MainLastReadBookCardLoading';
import MainLibraryMembershipCard from './MainLibraryMembershipCard';
import { GoalType } from '../goal/GoalType'
import { StatisticsType } from '../types/StatisticsType';
import { BookType } from '../community/post/PostType';
import { booksitoutServer } from '../functions/axios';
import parse from 'html-react-parser'

const MainRoute = () => {
	const isLogin = useSelector((state: RootState) => state.user.isLogin)
	
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [goalLoading, setGoalLoading] = React.useState(true)
	const [lastBookLoading, setLastBookLoading] = React.useState(true)

	const [lastBook, setLastBook] = React.useState<BookType | null | undefined>(null)
	const [readTime, setReadTime] = React.useState<number[] | null | undefined>(null)
	const [goal, setGoal] = React.useState<GoalType | null | undefined>(null)
	const [statistics, setStatistics] = React.useState<StatisticsType | null | undefined>(null)

	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, uiSettings.initalFetchTime)

		if (!isLogin) {
			setReadTime(placeholderData.readTime)
			setStatistics(null)
			setInitialFetch(false)
			return
		}

		Promise.all([
			getLastBook()
				.then((res) => (res.status === 204 ? setLastBook(null) : setLastBook(res.data)))
				.catch(() => setLastBook(undefined))
				.finally(() => setLastBookLoading(false)),

			booksitoutServer
				.get(`v1/statistics/read-time/${7}`)
				.then((res) => setReadTime(res.data))
				.catch(() => setReadTime(undefined)),

			booksitoutServer
				.get(`v1/goal/${new Date().getFullYear()}`)
				.then((res) => (res.status === 204 ? setGoal(null) : setGoal(res.data)))
				.catch(() => setGoal(undefined))
				.finally(() => setGoalLoading(false)),

			booksitoutServer
				.get(`/v3/statistics/year/${new Date().getFullYear()}`)
				.then((res) => setStatistics(res.data || null))
				.catch(() => setStatistics(undefined)),
		]).finally(() => {
			setInitialFetch(false)
		})
	}, [isLogin])

	if (initialFetch) return <></>

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px', overflowX: 'hidden' }}>
			<div className='row mb-5 p-0'>
				<div className='container'>
					<Alert variant='success'>
						{isLogin
							? getAlertMessage()
							: parse(
									'책잇아웃 : 책을 <b>기록</b>하고, 원하는 책을 <b>도서관</b> / <b>중고책</b> / <b>구독</b> 등 한 번에 <b>검색</b> / <b>알림</b>. 책 관련 <b>커뮤니티</b>까지.'
							  )}
					</Alert>
				</div>

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
										{isLogin && !lastBookLoading ? <MainLastReadBookCard lastBook={lastBook} /> : <MainLastReadBookCardLoading />}
									</div>

									<div className='col-12 col-md-6 col-xl-4 mt-2 mb-2'>
										<MainReadingTimeCard readTime={readTime} />
									</div>

									<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
										<MainSummaryStatisticsCard statistics={statistics} loading={statistics == null || statistics === undefined} />
									</div>

									<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
										<MainGoalCard goal={goal} loading={!isLogin || goalLoading} />
									</div>

									{isLogin && (
										<div className={`col-12 col-md-6 col-xl-4 mt-2 mb-2 ${!isLogin && 'md-hide'}`}>
											<MainLibraryMembershipCard />
										</div>
									)}
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
									<GatheringSummaryCard title='지금 모집중인 독서모임' col='col-12' />
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