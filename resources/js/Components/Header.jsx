import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t, i18n } = useTranslation();
    const { url } = usePage();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangDropdownOpen(false);
    };

    const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsLangDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getLinkClass = (path) => {
        return url === path
            ? 'bg-green-500 text-white rounded-md px-3 py-2 text-sm font-medium'
            : 'text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium';
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                                <img src="/icon.jpeg" alt="Medine Steel Doors Logo" className="w-10 h-10 rounded-md" />
                            </div>
                            <span className="text-2xl font-bold text-gray-800">Medine Steel Doors</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-4">
                        <Link href="/" className={getLinkClass('/')}>{t('Home')}</Link>
                        <Link href="/portfolio" className={getLinkClass('/portfolio')}>{t('Portfolio')}</Link>
                        <Link href="/contact" className={getLinkClass('/contact')}>{t('Contact')}</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <a target="_blank" href="https://wa.me/905380833252" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                            {t('Design Your Door')}
                        </a>

                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            <button onClick={toggleLangDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {i18n.language.toUpperCase()}
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${isLangDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                                <div className="py-1">
                                    <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</button>
                                    <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">العربية</button>
                                    <button onClick={() => changeLanguage('tr')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Türkçe</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="md:hidden p-2 text-gray-600 hover:text-gray-800" onClick={toggleMobileMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-t border-gray-200 shadow-lg ${isMobileMenuOpen ? "block" : "hidden"}`}>
                <nav className="px-2 pt-2 pb-4 space-y-1">
                    <Link href="/" className={getLinkClass('/') + ' block'}>{t('Home')}</Link>
                    <Link href="/portfolio" className={getLinkClass('/portfolio') + ' block'}>{t('Portfolio')}</Link>
                    <Link href="/contact" className={getLinkClass('/contact') + ' block'}>{t('Contact')}</Link>
                     <div className="border-t border-gray-200 my-2"></div>
                     <a target="_blank" href="https://wa.me/05380833252?text=Hi,%20I%20want%20to%20inquire%20about%20your%20services" className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        {t('Design Your Door')}
                    </a>
                </nav>
            </div>
        </header>
    );
}
