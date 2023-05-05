import { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

const DateLineChart = ({ startDate, endDate = Date.now(), data, duration = 14, highlightGreatest = false }) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

	// @ts-ignore
	const chartRef = useRef<Line | null>(null)

	const focusOnGreatestIndex = () => {
		if (data == null) return

		const greatestIndex = data.lastIndexOf(Math.max(...data))
		const chart = chartRef.current
		if (data[greatestIndex] !== 0) {
			chart?.tooltip?.setActiveElements([{ datasetIndex: 0, index: greatestIndex }], { x: 0, y: 0 })
		}
	}

	useEffect(() => {
		focusOnGreatestIndex()
	}, [])

	return (
		<Line
			ref={chartRef}
			onMouseOut={() => focusOnGreatestIndex()}
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
