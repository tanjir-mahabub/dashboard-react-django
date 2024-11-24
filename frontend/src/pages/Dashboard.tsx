import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import ChartCard from '../components/ChartCard';
import FormCard from '../components/FormCard';
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
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : loading ? (
                    Array(4)
                        .fill(null)
                        .map((_, index) => <Card key={index} loading />)
                ) : (
                    metrics.map((metric, index) => (
                        <Card key={index} title={metric.title} value={metric.value} />
                    ))
                )}
            </div>

            {/* Main Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Large Chart Area */}
                <div className="col-span-4 lg:col-span-2">
                    <ChartCard />
                </div>

                {/* Form Area */}
                <div className="col-span-4 lg:col-span-2">
                    <FormCard />
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 col-span-4 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">Some Examples</h2>
                    <p className="text-gray-400">
                        Real-time data, shopping cart, data from BFF
                    </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">More Data from BFF</h2>
                    <p className="text-gray-400">As List of Items</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">Map for Current Location</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
