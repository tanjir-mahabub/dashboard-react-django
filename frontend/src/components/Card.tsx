import React from 'react';

interface CardProps {
    title?: string;
    value?: string;
    loading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, value, loading = false }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
            {loading ? (
                <div className="animate-pulse space-y-2">
                    <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
                    <div className="bg-gray-700 h-8 w-1/2 rounded"></div>
                </div>
            ) : (
                <>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-2xl font-bold">{value}</p>
                </>
            )}
        </div>
    );
};

export default Card;
