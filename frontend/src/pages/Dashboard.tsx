import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { fetchMetrics, Metric } from '../services/apiServices';

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
                console.error('Failed to fetch metrics:', err);
                setError('Failed to load metrics. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, []);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array(4).fill(null).map((_, index) => (
                        <Card key={index} loading={true} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <Card key={index} title={metric.title} value={metric.value} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
