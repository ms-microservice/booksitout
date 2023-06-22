import React from 'react'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'

interface PieChartProps {
    labels: string[];
    data: number[];
    background: string[][];
    size: number;
}

const PieChart: React.FC<PieChartProps> = ({ labels, data, background, size = 200 }) => {
    ChartJS.register(ArcElement)

	const chartRef = React.useRef<ChartJS<'pie'>>(null)
	const chartData = {
		labels: labels,
		datasets: [
			{
				data: data,
				backgroundColor: background.map(c => c[0]),
			},
		],
	}

	const chartOptions = {
		responsive: true,
		plugins: { legend: { display: false } },
	}

	return (
		<div className="row h-100" style={{ width: size }}>
			<Pie ref={chartRef} data={chartData} options={chartOptions} />
		</div>
	)
}

export default PieChart