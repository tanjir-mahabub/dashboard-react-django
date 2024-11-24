import React from 'react';
import useTheme from '../hooks/useTheme';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-light text-dark dark:bg-dark dark:text-light p-4 flex justify-between items-center">
            <header>
                <h1 className="text-3xl font-bold text-dark dark:text-white">JOB-24FEBFF24</h1>
                <p className="text-dark dark:text-gray-400">Technical Assessment - Dashboard Development</p>
            </header>
            <div className="flex items-center space-x-4">
                <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full">
                    <span className="text-sm">User</span>
                </div>
                <button
                    onClick={toggleTheme}
                    className="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>
        </header>
    );
};

export default Header;
