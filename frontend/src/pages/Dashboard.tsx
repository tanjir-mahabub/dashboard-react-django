import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import ChartCard from '../components/ChartCard';
import FormCard from '../components/FormCard';
import { fetchMetrics, Metric } from '../services/apiServices';
import ShoppingCart from '../components/ShoppingCart';
import RealTimeDataCard from '../components/RealTimeDataCard';
import ListCard from '../components/ListCard';
import MapCard from '../components/MapCard';
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
            <h1 className="text-2xl font-bold mb-4 text-dark dark:text-white">Dashboard</h1>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {error ? (
                    <ErrorCard message={error} />
                ) : loading ? (
                    Array(3)
                        .fill(null)
                        .map((_, index) => <Card key={index} loading={true} />)
                ) : (
                    metrics.map((metric, index) => (
                        <Card
                            key={index}
                            title={metric.title}
                            value={metric.value}
                            icon={metric.icon}
                        />
                    ))
                )}
            </div>


            {/* Main Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Chart Area */}
                <div className="col-span-4 lg:col-span-2">
                    <ChartCard />
                </div>

                {/* Map Area */}
                <div className="col-span-4 lg:col-span-2">
                    <MapCard />
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 col-span-4 gap-4">
                    <ShoppingCart />
                    <RealTimeDataCard />
                    <ListCard />
                    <FormCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
