import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import "../../css/main.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

const ServiceSelectorModal = ({ isOpen, onClose, onGetRecommendation }) => {
    const { t } = useTranslation();
    const [selectedProperty, setSelectedProperty] = useState("");
    const [selectedService, setSelectedService] = useState("");

    if (!isOpen) return null;

    const handleGetRecommendation = () => {
        if (!selectedProperty || !selectedService) {
            alert(t("Please select both property type and service needed."));
            return;
        }
        onGetRecommendation(selectedProperty, selectedService);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-text-primary">
                        {t('Find Your Perfect Service')}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-3">
                            {t('What type of property?')}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                className={`p-4 border-2 rounded-lg text-left transition-colors ${selectedProperty === "residential" ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"}`}
                                onClick={() =>
                                    setSelectedProperty("residential")
                                }
                            >
                                <div className="font-medium">{t('Residential')}</div>
                                <div className="text-sm text-text-secondary">
                                    {t('Home, apartment, condo')}
                                </div>
                            </button>
                            <button
                                className={`p-4 border-2 rounded-lg text-left transition-colors ${selectedProperty === "commercial" ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"}`}
                                onClick={() =>
                                    setSelectedProperty("commercial")
                                }
                            >
                                <div className="font-medium">{t('Commercial')}</div>
                                <div className="text-sm text-text-secondary">
                                    {t('Office, retail, industrial')}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-3">
                            {t('What do you need?')}
                        </label>
                        <div className="space-y-2">
                            <button
                                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${selectedService === "new-door" ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"}`}
                                onClick={() => setSelectedService("new-door")}
                            >
                                <div className="font-medium">
                                    {t('New Door Installation')}
                                </div>
                                <div className="text-sm text-text-secondary">
                                    {t('Custom or standard door installation')}
                                </div>
                            </button>
                            <button
                                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${selectedService === "repair" ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"}`}
                                onClick={() => setSelectedService("repair")}
                            >
                                <div className="font-medium">
                                    {t('Repair Service')}
                                </div>
                                <div className="text-sm text-text-secondary">
                                    {t('Fix existing door issues')}
                                </div>
                            </button>
                            <button
                                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${selectedService === "maintenance" ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"}`}
                                onClick={() =>
                                    setSelectedService("maintenance")
                                }
                            >
                                <div className="font-medium">
                                    {t('Maintenance Program')}
                                </div>
                                <div className="text-sm text-text-secondary">
                                    {t('Regular upkeep and inspections')}
                                </div>
                            </button>
                            <button
                                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${selectedService === "emergency" ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"}`}
                                onClick={() => setSelectedService("emergency")}
                            >
                                <div className="font-medium">
                                    {t('Emergency Service')}
                                </div>
                                <div className="text-sm text-text-secondary">
                                    {t('Urgent repair or replacement')}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="btn-secondary flex-1"
                            onClick={onClose}
                        >
                            {t('Cancel')}
                        </button>
                        <button
                            className="btn-primary flex-1"
                            onClick={handleGetRecommendation}
                        >
                            {t('Get Recommendation')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Services() {
    const { t } = useTranslation();
    const [isServiceModalOpen, setServiceModalOpen] = useState(false);

    const openServiceSelector = () => setServiceModalOpen(true);
    const closeServiceSelector = () => setServiceModalOpen(false);

    const getRecommendation = (property, service) => {
        let recommendation = "";
        if (service === "emergency") {
            recommendation =
                t("Emergency Service: Call (555) DOORS-24 immediately for urgent assistance.");
        } else if (service === "maintenance") {
            recommendation =
                property === "commercial"
                    ? t("Professional Care Plan recommended for commercial properties.")
                    : t("Basic Care Plan perfect for residential maintenance.");
        } else if (service === "new-door") {
            recommendation =
                t("Custom Manufacturing service recommended. Start with our door configurator.");
        } else {
            recommendation =
                t("Professional Installation service will handle your repair needs.");
        }
        alert(
            `${t('Recommendation')}: ${recommendation}\n\n${t("We'll connect you with the right specialist!")}`
        );
        closeServiceSelector();
    };

    const scrollToSection = (sectionId) => {
        document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const downloadGuide = (type) => {
        alert(
            `${t(type)} ${t('guide download would start here. This would provide detailed information about the service.')}`
        );
    };

    const selectMaintenancePlan = (plan) => {
        alert(
            `${t(plan)} ${t('maintenance plan selected! We\'ll contact you to schedule your first inspection.')}`
        );
    };

    const openEmergencyForm = () => {
        alert(
            t("Emergency service form would open here for immediate assistance requests.")
        );
    };

    useEffect(() => {
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        const handleMobileMenuClick = () =>
            mobileMenu?.classList.toggle("hidden");
        mobileMenuBtn?.addEventListener("click", handleMobileMenuClick);

        const handleScroll = () => {
            const navbar = document.getElementById("navbar");
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add("bg-white/98");
                    navbar.classList.remove("bg-white/95");
                } else {
                    navbar.classList.add("bg-white/95");
                    navbar.classList.remove("bg-white/98");
                }
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            mobileMenuBtn?.removeEventListener("click", handleMobileMenuClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-background">
            <Head>
                <title>{t('Our Services')}</title>
                <meta name="description" content="Medine Steel Doors offers a complete range of services, including custom door manufacturing, professional installation, fire safety compliance, emergency repairs, and maintenance programs." />
            </Head>
            <Header />

            <section className="pt-24 pb-16 bg-gradient-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            {t('Complete Door Solutions')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto">
                            {t('From custom manufacturing to emergency repairs, we deliver end-to-end door services with precision craftsmanship and unwavering reliability')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/05380833252?text=Hi,%20I%20want%20to%20find%20my%20service"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg flex justify-center items-center"
                            >
                                {t('Find Your Service')}
                            </a>
                            <a
                                href="https://wa.me/05380833252?text=Hi,%20I%20need%2024/7%20Emergency%20Service"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-accent text-white font-semibold px-8 py-4 rounded-lg hover:bg-accent-600 transition-all duration-300 flex justify-center items-center"
                            >
                                {t('24/7 Emergency Line')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('Our Service Pillars')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('Five comprehensive service areas designed to meet every door-related need with professional excellence')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Custom Manufacturing */}
                        <a
                            href="https://wa.me/05380833252?text=Hi,%20I%20am%20interested%20in%20Custom%20Manufacturing%20doors"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-8 h-8 text-gray-900"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">
                                    {t('Custom Manufacturing')}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {t('Precision-crafted doors tailored to your exact specifications with premium materials and innovative design.')}
                                </p>
                                <div className="flex items-center text-secondary font-medium group-hover:text-secondary-700 transition-colors">
                                    <span>{t('Learn More')}</span>
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Professional Installation */}
                        <a
                            href="https://wa.me/05380833252?text=Hi,%20I%20need%20Professional%20Installation%20service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-gradient-trust rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">
                                    {t('Professional Installation')}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {t('Certified installers delivering white-glove service with precision fitting and comprehensive warranties.')}
                                </p>
                                <div className="flex items-center text-secondary font-medium group-hover:text-secondary-700 transition-colors">
                                    <span>{t('View Process')}</span>
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Fire Safety Compliance */}
                        <a
                            href="https://wa.me/05380833252?text=Hi,%20I%20need%20Fire%20Safety%20Compliance%20service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-gradient-warm rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">
                                    {t('Fire Safety Compliance')}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {t('Certified fire-rated doors meeting all building codes with comprehensive documentation and testing.')}
                                </p>
                                <div className="flex items-center text-secondary font-medium group-hover:text-secondary-700 transition-colors">
                                    <span>{t('View Certifications')}</span>
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Emergency Repair */}
                        <a
                            href="https://wa.me/05380833252?text=Hi,%20I%20need%20Emergency%20Repair%20service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">
                                    {t('Emergency Repair')}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {t('24/7 emergency response with same-day service for urgent security and safety issues.')}
                                </p>
                                <div className="flex items-center text-accent font-medium group-hover:text-accent-600 transition-colors">
                                    <span>{t('Call Now')}</span>
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Maintenance Programs */}
                        <a
                            href="https://wa.me/05380833252?text=Hi,%20I%20am%20interested%20in%20Maintenance%20Programs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">
                                    {t('Maintenance Programs')}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    {t('Proactive maintenance plans ensuring optimal performance and extending door lifespan with regular inspections.')}
                                </p>
                                <div className="flex items-center text-secondary font-medium group-hover:text-secondary-700 transition-colors">
                                    <span>{t('View Plans')}</span>
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Not Sure Which Service */}
                        <a
                            href="https://wa.me/05380833252?text=Hi,%20I%20need%20help%20choosing%20a%20service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-gradient-primary rounded-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-8 h-8 text-gray-900"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {t('Not Sure Which Service?')}
                                </h3>
                                <p className="text-gray-800 mb-6">
                                    {t('Use our interactive service selector to find the perfect solution for your needs')}
                                </p>
                                <div className="flex items-center justify-center text-gray-900 font-medium">
                                    <span>{t('Start Here')}</span>
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <ServiceSelectorModal
                isOpen={isServiceModalOpen}
                onClose={closeServiceSelector}
                onGetRecommendation={getRecommendation}
            />
        </div>
    );
}