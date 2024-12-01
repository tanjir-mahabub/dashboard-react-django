import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, ArrowRightIcon } from '@heroicons/react/outline';
import useTheme from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useLoader } from '../hooks/useLoader';

const Sidebar: React.FC = () => {
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();
    const { showLoader, hideLoader } = useLoader(); // Access loader context
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { to: '/dashboard', icon: <HomeIcon className="h-5 sm:h-6 w-5 sm:w-6" />, label: 'Dashboard' },
        { to: '/profile', icon: <UserIcon className="h-5 sm:h-6 w-5 sm:w-6" />, label: 'Profile' },
        { to: '/settings', icon: <CogIcon className="h-5 sm:h-6 w-5 sm:w-6" />, label: 'Settings' },
    ];

    const isDarkMode = theme === 'dark';

    if (!isAuthenticated) return null;

    const handleNavigation = (path: string) => {
        showLoader();
        setTimeout(() => {
            navigate(path);
            hideLoader();
        }, 500);
    };

    return (
        <div
            role="navigation"
            className={`${isCollapsed ? 'w-12 sm:w-16 relative items-center' : 'absolute w-full items-start'} transition-full duration-300 sm:relative z-20 left-0 flex flex-col pt-4 px-1 max-w-[200px] min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
        >
            <ul className="space-y-4 w-full">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleNavigation(item.to)}
                            className={`${isCollapsed ? 'w-fit sm:w-[40px] justify-center' : 'w-full justify-start'} transition-width duration-300 flex items-center space-x-1 sm:space-x-2 p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700`}
                        >
                            <span className="flex items-center justify-center">{item.icon}</span>
                            {!isCollapsed && <span className="transition-all duration-300 text-sm sm:text-base">{item.label}</span>}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`${isCollapsed ? 'w-fit sm:w-[40px] justify-center' : 'w-full justify-start'} group transition-width duration-300 flex items-center space-x-1 sm:space-x-2 p-2 rounded-md mb-6 focus:outline-none hover:text-light hover:bg-primary dark:hover:bg-gray-600`}
                    >
                        <span className='border rounded group-hover:border-light border-dark p-1'><ArrowRightIcon className="h-3 sm:h-4 w-3 sm:w-4" /></span>
                        {!isCollapsed && (
                            <span className='text-sm sm:text-base'>Collapse</span>
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
