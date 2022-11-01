import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const DateLineChart = ({ startDate, endDate = Date.now(), data }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        <Line
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
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
