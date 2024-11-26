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
import useTheme from '../hooks/useTheme';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const ChartCard: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [120, 190, 300, 500, 200, 300],
                backgroundColor: isDarkMode ? '#4EE2B5' : '#A178F1',
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
        <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-semibold text-dark dark:text-light pb-4">Sales Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartCard;
