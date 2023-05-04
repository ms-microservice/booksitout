import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Card, Alert } from 'react-bootstrap'

import Loading from '../common/Loading'
import PostPopular from '../forum/post/PostPopular';
import PostMyBook from '../forum/post/PostMyBook';
import BooksitoutTip from '../forum/admin/BooksitoutTip';

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

const Main = () => {
	const isLogin = useSelector((state) => state.user.isLogin)

	const [loading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(getIsAlertShowing())

	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [goal, setGoal] = useState(null)
	const [statistics, setStatistics] = useState(null)
	
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
			getGoal(new Date().getFullYear()).then((res) => setGoal(res)),
			getStatisticsSummary(new Date().getFullYear()).then((stats) => setStatistics(stats)),
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
										<MainGoalCard statistics={statistics} goal={goal} />
									</div>
								</div>
							</Card.Body>
						</Card>
					</div>

					<Card className='mb-4'>
						<Card.Body>
							<div className='row row-eq-height'>
								<div className='col-12 col-xl-6 mt-2 mb-2'>
									<PostPopular />
								</div>

								<div
									className='col-12 col-xl-6 mt-2 mb-2'
									style={{ opacity: isLogin ? 1.0 : 0.5, pointerEvents: isLogin ? 'auto' : 'none' }}>
									<PostMyBook />
								</div>

								<div className='col-12 col-xl-6 mt-2 mb-2'>
									<BooksitoutTip />
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Main