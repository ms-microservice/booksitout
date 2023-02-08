import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

const DateLineChart = ({ startDate, endDate = Date.now(), data, duration = 14 }) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

	return (
		<Line
			className='mt-0 mt-md-auto'
			style={{margin: 'auto 0'}}
			options={{
				plugins: { legend: { display: false } },
				scales: { y: { min: 0 } },
			}}
			data={{
				labels: [
					...Array.from({ length: duration }, (_, i) => {
						let day = new Date(startDate).setDate(new Date(startDate).getDate() + i + 1)
						return new Date(day).getDate() + '일'
					}),
				],

				datasets: [
					{
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: data,
					},
				],
			}}
		/>
	)
}

export default DateLineChart
