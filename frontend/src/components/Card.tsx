import React from 'react';

interface CardProps {
    title?: string;
    value?: string;
    icon?: React.ReactNode;
    loading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, value, icon, loading = false }) => {
    return (
        <div
            className="bg-gray-800 text-white p-4 rounded-md shadow-md flex items-center"
            {...(loading && { role: 'status', 'aria-busy': true })}
        >
            {loading ? (
                <div className="animate-pulse flex-1">
                    <div className="bg-gray-700 h-4 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-700 h-8 w-1/2 rounded"></div>
                </div>
            ) : (
                <>
                    <div className="mr-4">{icon}</div>
                    <div>
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
