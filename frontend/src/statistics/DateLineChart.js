import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
} from 'chart.js';

const DateLineChart = ({ startDate, endDate = Date.now(), data }) => {
    ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement);

    return (
        <Chart
            type='line'
            data={{
                labels: [
                    ...Array.from(
                        {
                            length: 14,
                        },
                        (_, i) => {
                            let day = new Date(startDate).setDate(
                                new Date(startDate).getDate() + i
                            );
                            return new Date(day).getDate() + '일';
                        }
                    ),
                ],

                datasets: [
                    {
                        label: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: data,
                    },
                ],
            }}
        />
    );
};

export default DateLineChart;
