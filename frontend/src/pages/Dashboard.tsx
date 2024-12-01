import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import ChartCard from '../components/ChartCard';
import MapCard from '../components/MapCard';
import ShoppingCart from '../components/ShoppingCart';
import RealTimeDataCard from '../components/RealTimeDataCard';
import ListCard from '../components/ListCard';
import { fetchMetrics, Metric } from '../services/apiServices';
import ErrorCard from '../components/ErrorCard';

const Dashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const data = await fetchMetrics();
                setMetrics(data);
            } catch (err) {
                setError('Failed to load metrics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, []);

    return (
        <div className="relative z-10 w-full h-screen flex flex-col">
            {/* Header */}
            <div className="shadow px-3 sm:px-6 py-4 relative z-10">
                <h1 className="text-lg sm:text-2xl font-bold text-dark dark:text-white">Dashboard</h1>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-3 sm:p-6 space-y-4 overflow-y-scroll scroll-smooth pb-48 sm:pb-52 lg:pb-36">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {error ? (
                        <ErrorCard title="Metrics" message={error} />
                    ) : loading ? (
                        Array(4)
                            .fill(null)
                            .map((_, index) => <Card key={index} loading />)
                    ) : (
                        metrics.map((metric) => (
                            <Card key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} />
                        ))
                    )}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div>
                        <ChartCard />
                    </div>
                    <div>
                        <MapCard />
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <RealTimeDataCard />
                    <ShoppingCart />
                    <ListCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
