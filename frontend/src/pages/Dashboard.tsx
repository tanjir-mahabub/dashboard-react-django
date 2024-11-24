import React from 'react';
import Card from '../components/Card';

const Dashboard: React.FC = () => {
    const metrics = [
        { title: 'Total Revenue', value: '$45,000' },
        { title: 'New Users', value: '320' },
        { title: 'Pending Orders', value: '45' },
        { title: 'Completed Orders', value: '276' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <Card key={index} title={metric.title} value={metric.value} />
            ))}
        </div>
    );
};

export default Dashboard;
