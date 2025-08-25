import React, { useContext } from 'react';
import { BellIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { ThemeContext } from '../../../Contexts/ThemeContext';

export default function Header({ isOpen }) {
    // Mock user data
    const user = { name: 'Jane Doe', avatar: null };
    const initials = user.name.split(' ').map(n => n[0]).join('');

    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Move header according to sidebar
    const headerPosition = isOpen ? 'sm:left-56' : 'sm:left-20';
    const headerWidth = isOpen ? 'sm:w-[calc(100%-14rem)]' : 'sm:w-[calc(100%-5rem)]';

    return (
        <header
            className={`fixed top-0 ${headerPosition} ${headerWidth}
                z-30 flex items-center justify-between
                px-6 py-4 bg-white dark:bg-gray-800
                shadow-md transition-all duration-300`}
        >
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Dashboard
            </h1>
            <div className="flex items-center gap-4">
                {/* Dark/Light Mode Toggle */}
                {/* <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle dark mode"
                >
                    {theme === 'dark' ? (
                        <SunIcon className="h-6 w-6 text-yellow-400" />
                    ) : (
                        <MoonIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    )}
                </button> */}

                {/* Profile Picture */}
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow">
                    {initials}
                </div>
                {/* Logout Button */}
                <Link
                    href={route("logout")}
                    method="post"
                    className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow transition"
                >
                    Logout
                </Link>
            </div>
        </header>
    );
}
