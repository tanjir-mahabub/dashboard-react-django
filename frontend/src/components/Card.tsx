import React from 'react';
import useTheme from '../hooks/useTheme';
import LoadingCard from './LoadingCard';

interface CardProps {
    title?: string;
    value?: string;
    icon?: React.ReactNode;
    loading?: boolean;
    loadingType?: 'pulse' | 'spinner'; // Add loading type for flexibility
}

const Card: React.FC<CardProps> = ({ title, value, icon, loading = false, loadingType = 'pulse' }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    if (loading) {        
        return <LoadingCard title={title || 'Loading...'} loadingType={loadingType} />;
    }

    return (
        <div className={`small-card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            {icon && <div>{icon}</div>}
        </div>
    );
};

export default Card;
