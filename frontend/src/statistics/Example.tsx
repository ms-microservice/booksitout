// import React, { useRef, useEffect, useState } from 'react';
// import type { ChartData, ChartArea } from 'chart.js';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
// import { Chart } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple']
// export const data = {
// 	labels,
// 	datasets: [
// 		{
// 			label: 'Dataset 1',
// 			data: [100, 20, 40, 10, 50, 60, 10],
// 		},
// 		{
// 			label: 'Dataset 2',
// 			data: [100, 20, 40, 10, 50, 60, 10],
// 		},
// 	],
// }

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
// 	// const colorStart = faker.random.arrayElement(colors)
// 	// const colorMid = faker.random.arrayElement(colors.filter(color => color !== colorStart))
// 	// const colorEnd = faker.random.arrayElement(colors.filter(color => color !== colorStart && color !== colorMid))

// 	const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)

// 	gradient.addColorStop(0, 'red')
// 	gradient.addColorStop(0.5, 'orange')
// 	gradient.addColorStop(1, 'blue')

// 	return gradient
// }

// export default function Example() {
//     const chartRef = useRef<ChartJS>(null)
//     const [chartData, setChartData] = useState<ChartData<'bar'>>({
// 		datasets: [],
// 	})

//     useEffect(() => {
// 		const chart = chartRef.current

// 		if (!chart) {
// 			return
// 		}

// 		const chartData = {
// 			...data,
// 			datasets: data.datasets.map(dataset => ({
// 				...dataset,
// 				borderColor: createGradient(chart.ctx, chart.chartArea),
// 			})),
// 		}

// 		setChartData(chartData)
// 	}, [])

//     return <Chart ref={chartRef} type="line" data={chartData} />
// }

export default <></>