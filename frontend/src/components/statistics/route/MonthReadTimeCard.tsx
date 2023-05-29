import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../../../common/CardTitle'
import { BsGraphUp as GraphIcon } from 'react-icons/bs'
import DateLineChart from '../DateLineChart'


const MonthReadTimeCard = ({ readTimeList }) => {
	return (
		<Card className='h-100' style={{minHeight: '400px'}}>
			<Card.Body className='h-100'>
				<CardTitle icon={<GraphIcon />} title={'최근 30일 독서시간'} />

				<div className='row h-100 w-100 pt-2 pb-2' id='readTimeChart'>
					<DateLineChart startDate={new Date().setDate(new Date().getDate() - 30)} data={readTimeList} duration={30} />
				</div>
			</Card.Body>
		</Card>
	)
}

export default MonthReadTimeCard