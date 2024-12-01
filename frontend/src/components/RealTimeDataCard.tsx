import React, { useState, useEffect } from 'react';
import { createRealTimeDataWebSocket, RealTimeData } from '../services/apiServices';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';
import useTheme from '../hooks/useTheme';

const RealTimeDashboard: React.FC = () => {
    const [data, setData] = useState<RealTimeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const ws = createRealTimeDataWebSocket(
            (newData) => {
                //console.log('Received data from WebSocket:', newData);
                setData(newData);
                setError(null);
                setLoading(false);
            },
            (err) => {
                console.error('WebSocket Error:', err);
                setError(err);
                setLoading(false);
            }
        );

        return () => {
            ws.close(); 
        };
    }, []);

    if (loading) return <LoadingCard title="Real-Time Data" cardStyles="min-h-[320px]" />;
    if (error) return <ErrorCard title="Real-Time Data" message={error} />;

    return (
        <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-base sm:text-lg font-bold mb-4">Real-Time System Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* CPU Metrics */}
                <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                    <h3 className="text-sm sm:text-base font-bold">CPU Usage</h3>
                    <p className="text-lg sm:text-2xl font-bold text-blue-500">{data?.cpuPercent || 0}%</p>
                </div>
                {/* Memory Metrics */}
                <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                    <h3 className="text-sm sm:text-base font-bold">Memory Usage</h3>
                    <p className="text-lg sm:text-2xl font-bold text-green-500">{data?.memoryPercent || 0}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {Math.round((data?.memoryUsed || 0) / (1024 ** 3))} GB / {Math.round((data?.memoryTotal || 0) / (1024 ** 3))} GB
                    </p>
                </div>
                {/* Disk Metrics */}
                <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                    <h3 className="text-sm sm:text-base font-bold">Disk Usage</h3>
                    <p className="text-lg sm:text-2xl font-bold text-orange-500">{data?.diskPercent || 0}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {Math.round((data?.diskUsed || 0) / (1024 ** 3))} GB / {Math.round((data?.diskTotal || 0) / (1024 ** 3))} GB
                    </p>
                </div>
                {/* Network Metrics */}
                <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                    <h3 className="text-sm sm:text-base font-bold">Network Traffic</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Sent: {Math.round((data?.bytesSent || 0) / (1024 ** 2))} MB
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Received: {Math.round((data?.bytesReceived || 0) / (1024 ** 2))} MB
                    </p>
                </div>
                {/* Process Count */}
                <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                    <h3 className="text-sm sm:text-base font-bold">Processes</h3>
                    <p className="text-lg sm:text-2xl font-bold text-purple-500">{data?.processCount || 0}</p>
                </div>
                {/* Optional Battery Metrics */}
                {data?.batteryPercent !== undefined ? (
                    <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                        <h3 className="text-sm sm:text-base font-bold">Battery</h3>
                        <p className="text-lg sm:text-2xl font-bold text-yellow-500">{data.batteryPercent}%</p>
                        <p className="text-sm">{data.batteryPlugged ? 'Plugged In' : 'Not Plugged In'}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow">
                        <h3 className="text-sm sm:text-base font-bold">Load Average</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            1m: {data?.loadAvg1m || 'N/A'}, 5m: {data?.loadAvg5m || 'N/A'}, 15m: {data?.loadAvg15m || 'N/A'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealTimeDashboard;
