import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children, hideLayout = false }) {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    if (hideLayout) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {children}
            </div>
        );
    }

    return (
        <>
        <Head title="dashbord" />
        <div  className="min-h-screen  bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
            {/* The main content area, including header and actual content */}
            <div className="flex flex-col flex-1">
                <Header isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
                <main className={`p-6 ml-16 md-0 pt-24 transition-all duration-300 sm:ml-${sidebarIsOpen ? '56' : '20'}`}>
                    {children}
                </main>
            </div>
        </div>
        </>
    );
}
