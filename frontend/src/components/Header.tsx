import React from 'react';
import useTheme from '../hooks/useTheme';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <div className="bg-gray-700 p-2 rounded-full">
                    <span className="text-sm">User</span>
                </div>
                <button
                    onClick={toggleTheme}
                    className="bg-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>
        </header>
    );
};

export default Header;
