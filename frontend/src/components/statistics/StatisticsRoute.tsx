import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import RouteTitle from '../../common/RouteTitle'
import Loading from '../common/Loading'
import Boarding from '../../info/Boarding'

import { getCategoryStatistics, getLangaugeStatistics, getReadTime } from '../../functions/statistics'
import { BsFileEarmarkBarGraphFill as StatisticsIcon } from 'react-icons/bs'

import MonthReadTimeCard from './route/MonthReadTimeCard'
import SummaryTableAllCard from './route/SummaryTableAllCard'
import LanguageSummaryCard from './route/LanguageSummaryCard'
import CategoryTableCard from './route/CategoryTableCard'

import '../../resources/css/statistics.css'

const StatisticsRoute = () => {
	document.title = '통계 | 책잇아웃'

	const isLogin = useSelector((state: RootState) => state.user.isLogin)
	const [initialFetch, setInitialFetch] = React.useState(true)
	const [isLoading, setIsLoading] = React.useState(true)

	const [readTimeList, setReadTimeList] = React.useState(null)
	const [languageData, setLanguageData] = React.useState(null)
	const [categoryData, setCategoryData] = React.useState(null)

	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 3000)

		Promise.all([
			getReadTime(30).then((readTime) => setReadTimeList(readTime)),
			getLangaugeStatistics().then((languageStats) => setLanguageData(languageStats)),
			getCategoryStatistics().then((categoryStats) => setCategoryData(categoryStats)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [])

	if (!isLogin)
		return (
			<Boarding
				title='내 독서활동에 대한 통계를 보시려면 로그인 해 주세요'
				subtitle='독서시간 그래프, 평균 독서시간, 언어별, 장르별 독서 현황을 볼 수 있어요'
			/>
		)
	if (initialFetch) return <></>
	if (isLoading) return <Loading/>

	return (
		<div className='container-fluid' style={{ maxWidth: '1920px', overflowX: 'hidden', overflowY: 'hidden' }}>
			<RouteTitle icon={<StatisticsIcon />} title={'독서통계'} />

			<div className='row row-eq-height'>
				<div className='col-12 col-md-6 col-xl-4 mb-4 '>
					<MonthReadTimeCard readTimeList={readTimeList} />
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4 '>
					<SummaryTableAllCard />
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4' style={{ minHeight: '450px' }}>
					<LanguageSummaryCard languageData={languageData} />
				</div>

				<div className='col-12 col-md-6 col-xl-4 mb-4' style={{ minHeight: '450px' }}>
					<CategoryTableCard categoryData={categoryData} />
				</div>
			</div>
		</div>
	)
}

export default StatisticsRoute