import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

const DateLineChartPlaceholder = ({ startDate, duration = 1 }) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

	// @ts-ignore
	const chartRef = React.useRef<Line | null>(null)

	return (
		<Line
			ref={chartRef}
			className='w-100 mt-0 mt-sm-auto ms-2 ms-md-0 pe-0 pe-md-2'
			style={{ margin: 'auto 0' }}
			options={{
				plugins: { legend: { display: false } },
				scales: { y: { min: 0, suggestedMax: 60 } },
				interaction: {
					mode: 'nearest',
					axis: 'x',
					intersect: false,
				},
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
						backgroundColor: '#aaaaaa',
						borderColor: '#aaaaaa',
						data: [30, 30, 30, 30, 30, 30, 30, 30],
					},
				],
			}}
		/>
	)
}

export default DateLineChartPlaceholder
