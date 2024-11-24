import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const ChartCard: React.FC = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [120, 190, 300, 500, 200, 300],
                backgroundColor: '#4EE2B5',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-white">Sales Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartCard;
