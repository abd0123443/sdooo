import React from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-green-700 text-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                                <img src="/icon.jpeg" alt="" />
                            </div>
                            <span className="text-2xl font-bold">
                                {t('Medine Steel Doors')}
                            </span>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            {t("Where security meets sophistication. Premium steel door solutions with precision craftsmanship and innovative design")}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-green-200 mb-6">
                            {t("Quick Links")}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    {t("Home")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/portfolio"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    {t("Portfolio")}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    {t("Contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-green-200 mb-6">
                            {t("Contact")}
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3">
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <span className="text-gray-300">
                                    05380833252
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-8 8-8-8V4z" />
                                    <path d="M2 7.414V18a2 2 0 002 2h16a2 2 0 002-2V7.414l-8 8-8-8z" />
                                </svg>
                                <span className="text-gray-300">
                                    medinecelikkapi@gmail.com
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg
                                    className="w-5 h-5 text-green-400 mt-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span className="text-gray-300">
                                    {t("123 Steel Avenue")}
                                    <br />
                                    {t("Security City, SC 12345")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-green-800 mt-12 pt-8 text-center">
                    <p className="text-green-200">
                        © 2025 Medine Steel Doors. {t("All Rights Reserved.")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
