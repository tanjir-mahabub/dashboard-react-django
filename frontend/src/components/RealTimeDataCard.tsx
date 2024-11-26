import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline'; // Importing the icon
import useTheme from '../hooks/useTheme';
import ErrorCard from './ErrorCard';
import LoadingCard from './LoadingCard';

const RealTimeDataCard: React.FC = () => {
    const [data, setData] = useState<null | {
        cpuUsage: number;
        memoryUsage: number;
        activeUsers: number;
    }>(null);
    const [error, setError] = useState<string | null>(null);

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/realtime-data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Unable to load real-time data.');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <ErrorCard title="Real-Time Data" message={error} />;
    }

    if (!data) {
        return <LoadingCard title="Real-Time Data" />;
    }

    return (
       <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-semibold text-dark dark:text-light">Real-Time Data</h2>
            <ul className="space-y-2">
                <li><strong>CPU Usage:</strong> {data.cpuUsage}%</li>
                <li><strong>Memory Usage:</strong> {data.memoryUsage}%</li>
                <li><strong>Active Users:</strong> {data.activeUsers}</li>
            </ul>
        </div>
    );
};

export default RealTimeDataCard;
