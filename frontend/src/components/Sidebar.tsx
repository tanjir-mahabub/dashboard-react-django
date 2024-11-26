import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline';
import useTheme from '../hooks/useTheme'; // Assuming you have a useTheme hook

const Sidebar: React.FC = () => {
    const { theme } = useTheme(); // Access the current theme
    const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse/expand

    const navItems = [
        { to: '/', icon: <HomeIcon className="h-6 w-6" />, label: 'Dashboard' },
        { to: '/profile', icon: <UserIcon className="h-6 w-6" />, label: 'Profile' },
        { to: '/settings', icon: <CogIcon className="h-6 w-6" />, label: 'Settings' },
    ];

    const isDarkMode = theme === 'dark';

    return (
        <div
            className={`flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen p-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'
                }`}
        >           

            {/* Navigation Links */}
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
                    {/* Collapse/Expand Button */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`${isCollapsed ? 'w-[40px]' : 'w-full'} transition-width duration-300 flex items-center justify-start space-x-4 p-2 rounded-md mb-6 focus:outline-none hover:text-light hover:bg-primary dark:hover:bg-gray-600`}
                    >
                        {isCollapsed ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#A78BFA" />


                                <line x1="12" y1="4" x2="12" y2="20" stroke="#A78BFA" />


                                <path d="M8 12h4m-2-2l2 2-2 2" stroke="#A78BFA" />
                            </svg>

                        ) : (
                            <>
                                <XIcon className="h-6 w-6" />
                                <span>Collapse</span>
                            </>
                        )}
                    </button>     
                </li>
            </ul>                  
        </div>
    );
};

export default Sidebar;
