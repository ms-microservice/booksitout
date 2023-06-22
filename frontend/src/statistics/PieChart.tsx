import React from 'react'
import { Chart as ChartJS, ArcElement, ChartArea, ChartData } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import styled from 'styled-components';

interface PieChartProps {
    labels: string[];
    data: number[];
    background: string[][];
    size: number;
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea, colorStart, colorMid, colorEnd) {
	const gradient = ctx.createLinearGradient(0, 0, area.width, 0)

	if (colorEnd == null) {
		gradient.addColorStop(0, colorStart)
		gradient.addColorStop(0.5, colorStart)
		gradient.addColorStop(0.5, colorMid)
		gradient.addColorStop(1, colorMid)
	} else {
		gradient.addColorStop(0, colorStart)
		gradient.addColorStop(0.33, colorStart)
		gradient.addColorStop(0.33, colorMid)
		gradient.addColorStop(0.66, colorMid)
		gradient.addColorStop(0.66, colorEnd)
		gradient.addColorStop(1, colorEnd)
	}


	return gradient
}

const PieChart: React.FC<PieChartProps> = ({ labels, data, background, size = 200 }) => {
    ChartJS.register(ArcElement)
	const chartRef = React.useRef<ChartJS<'pie'>>(null)

	const [chartData, setChartData] = React.useState<ChartData<'pie'>>({
		labels: labels,
		datasets: [{ data: data }],
	})

	const chartOptions = {
		responsive: true,
		plugins: { legend: { display: false } },
	}

	React.useEffect(() => {
		const chart = chartRef.current
		if (!chart) return

		setChartData({
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: background.map(c =>
						createGradient(chart.ctx, chart.chartArea, c[0], c[1] ?? c[0], c[2] ?? null),
					),
				},
			],
		})
	}, [data])

	return (
		<div className="row h-100" style={{ width: size }}>
			<Pie ref={chartRef} data={chartData} options={chartOptions} />
		</div>
	)
}

export default PieChart