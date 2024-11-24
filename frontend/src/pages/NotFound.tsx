import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
            <p>
                Sorry, the page you are looking for does not exist. Go back to the{' '}
                <Link to="/" className="text-blue-500">Dashboard</Link>.
            </p>
        </div>
    );
};

export default NotFound;
