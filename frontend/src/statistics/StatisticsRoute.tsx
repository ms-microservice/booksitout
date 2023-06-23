import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import RouteTitle from '../common/RouteTitle'
import Loading from '../common/Loading'
import Boarding from '../info/Boarding'
import { getCategoryStatistics, getLangaugeStatistics, getReadTime } from '../functions/statistics'
import { BsFileEarmarkBarGraphFill as StatisticsIcon } from 'react-icons/bs'
import MonthReadTimeCard from './route/MonthReadTimeCard'
import SummaryTableAllCard from './route/SummaryTableAllCard'
import LanguageSummaryCard from './route/LanguageSummaryCard'
import CategoryTableCard from './route/CategoryTableCard'
import styled from 'styled-components';
import './statistics.css'
import StatisticsBookSummaryCard from './StatisticsBookSummaryCard'
import RouteContainer from '../common/RouteContainer'

const StatisticsRoute = () => {
	document.title = '통계 | 책잇아웃'

	const isLogin = useSelector((state: RootState) => state.user.isLogin)
	const [isLoading, setIsLoading] = React.useState(true)
	const [readTimeList, setReadTimeList] = React.useState(null)
	const [languageData, setLanguageData] = React.useState(null)
	const [categoryData, setCategoryData] = React.useState(null)

	React.useEffect(() => {
		Promise.all([
			getReadTime(30).then(readTime => setReadTimeList(readTime)),
			getLangaugeStatistics().then(languageStats => setLanguageData(languageStats)),
			getCategoryStatistics().then(categoryStats => setCategoryData(categoryStats)),
		]).finally(() => setIsLoading(false))
	}, [])

	return (
		<RouteContainer>
			<RouteTitle icon={<StatisticsIcon />} title={'독서통계'} />

			{!isLogin ? (
				<Boarding
					title="내 독서활동에 대한 통계를 보시려면 로그인 해 주세요"
					subtitle="독서시간 그래프, 평균 독서시간, 언어별, 장르별 독서 현황을 볼 수 있어요"
				/>
			) : isLoading ? (
				<Loading mt='150px'/>
			) : (
				<StatisticsContainer>
					<StatisticsSummaryContainer>
						<div className="row">
							<MonthReadTimeCardContainer>
								<MonthReadTimeCard readTimeList={readTimeList} />
							</MonthReadTimeCardContainer>

							<StatisticsCardContainer>
								<SummaryTableAllCard />
							</StatisticsCardContainer>

							<StatisticsCardContainer>
								<LanguageSummaryCard languageData={languageData} />
							</StatisticsCardContainer>

							<StatisticsCardContainer>
								<CategoryTableCard categoryData={categoryData} />
							</StatisticsCardContainer>
						</div>
					</StatisticsSummaryContainer>

					<BookSummaryContainer>
						<StatisticsBookSummaryCard />
					</BookSummaryContainer>
				</StatisticsContainer>
			)}
		</RouteContainer>
	)
}

const StatisticsContainer = styled.div.attrs({
	className: 'row row-eq-height',
})``

const StatisticsSummaryContainer = styled.div.attrs({
	className: 'col-12 col-xl-8',
})``

const BookSummaryContainer = styled.div.attrs({
	className: 'col-12 col-xl-4 mb-4',
})``

const StatisticsCardContainer = styled.div.attrs({
	className: 'col-12 col-md-6 mb-4',
})`
	min-height: 450px;
`

const MonthReadTimeCardContainer = styled.div.attrs({
  className:  'col-12 col-md-6 mb-4'
})`
	min-height: 450px;

	@media screen and (min-width: 768px) {}
	min-height: 0px;
`;

export default StatisticsRoute