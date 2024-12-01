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
        { to: '/dashboard', icon: <HomeIcon className="h-6 w-6" />, label: 'Dashboard' },
        { to: '/profile', icon: <UserIcon className="h-6 w-6" />, label: 'Profile' },
        { to: '/settings', icon: <CogIcon className="h-6 w-6" />, label: 'Settings' },
    ];

    const isDarkMode = theme === 'dark';

    if (!isAuthenticated) return null; 

    return (
        <div
            className={`sticky flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
        >
            <ul className="space-y-4">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `${isCollapsed ? 'w-[40px]' : 'w-full'} transition-width duration-300 flex items-center space-x-4 p-2 rounded-md ${isActive
                                    ? isDarkMode
                                        ? 'bg-primary text-black'
                                        : 'bg-primary text-white'
                                    : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <span className="flex items-center justify-center">{item.icon}</span>
                            {!isCollapsed && <span className="transition-all duration-300">{item.label}</span>}
                        </NavLink>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`${isCollapsed ? 'w-[40px]' : 'w-full'} transition-width duration-300 flex items-center justify-start space-x-4 p-2 rounded-md mb-6 focus:outline-none hover:text-light hover:bg-primary dark:hover:bg-gray-600`}
                    >
                        <XIcon className="h-6 w-6" /> {!isCollapsed && (
                            <span>Collapse</span>
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
