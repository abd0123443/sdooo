import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  Bars3Icon,
  TagIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/admin' },
  { name: 'Categories', icon: TagIcon, path: '/admin/categories' },
  { name: 'Products', icon: BookOpenIcon, path: '/admin/products' },
  { name: 'Customer Review', icon: ClipboardDocumentListIcon, path: '/admin/transformations' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { url } = usePage();
  const sidebarWidth = isOpen ? 'w-56' : 'w-20';

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 flex flex-col
        bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${sidebarWidth} ${isOpen ? 'block' : 'hidden sm:block'}`}
    >
      <div
        className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}
        px-4 py-4 border-b border-gray-200 dark:border-gray-700`}
      >
        <span
          className={`text-xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
        >
          Admin
        </span>
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = url === item.path;
          return (
            <Link
              href={item.path}
              key={item.name}
              className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                } ${isOpen ? '' : 'justify-center'}`}
            >
              <Icon className="h-6 w-6 flex-shrink-0" />
              <span
                className={`text-base font-medium transition-all duration-200
                ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
