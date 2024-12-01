import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="w-full h-screen flex flex-col pb-52 lg:pb-36">                     
            <div className="flex-1 p-6 space-y-4 overflow-y-scroll scroll-smooth">
                  <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
                <p>
                    Sorry, the page you are looking for does not exist. Go back to the{' '}
                    <Link to="/" className="text-blue-500">Dashboard</Link>.
                </p>
            </div>
        </div>            
    );
};

export default NotFound;
