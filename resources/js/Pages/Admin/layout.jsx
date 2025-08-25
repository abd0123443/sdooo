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
        <div  className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
            <div className={`transition-all duration-300 sm:mr-${sidebarIsOpen ? '56' : '20'}`}>
                <Header isOpen={sidebarIsOpen} />
                <main className="p-6 pt-24 ml-16">
                    {children}
                </main>
            </div>
        </div>
        </>
    );
}
