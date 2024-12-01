import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, XIcon } from '@heroicons/react/outline';
import useTheme from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const Sidebar: React.FC = () => {
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth(); 
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { to: '/dashboard', icon: <HomeIcon className="h-5 sm:h-6 w-5 sm:w-6" />, label: 'Dashboard' },
        { to: '/profile', icon: <UserIcon className="h-5 sm:h-6 w-5 sm:w-6" />, label: 'Profile' },
        { to: '/settings', icon: <CogIcon className="h-5 sm:h-6 w-5 sm:w-6" />, label: 'Settings' },
    ];

    const isDarkMode = theme === 'dark';

    if (!isAuthenticated) return null; 

    return (
        <div
            className={`${isCollapsed ? 'w-12 sm:w-16 relative items-center' : 'absolute w-full items-start'} transition-full duration-300 sm:relative z-20 left-0 flex flex-col pt-4 px-1 max-w-[200px] min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
        >
            <ul className="space-y-4 w-full">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `${isCollapsed ? 'w-fit sm:w-[40px] justify-center' : 'w-full justify-start'} transition-width duration-300 flex items-center space-x-1 sm:space-x-2 p-2 rounded-md ${isActive
                                    ? isDarkMode
                                        ? 'bg-primary text-black'
                                        : 'bg-primary text-white'
                                    : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <span className="flex items-center justify-center">{item.icon}</span>
                            {!isCollapsed && <span className="transition-all duration-300 text-sm sm:text-base">{item.label}</span>}
                        </NavLink>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`${isCollapsed ? 'w-fit sm:w-[40px] justify-center' : 'w-full justify-start'} transition-width duration-300 flex items-center space-x-1 sm:space-x-2 p-2 rounded-md mb-6 focus:outline-none hover:text-light hover:bg-primary dark:hover:bg-gray-600`}
                    >
                        <span><XIcon className="h-5 sm:h-6 w-5 sm:w-6" /></span>
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
