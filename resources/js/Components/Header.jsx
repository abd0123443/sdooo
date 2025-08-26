import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t, i18n } = useTranslation();
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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <img src="/icon.jpeg" alt="" />
                            </div>
                            <span className="text-xl font-bold text-text-primary">Medine Steel Doors</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-text-primary font-medium hover:text-secondary">{t('Home')}</Link>
                        <Link href="/services" className="text-text-secondary hover:text-secondary">{t('Services')}</Link>
                        <Link href="/products" className="text-text-secondary hover:text-secondary">{t('Products')}</Link>
                        <Link href="/about" className="text-text-secondary hover:text-secondary">{t('About')}</Link>
                        <Link href="/contact" className="text-text-secondary hover:text-secondary">{t('Contact')}</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href="tel:+1-555-DOORS-24" className="text-accent font-semibold hover:text-accent-600">{t('Emergency')}: (555) DOORS-24</a>
                        <a target="_blank" href="https://wa.me/05380833252?text=Hi,%20I%20want%20to%20inquire%20about%20your%20services" className="btn-primary">{t('Design Your Door')}</a>

                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            <button onClick={toggleLangDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {t('Language')}
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${isLangDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                                <div className="py-1">
                                    <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('English')}</button>
                                    <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('Arabic')}</button>
                                    <button onClick={() => changeLanguage('tr')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('Turkish')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="md:hidden p-2" onClick={toggleMobileMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-t border-border transition-all duration-300 ${isMobileMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
                <nav className="px-4 pt-4 pb-2 space-y-2">
                    <Link href="/" className="block text-text-primary font-medium">{t('Home')}</Link>
                    <Link href="/services" className="block text-text-secondary">{t('Services')}</Link>
                    <Link href="/products" className="block text-text-secondary">{t('Products')}</Link>
                    <Link href="/about" className="block text-text-secondary">{t('About')}</Link>
                    <Link href="/contact" className="block text-text-secondary">{t('Contact')}</Link>
                    <a href="tel:+1-555-DOORS-24" className="block text-accent font-semibold">{t('Emergency')}: (555) DOORS-24</a>
                    <a target="_blank" href="https://wa.me/05380833252?text=Hi,%20I%20want%20to%20inquire%20about%20your%20services" className="btn-primary block">{t('Design Your Door')}</a>
                </nav>
            </div>
        </header>
    );
}
