import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import FloatingButtons from "./FloatingButtons";

export default function Header() {
    const { url } = usePage();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const langDropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);

    const toggleLangDropdown = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleClickOutside = (event) => {
        if (
            (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) ||
            (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target))
        ) {
            setIsLangDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getLinkClass = (path) => {
        return url === path
            ? "bg-green-500 text-white rounded-md px-3 py-2 text-sm font-medium"
            : "text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium";
    };

    // دالة لتحميل أداة ترجمة جوجل
    const loadGoogleTranslate = () => {
        // إذا كانت الأداة محملة مسبقاً، لا نحتاج لتحميلها again
        if (window.google && window.google.translate) return;

        const addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ar,tr',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        };
    };

    // دالة لتفعيل الترجمة للغة محددة
    const translatePage = (langCode) => {
        // التأكد من تحميل أداة الترجمة أولاً
        if (!window.google || !window.google.translate) {
            loadGoogleTranslate();

            // ننتظر حتى يتم تحميل الأداة ثم نغير اللغة
            const checkInterval = setInterval(() => {
                if (window.google && window.google.translate) {
                    clearInterval(checkInterval);
                    changeLanguage(langCode);
                }
            }, 100);
        } else {
            changeLanguage(langCode);
        }

        setIsLangDropdownOpen(false);
        setCurrentLang(langCode);
        localStorage.setItem('selectedLanguage', langCode);
    };

    // دالة لتغيير اللغة مباشرة
    const changeLanguage = (langCode) => {
        if (window.google && window.google.translate) {
            const selectField = document.querySelector('.goog-te-combo');
            if (selectField) {
                selectField.value = langCode;
                selectField.dispatchEvent(new Event('change'));

                // إخفاء عناصر واجهة جوجل غير المرغوب فيها
                setTimeout(() => {
                    const frame = document.querySelector('.goog-te-banner-frame');
                    if (frame) frame.style.display = 'none';

                    const gadget = document.querySelector('.goog-te-gadget');
                    if (gadget) gadget.style.color = 'transparent';

                    // إضافة زر "عرض الأصل" يدوياً
                    addShowOriginalButton();
                }, 500);
            }
        }
    };

    // دالة لإضافة زر "عرض الأصل" يدوياً
    const addShowOriginalButton = () => {
        // إزالة أي زر سابق إذا كان موجوداً
        const existingButton = document.getElementById('show-original-button');
        if (existingButton) {
            existingButton.remove();
        }

        // إنشاء زر جديد
        const showOriginalButton = document.createElement('button');
        showOriginalButton.id = 'show-original-button';
        showOriginalButton.textContent = 'Show Original';
        showOriginalButton.style.position = 'fixed';
        showOriginalButton.style.bottom = '20px';
        showOriginalButton.style.right = '20px';
        showOriginalButton.style.zIndex = '9999';
        showOriginalButton.style.padding = '10px 15px';
        showOriginalButton.style.backgroundColor = '#16a34a';
        showOriginalButton.style.color = 'white';
        showOriginalButton.style.border = 'none';
        showOriginalButton.style.borderRadius = '5px';
        showOriginalButton.style.cursor = 'pointer';

        showOriginalButton.onclick = () => {
            // العودة للغة الأصلية
            translatePage('en');
            // إزالة الزر بعد النقر
            showOriginalButton.remove();
        };

        // إضافة الزر إلى الصفحة فقط إذا لم تكن اللغة انجليزية
        if (currentLang !== 'en') {
            document.body.appendChild(showOriginalButton);
        }
    };

    // عند تحميل المكون، نتحقق إذا كانت هناك لغة محفوظة مسبقاً
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setCurrentLang(savedLanguage);
            // تطبيق الترجمة إذا كانت اللغة مخزنة ومختلفة عن الإنجليزية
            if (savedLanguage !== 'en') {
                // ننتظر قليلاً لتحميل DOM ثم نطبق الترجمة
                setTimeout(() => {
                    loadGoogleTranslate();
                    setTimeout(() => changeLanguage(savedLanguage), 1000);
                }, 500);
            }
        } else {
            // تحميل أداة الترجمة عند بدء التحميل للاستعداد للاستخدام
            loadGoogleTranslate();
        }
    }, []);

    return (
        <>
            <FloatingButtons />

            {/* عنصر ترجمة جوجل - مخفي ولكن ضروري للعمل */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>

            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 rtl:space-x-reverse"
                            >
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                                    <img
                                        src="/icon.jpeg"
                                        alt="Medine Steel Doors Logo"
                                        className="w-10 h-10 rounded-md"
                                    />
                                </div>
                                <span className="text-2xl font-bold text-gray-800">
                                    Medine Steel Doors
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center space-x-4">
                            <Link href="/" className={getLinkClass("/")}>Home</Link>
                            <Link href="/contact" className={getLinkClass("/contact")}>Contact</Link>
                            <Link href="/about_us" className={getLinkClass("/about_us")}>About Us</Link>
                            <Link href="/Building_Entrance_Door" className={getLinkClass("/Building_Entrance_Door")}>Building Entrance Door</Link>
                            <Link href="/Fire_Door" className={getLinkClass("/Fire_Door")}>Fire Door</Link>
                            <Link href="/Villa_Doors" className={getLinkClass("/Villa_Doors")}>Villa Doors</Link>
                            <Link href="/Steel_Door" className={getLinkClass("/Steel_Door")}>Steel Door</Link>
                        </nav>

                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="https://wa.me/905380833252"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                Design Your Door
                            </a>

                            {/* Language Dropdown - Desktop */}
                            <div className="relative inline-block text-left" ref={langDropdownRef}>
                                <button
                                    onClick={toggleLangDropdown}
                                    className="inline-flex justify-center w-full rounded-md border border-green-700 shadow-sm px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                                >
                                    {currentLang === 'en' ? 'English' : currentLang === 'ar' ? 'العربية' : 'Türkçe'}
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-green-600 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${isLangDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                    <div className="py-1">
                                        <button onClick={() => translatePage("en")} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-700">English</button>
                                        <button onClick={() => translatePage("ar")} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-700">العربية</button>
                                        <button onClick={() => translatePage("tr")} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-700">Türkçe</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-gray-600 hover:text-gray-800" onClick={toggleMobileMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden border-t border-gray-200 shadow-lg ${isMobileMenuOpen ? "block" : "hidden"}`}>
                    <nav className="px-2 pt-2 pb-4 space-y-1">
                        <Link href="/" className={getLinkClass("/") + " block"}>Home</Link>
                        <Link href="/about_us" className={getLinkClass("/about_us") + " block"}>About Us</Link>
                        <Link href="/contact" className={getLinkClass("/contact") + " block"}>Contact</Link>
                        <Link href="/Building_Entrance_Door" className={getLinkClass("/Building_Entrance_Door") + " block"}>Building Entrance Door</Link>
                        <Link href="/Fire_Door" className={getLinkClass("/Fire_Door") + " block"}>Fire Door</Link>
                        <Link href="/Villa_Doors" className={getLinkClass("/Villa_Doors") + " block"}>Villa Doors</Link>
                        <Link href="/Steel_Door" className={getLinkClass("/Steel_Door") + " block"}>Steel Door</Link>

                        <div className="border-t border-gray-200 my-2"></div>

                        <a href="https://wa.me/905380833252" className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                            Design Your Door
                        </a>

                        {/* Mobile Language Dropdown */}
                        <div className="relative inline-block text-left mt-2 w-full" ref={mobileDropdownRef}>
                            <button
                                onClick={toggleLangDropdown}
                                className="inline-flex justify-center w-full rounded-md border border-green-700 shadow-sm px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {currentLang === 'en' ? 'English' : currentLang === 'ar' ? 'العربية' : 'Türkçe'}
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className={`absolute right-0 mt-2 w-full rounded-md shadow-lg bg-green-600 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${isLangDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                <div className="py-1">
                                    <button onClick={() => translatePage("en")} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-700">English</button>
                                    <button onClick={() => translatePage("ar")} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-700">العربية</button>
                                    <button onClick={() => translatePage("tr")} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-700">Türkçe</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* إضافة CSS لإخفاء عناصر واجهة ترجمة جوجل */}
            <style>
                {`
                    .goog-te-banner-frame {
                        display: none !important;
                    }
                    .goog-te-gadget {
                        color: transparent !important;
                    }
                    .goog-te-gadget .goog-te-combo {
                        margin: 0px !important;
                    }
                    .goog-te-menu-frame {
                        z-index: 100000 !important;
                    }
                    body {
                        top: 0px !important;
                    }
                    #google_translate_element {
                        display: none;
                    }
                    .skiptranslate {
                        display: none !important;
                    }
                `}
            </style>
        </>
    );
}
