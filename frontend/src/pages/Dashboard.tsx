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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-dark dark:text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-2">
                    <ChartCard />
                </div>
                <div className="col-span-4 lg:col-span-2">
                    <MapCard />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 col-span-4 gap-4">
                    <ShoppingCart />
                    <RealTimeDataCard />
                    <ListCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
