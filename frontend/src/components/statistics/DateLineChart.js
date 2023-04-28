import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

const DateLineChart = ({ startDate, endDate = Date.now(), data, duration = 14, highlightGreatest = false }) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

	return (
		<Line
			className='w-100 mt-0 mt-sm-auto ms-2 ms-md-0 pe-0 pe-md-2'
			style={{ margin: 'auto 0' }}
			options={{
				plugins: {
					legend: { display: false },
				},
				scales: { y: { min: 0, suggestedMax: 60 } },
				interaction: {
					mode: 'nearest',
					axis: 'x',
					intersect: false,
				}
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
						backgroundColor: '#1cb15a',
						borderColor: '#1cb15a',
						data: data,
					},
				],
			}}
		/>
	)
}

export default DateLineChart
