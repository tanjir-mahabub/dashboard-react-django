import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import useTheme from '../hooks/useTheme';
import { fetchSalesData, ChartData } from '../services/apiServices';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const ChartCard: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSalesData = async () => {
            try {
                const data = await fetchSalesData();
                setChartData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching sales data:', err);
                setError('Failed to load sales data.');
            } finally {
                setLoading(false);
            }
        };

        loadSalesData();
    }, []);

    if (loading) return <LoadingCard title="Sales Chart" cardStyles="min-h-[320px]" />;
    if (error) return <ErrorCard title="Sales Chart" message={error} />;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    const data = {
        labels: chartData?.labels || [],
        datasets: [
            {
                type: 'bar' as const, // Explicitly specify the type for the bar chart
                label: 'Sales (Bar)',
                data: chartData?.datasets[0]?.data || [],
                backgroundColor: isDarkMode ? '#4EE2B5' : '#A178F1',
            },
            {
                type: 'line' as const, // Explicitly specify the type for the line chart
                label: 'Trend (Line)',
                data: chartData?.datasets[0]?.data.map((value) => value * 1.1) || [],
                borderColor: isDarkMode ? '#FFD700' : '#FF4500',
                borderWidth: 2,
                tension: 0.3,
                fill: false,
            },
        ],
    };

    return (
        <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-base sm:text-lg font-bold text-dark dark:text-light pb-4">Sales Chart</h2>
            <Chart type="bar" data={data} options={options} />
        </div>
    );
};

export default ChartCard;
