import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import "../../css/main.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { useTranslation } from "react-i18next";
export default function AboutUs() {
    const { t } = useTranslation();

    const toggleAssistance = () => {
        const panel = document.getElementById("assistance-panel");
        if (panel) {
            panel.classList.toggle("hidden");
        }
    };

    const handleImageError = (e) => {
        const fallbackSrc = e.target.dataset.fallback;
        if (fallbackSrc && e.target.src !== fallbackSrc) {
            e.target.src = fallbackSrc;
        }
    };

    useEffect(() => {
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        const handleMobileMenuClick = () => {
            mobileMenu?.classList.toggle("hidden");
        };
        mobileMenuBtn?.addEventListener("click", handleMobileMenuClick);

        const handleScroll = () => {
            const navbar = document.getElementById("navbar");
            if (window.scrollY > 100) {
                navbar?.classList.add("bg-white/98");
                navbar?.classList.remove("bg-white/95");
            } else {
                navbar?.classList.add("bg-white/95");
                navbar?.classList.remove("bg-white/98");
            }
        };
        window.addEventListener("scroll", handleScroll);

        const handleClickOutside = (event) => {
            const widget = document.getElementById("assistance-widget");
            const panel = document.getElementById("assistance-panel");
            if (widget && !widget.contains(event.target)) {
                panel?.classList.add("hidden");
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            mobileMenuBtn?.removeEventListener("click", handleMobileMenuClick);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-background">
            {/* Navigation Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 bg-gradient-primary overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance">
                            {t("Crafting Excellence")}
                            <span className="block text-4xl md:text-6xl mt-2">
                                {t("Since 2009")}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
                            {t(
                                "Where traditional craftsmanship meets innovative technology to create doors that don't just secure—they inspire"
                            )}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                            >
                                {t("Meet Our Team")}
                            </Link>
                            <Link
                                href="/products"
                                className="bg-white/20 backdrop-blur-sm text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                            >
                                {t("View Our Work")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Timeline */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t("Our Journey of Innovation")}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t(
                                "Key milestones that shaped Medine Steel Doors into the industry leader we are today"
                            )}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full"></div>

                        {/* Timeline Items */}
                        <div className="space-y-16">
                            {/* 2009 - Foundation */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8 text-right">
                                    <div className="bg-white p-6 rounded-xl shadow-card">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {t("Company Founded")}
                                        </h3>
                                        <p className="text-text-secondary mb-3">
                                            {t(
                                                "Michael Medine establishes the company with a vision to revolutionize door installation through precision craftsmanship."
                                            )}
                                        </p>
                                        <span className="text-sm font-medium text-secondary">
                                            2009
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>

                            {/* 2012 - First Certification */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-lg"></div>
                                <div className="flex-1 pl-8">
                                    <div className="bg-white p-6 rounded-xl shadow-card">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {t("Fire Safety Certification")}
                                        </h3>
                                        <p className="text-text-secondary mb-3">
                                            {t(
                                                "Achieved A+ fire safety rating and became certified installer for commercial fire doors."
                                            )}
                                        </p>
                                        <span className="text-sm font-medium text-secondary">
                                            2012
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 2015 - Manufacturing Facility */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8 text-right">
                                    <div className="bg-white p-6 rounded-xl shadow-card">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {t("Manufacturing Expansion")}
                                        </h3>
                                        <p className="text-text-secondary mb-3">
                                            {t(
                                                "Opened state-of-the-art manufacturing facility with precision equipment and quality control systems."
                                            )}
                                        </p>
                                        <span className="text-sm font-medium text-secondary">
                                            2015
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>

                            {/* 2018 - Technology Innovation */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-success rounded-full border-4 border-white shadow-lg"></div>
                                <div className="flex-1 pl-8">
                                    <div className="bg-white p-6 rounded-xl shadow-card">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {t("Digital Innovation")}
                                        </h3>
                                        <p className="text-text-secondary mb-3">
                                            {t(
                                                "Launched industry-first 3D door visualization technology and digital design consultation services."
                                            )}
                                        </p>
                                        <span className="text-sm font-medium text-secondary">
                                            2018
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 2021 - AI Configurator */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8 text-right">
                                    <div className="bg-white p-6 rounded-xl shadow-card">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {t("AI-Powered Configurator")}
                                        </h3>
                                        <p className="text-text-secondary mb-3">
                                            {t(
                                                "Revolutionary AI door design configurator launched, allowing real-time customization and visualization."
                                            )}
                                        </p>
                                        <span className="text-sm font-medium text-secondary">
                                            2021
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>

                            {/* 2024 - Industry Leadership */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-lg"></div>
                                <div className="flex-1 pl-8">
                                    <div className="bg-white p-6 rounded-xl shadow-card">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {t("Industry Recognition")}
                                        </h3>
                                        <p className="text-text-secondary mb-3">
                                            {t(
                                                'Named "Innovative Door Company of the Year" and established partnerships with leading architects.'
                                            )}
                                        </p>
                                        <span className="text-sm font-medium text-secondary">
                                            2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t("Meet Our Expert Team")}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t(
                                "Industry experts with decades of combined experience in precision door installation and security solutions"
                            )}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                            <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    alt={t("Michael Medine - Founder & CEO")}
                                    className="w-full h-64 object-cover"
                                    loading="lazy"
                                    data-fallback="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    onError={handleImageError}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-text-primary mb-1">
                                    {t("Michael Medine")}
                                </h3>
                                <p className="text-secondary font-medium mb-3">
                                    {t("Founder & CEO")}
                                </p>
                                <p className="text-text-secondary text-sm mb-4">
                                    {t(
                                        "Master craftsman with 20+ years experience. Certified in fire safety compliance and advanced security systems."
                                    )}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-primary-100 text-primary-500 px-2 py-1 rounded text-xs font-medium">
                                        {t("Fire Safety Expert")}
                                    </span>
                                    <span className="bg-secondary-100 text-secondary px-2 py-1 rounded text-xs font-medium">
                                        {t("ISO Certified")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                            <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                                <img
                                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt={t("Sarah Chen - Head of Design")}
                                    className="w-full h-64 object-cover"
                                    loading="lazy"
                                    data-fallback="https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg"
                                    onError={handleImageError}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-text-primary mb-1">
                                    {t("Sarah Chen")}
                                </h3>
                                <p className="text-secondary font-medium mb-3">
                                    {t("Head of Design")}
                                </p>
                                <p className="text-text-secondary text-sm mb-4">
                                    {t(
                                        "Architectural designer specializing in luxury residential and commercial door solutions with 12 years experience."
                                    )}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-accent-100 text-accent px-2 py-1 rounded text-xs font-medium">
                                        {t("Design Expert")}
                                    </span>
                                    <span className="bg-success-100 text-success px-2 py-1 rounded text-xs font-medium">
                                        {t("LEED Certified")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                            <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                                <img
                                    src="https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg"
                                    alt={t(
                                        "David Rodriguez - Installation Manager"
                                    )}
                                    className="w-full h-64 object-cover"
                                    loading="lazy"
                                    data-fallback="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop"
                                    onError={handleImageError}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-text-primary mb-1">
                                    {t("David Rodriguez")}
                                </h3>
                                <p className="text-secondary font-medium mb-3">
                                    {t("Installation Manager")}
                                </p>
                                <p className="text-text-secondary text-sm mb-4">
                                    {t(
                                        "Precision installation specialist with expertise in complex commercial projects and emergency repairs."
                                    )}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-warning-100 text-warning px-2 py-1 rounded text-xs font-medium">
                                        {t("Installation Pro")}
                                    </span>
                                    <span className="bg-error-100 text-error px-2 py-1 rounded text-xs font-medium">
                                        {t("Emergency Certified")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manufacturing Capabilities */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('Precision Manufacturing')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('State-of-the-art facility equipped with cutting-edge technology for uncompromising quality control')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Manufacturing Image */}
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-elevated">
                                <img
                                    src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    alt={t('Manufacturing Facility')}
                                    className="w-full h-80 object-cover"
                                    loading="lazy"
                                    data-fallback="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    onError={handleImageError}
                                />
                            </div>
                        </div>

                        {/* Manufacturing Content */}
                        <div>
                            <h3 className="text-3xl font-bold text-text-primary mb-6">
                                {t('Advanced Production Facility')}
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary">
                                            {t('CNC Precision Cutting')}
                                        </h4>
                                        <p className="text-text-secondary">
                                            {t('Computer-controlled cutting ensures perfect dimensions and consistent quality across all door components.')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary">
                                            {t('Automated Welding Systems')}
                                        </h4>
                                        <p className="text-text-secondary">
                                            {t('Robotic welding technology delivers consistent, high-strength joints that exceed industry standards.')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary">
                                            {t('Multi-Stage Quality Control')}
                                        </h4>
                                        <p className="text-text-secondary">
                                            {t('Every door undergoes rigorous testing including fire resistance, security, and finish quality assessments.')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manufacturing Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-card">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-text-primary mb-1">{t('15,000')}</div>
                            <div className="text-sm text-text-secondary">{t('Sq Ft Facility')}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-card">
                            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-text-primary mb-1">{t('99.8%')}</div>
                            <div className="text-sm text-text-secondary">{t('Quality Rate')}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-card">
                            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-text-primary mb-1">{t('48hr')}</div>
                            <div className="text-sm text-text-secondary">{t('Production Time')}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-card">
                            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-text-primary mb-1">{t('25yr')}</div>
                            <div className="text-sm text-text-secondary">{t('Warranty')}</div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Certifications & Partnerships */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('Certifications & Partnerships')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('Industry-leading certifications and strategic partnerships that ensure the highest standards of quality and compliance')}
                        </p>
                    </div>

                    {/* Certifications Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">
                                {t('Fire Safety A+ Rating')}
                            </h3>
                            <p className="text-sm text-text-secondary">
                                {t('Certified for 90-minute fire resistance doors')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">
                                {t('ISO 9001:2015')}
                            </h3>
                            <p className="text-sm text-text-secondary">
                                {t('Quality management system certification')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">
                                {t('NFPA Compliance')}
                            </h3>
                            <p className="text-sm text-text-secondary">
                                {t('National Fire Protection Association standards')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">
                                {t('LEED Certified')}
                            </h3>
                            <p className="text-sm text-text-secondary">
                                {t('Sustainable building practices')}
                            </p>
                        </div>
                    </div>

                    {/* Partnership Logos */}
                    <div className="border-t border-border pt-16">
                        <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
                            {t('Trusted by Industry Leaders')}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                            <div className="text-center">
                                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-gray-600">
                                        {t('NFPA')}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-gray-600">
                                        {t('AIA')}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-gray-600">
                                        {t('USGBC')}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-gray-600">
                                        {t('DHI')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Company Values */}


            {/* Customer Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('What Our Customers Say')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('Real experiences from customers who chose Medine Steel Doors for their security and design needs')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-surface p-8 rounded-xl shadow-card">
                            <div className="flex items-center mb-4">
                                <div className="flex text-primary">
                                    {/* Stars (يمكن تركها كما هي لأنها أيقونات) */}
                                </div>
                            </div>
                            <p className="text-text-secondary mb-6 italic">
                                {t('"The AI configurator was incredible - we could see exactly how our door would look before installation. The quality exceeded our expectations, and the installation team was professional and efficient."')}
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                                    <span className="text-gray-900 font-semibold">JM</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-text-primary">
                                        {t('Jennifer Martinez')}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        {t('Homeowner, Beverly Hills')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-surface p-8 rounded-xl shadow-card">
                            <div className="flex items-center mb-4">
                                <div className="flex text-primary">
                                    {/* Stars */}
                                </div>
                            </div>
                            <p className="text-text-secondary mb-6 italic">
                                {t('"As an architect, I appreciate their attention to detail and technical expertise. The fire-rated doors for our commercial project exceeded all compliance requirements while maintaining aesthetic appeal."')}
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-semibold">RT</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-text-primary">
                                        {t('Robert Thompson')}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        {t('Architect, Thompson & Associates')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-surface p-8 rounded-xl shadow-card">
                            <div className="flex items-center mb-4">
                                <div className="flex text-primary">
                                    {/* Stars */}
                                </div>
                            </div>
                            <p className="text-text-secondary mb-6 italic">
                                {t('"Three years later, our door still looks and functions like new. The peace of mind knowing we have premium security with beautiful design makes it worth every penny."')}
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-semibold">SC</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-text-primary">
                                        {t('Sarah Chen')}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        {t('Business Owner, Manhattan')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Community & Sustainability */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('Community & Sustainability')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('Our commitment extends beyond doors to building stronger communities and protecting our environment')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Community Involvement */}
                        <div className="bg-white p-8 rounded-xl shadow-card">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                                    
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">
                                    {t('Community Impact')}
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('Annual donation of security doors to local shelters and community centers')}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('Partnership with Habitat for Humanity providing doors for affordable housing projects')}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('Local apprenticeship programs supporting next-generation craftspeople')}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('Emergency response team for disaster relief door replacements')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sustainability Practices */}
                        <div className="bg-white p-8 rounded-xl shadow-card">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center mr-4">
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">
                                    {t('Environmental Responsibility')}
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('100% recyclable steel sourced from certified sustainable suppliers')}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('Zero-waste manufacturing process with 95% material utilization rate')}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('Solar-powered facility reducing carbon footprint by 60%')}
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-text-secondary">
                                        {t('LEED-certified building practices and green transportation fleet')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('Ready to Experience the Medine Difference?')}
                    </h2>
                    <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                        {t('Join thousands of satisfied customers who chose precision craftsmanship, innovative customization, and uncompromising security.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                        >
                            {t('Schedule Consultation')}
                        </Link>
                        <a
                            href="tel:+1-555-DOORS-24"
                            className="bg-accent text-white font-semibold px-8 py-4 rounded-lg hover:bg-accent-600 transition-all duration-300"
                        >
                            {t('Call Now: (555) DOORS-24')}
                        </a>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <Footer />

            {/* Floating Assistance Widget */}
            <div className="fixed bottom-6 right-6 z-50" id="assistance-widget">
                <div
                    className="bg-gradient-primary rounded-full p-4 shadow-elevated cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={toggleAssistance}
                >
                    <svg
                        className="w-6 h-6 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>

                {/* Assistance Panel */}
                <div
                    className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-elevated p-6 hidden"
                    id="assistance-panel"
                >
                    <h4 className="font-semibold text-text-primary mb-4">
                        How can we help you?
                    </h4>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                            <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-accent"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium text-sm">
                                    Emergency Service
                                </div>
                                <div className="text-xs text-text-secondary">
                                    24/7 urgent repairs
                                </div>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-primary-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium text-sm">
                                    Design Consultation
                                </div>
                                <div className="text-xs text-text-secondary">
                                    Free door design help
                                </div>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                            <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium text-sm">
                                    Get Quote
                                </div>
                                <div className="text-xs text-text-secondary">
                                    Free installation estimate
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
