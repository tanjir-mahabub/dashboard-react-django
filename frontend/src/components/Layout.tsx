import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex bg-light dark:bg-dark text-dark dark:text-light">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className={`h-[85vh] overflow-y-scroll`}>
                    {children}
                </main>
                <footer className="bg-gray-200 dark:bg-gray-700 text-center p-4 h-[5vh]">
                    © 2024 Your Company Name
                </footer>
            </div>
        </div>
    );
};

export default Layout;
