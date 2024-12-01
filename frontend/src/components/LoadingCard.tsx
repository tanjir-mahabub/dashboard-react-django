import React from 'react';
import useTheme from '../hooks/useTheme';

interface LoadingCardProps {
    title?: string;
    loadingType?: 'spinner' | 'pulse'; 
    cardStyles?: string;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ title = 'Loading...', loadingType = 'spinner', cardStyles = "" }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'} ${cardStyles}`}>
            <h2 className="text-sm sm:text-lg font-bold text-dark dark:text-light pb-4">{title}</h2>

            {loadingType === 'pulse' ? (
                <div className="animate-pulse flex-1 flex w-full justify-between items-center">
                    <div className='flex-1'>
                        <div
                            className={`h-4 w-3/4 rounded mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                        ></div>
                        <div
                            className={`h-8 w-1/2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                        ></div>
                    </div>
                    <div
                        className={`h-10 w-10 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                    ></div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <svg
                        className={`animate-spin h-6 w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default LoadingCard;
