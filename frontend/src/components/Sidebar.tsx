import React from 'react';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/outline';

const Sidebar: React.FC = () => {
    const navItems = [
        { icon: <HomeIcon className="h-6 w-6" />, label: 'Home' },
        { icon: <UserIcon className="h-6 w-6" />, label: 'Profile' },
        { icon: <CogIcon className="h-6 w-6" />, label: 'Settings' },
    ];

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <ul className="space-y-4">
                {navItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
