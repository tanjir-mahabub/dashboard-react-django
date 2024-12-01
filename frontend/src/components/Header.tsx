import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth(); 

    const handleLogout = async () => {
        try {
            await logout(); 
            navigate('/login'); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };    

    return (
        <header className="bg-light text-dark dark:bg-dark dark:text-light p-4 flex justify-between items-center h-[10vh] border-b">
            <div>
                <h1 className="text-3xl font-bold text-dark dark:text-white">JOB-24FEBFF24</h1>
                <p className="text-dark dark:text-gray-400">Technical Assessment - Dashboard Development</p>
            </div>
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">                        
                        <div className="bg-secondary dark:bg-gray-700 p-2 h-[50px] min-w-[50px] flex place-items-center shadow rounded-full">
                            <span className="text-sm capitalize">
                                {user?.username || 'User'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 shadow rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-gray-300 dark:bg-gray-700 text-sm px-4 py-2 shadow rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                        Login
                    </button>
                )}
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
