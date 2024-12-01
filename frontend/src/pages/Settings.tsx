import React from 'react';

const Settings: React.FC = () => {
    return (
         <div className="w-full h-screen flex flex-col pb-52 lg:pb-36">         
            <div className="shadow px-3 sm:px-6 py-4 relative z-10">
                <h1 className="text-lg sm:text-2xl font-bold text-dark dark:text-white">Settings</h1>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-scroll scroll-smooth">
                  <p>Manage your application settings here.</p>
            </div>
        </div>        
    );
};

export default Settings;
