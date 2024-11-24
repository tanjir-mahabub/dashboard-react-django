import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                {/* Profile Icon Placeholder */}
                <div className="bg-gray-700 p-2 rounded-full">
                    <span className="text-sm">User</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
