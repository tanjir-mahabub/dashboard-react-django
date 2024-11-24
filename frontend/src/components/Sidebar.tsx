import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/outline';

const Sidebar: React.FC = () => {
    const navItems = [
        { to: '/', icon: <HomeIcon className="h-6 w-6" />, label: 'Dashboard' },
        { to: '/profile', icon: <UserIcon className="h-6 w-6" />, label: 'Profile' },
        { to: '/settings', icon: <CogIcon className="h-6 w-6" />, label: 'Settings' },
    ];

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Sidebar</h2>
            <ul className="space-y-4">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center space-x-4 p-2 rounded-md hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
