import React from 'react';
import Card from './components/Card';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-light min-h-screen p-6">
      <h1 className="text-primary text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Credit" value="$1500" />
        <Card title="Checkout Amount" value="$200" />
        <Card title="Gift Available" value="Yes" icon={<span>🎁</span>} />
      </div>
    </div>
  );
};

export default Dashboard;
