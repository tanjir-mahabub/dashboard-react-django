import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
