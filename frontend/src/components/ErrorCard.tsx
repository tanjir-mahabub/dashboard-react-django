import React from 'react';
import useTheme from '../hooks/useTheme';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

const ErrorCard: React.FC<{ title?: string; message: string }> = ({ title = 'Error', message }) => {

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
       <div className={`card-base ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-lg font-semibold text-dark dark:text-light">{title}</h2>
           
            <div className='w-full h-full flex flex-col justify-center items-center gap-3'>
                <ExclamationCircleIcon className="h-6 w-6 text-error" />
                <p className="text-error font-bold">{message}</p>
            </div>
        </div>
    );
};

export default ErrorCard;
