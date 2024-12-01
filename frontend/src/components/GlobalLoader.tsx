import React from 'react';
import { useLoader } from '../hooks/useLoader';

const GlobalLoader: React.FC = () => {
    const { isLoading } = useLoader();

    if (!isLoading) {
        return null; 
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-75"></div>
        </div>
    );
};

export default GlobalLoader;
