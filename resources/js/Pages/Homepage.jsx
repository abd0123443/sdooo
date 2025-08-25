import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import "../../css/main.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

export default function Homepage() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [transformations, setTransformations] = useState([]);
    const { app_url } = usePage().props;
    const [selectedPDF, setSelectedPDF] = useState(null);

  const openPDF = (pdf) => {
    setSelectedPDF(pdf);
  };

  const closePDF = () => {
    setSelectedPDF(null);
  };

    const showProductPreview = (productType) => {
        alert(
            `${productType} preview would open here with detailed customization options!`
        );
    };
    const showAllTransformations = async () => {
        try {
            const response = await axios.get(
                `${app_url}/api/transformations`
            );
            setTransformations(response.data.transformations);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showAllTransformations();
    }, []);
    const toggleAssistance = () => {
        const panel = document.getElementById("assistance-panel");
        panel?.classList.toggle("hidden");
    };
    const showAllCategories = async () => {
        try {
            const response = await axios.get(
                `${app_url}/api/categories/list`
            );
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
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

        const handleClickOutside = (event) => {
            const widget = document.getElementById("assistance-widget");
            const panel = document.getElementById("assistance-panel");
            if (widget && !widget.contains(event.target)) {
                panel?.classList.add("hidden");
            }
        };
        document.addEventListener("click", handleClickOutside);

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                document
                    .querySelector(this.getAttribute("href"))
                    ?.scrollIntoView({
                        behavior: "smooth",
                    });
            });
        });

        return () => {
            mobileMenuBtn?.removeEventListener("click", handleMobileMenuClick);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        showAllCategories();
    }, []);
    return (
        <div className="bg-background">
            <Head>
                <title>Homepage</title>
                <meta name="description" content="Welcome to Medine Steel Doors. We provide high-quality steel doors for your home and business." />
            </Head>
            <Header />

            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                    >
                        <source
                            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                        {t('Where Security Meets')}{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {t('Sophistication')}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                        {t('Precision-crafted steel doors that make your entrance unforgettable while providing uncompromising security')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            className="btn-primary text-lg px-8 py-4"
                            href="https://wa.me/05380833252?text=Hi%2C%20I"
                        >
                            <svg
                                className="w-5 h-5 mr-2 inline"
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
                            {t('Design Your Door')}
                        </a>
                        <Link
                            href="/contact"
                            className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                        >
                            {t('Get Free Consultation')}
                        </Link>
                        <a
                            href="tel:+1-555-DOORS-24"
                            className="text-accent font-semibold hover:text-primary transition-colors"
                        >
                            <svg
                                className="w-5 h-5 mr-2 inline"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            {t('Emergency Service')}
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
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
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </section>

            <section className="bg-white py-8 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-6 h-6 text-success"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-text-primary">
                                15+
                            </span>
                            <span className="text-sm text-text-secondary">
                                {t('Years Experience')}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-6 h-6 text-primary-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-text-primary">
                                5000+
                            </span>
                            <span className="text-sm text-text-secondary">
                                {t('Doors Installed')}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-6 h-6 text-accent"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-text-primary">
                                A+ {t('Rated')}
                            </span>
                            <span className="text-sm text-text-secondary">
                                {t('Fire Safety')}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                    className="w-6 h-6 text-secondary"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-text-primary">
                                98%
                            </span>
                            <span className="text-sm text-text-secondary">
                                {t('Customer Satisfaction')}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('Discover Your Perfect Door')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('From grand entrances to fire-rated security, explore our comprehensive range of premium steel door solutions')}
                        </p>
                    </div>
                    <div   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((category, idx) => (
                            <div
                            onClick={() => openPDF(category.pdf_file)}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-xl bg-white shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                                        <img
                                            src={`${app_url}/storage/${category.image}`}
                                            alt="Main Entrance Door"
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-text-secondary mb-4">
                                            {category.description}
                                        </p>
                                        <div className="flex items-center text-secondary font-medium">
                                            <span>{t('Explore Options')}</span>
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
                                    <button className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <svg
                                                className="w-12 h-12 mx-auto mb-4"
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
                                            <p className="font-semibold">
                                                {t('Customize Now')}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Featured Door Configurator Section  */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Configurator Preview */}
                        <div className="relative">
                            <div className="bg-gradient-primary p-8 rounded-2xl">
                                <div className="bg-white rounded-xl p-6 shadow-elevated">
                                    <h3 className="text-2xl font-bold text-text-primary mb-6">
                                        {t('AI-Powered Door Designer')}
                                    </h3>

                                    {/* Style Selection */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-text-primary mb-3">
                                            {t('Door Style')}
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            <button className="p-3 border-2 border-primary rounded-lg bg-primary-50 text-center">
                                                <div className="w-full h-16 bg-primary-200 rounded mb-2"></div>
                                                <span className="text-xs font-medium">
                                                    {t('Modern')}
                                                </span>
                                            </button>
                                            <button className="p-3 border border-gray-200 rounded-lg hover:border-primary text-center">
                                                <div className="w-full h-16 bg-gray-200 rounded mb-2"></div>
                                                <span className="text-xs">
                                                    {t('Classic')}
                                                </span>
                                            </button>
                                            <button className="p-3 border border-gray-200 rounded-lg hover:border-primary text-center">
                                                <div className="w-full h-16 bg-gray-200 rounded mb-2"></div>
                                                <span className="text-xs">
                                                    {t('Industrial')}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Finish Selection */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-text-primary mb-3">
                                            {t('Finish')}
                                        </label>
                                        <div className="flex space-x-3">
                                            <button className="w-8 h-8 rounded-full bg-gray-800 border-2 border-primary"></button>
                                            <button className="w-8 h-8 rounded-full bg-gray-400 border border-gray-300"></button>
                                            <button className="w-8 h-8 rounded-full bg-amber-600 border border-gray-300"></button>
                                            <button className="w-8 h-8 rounded-full bg-red-800 border border-gray-300"></button>
                                        </div>
                                    </div>

                                    {/* Hardware Selection */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-text-primary mb-3">
                                            {t('Hardware')}
                                        </label>
                                        <select className="input-field">
                                            <option>
                                                {t('Premium Stainless Steel')}
                                            </option>
                                            <option>{t('Brushed Bronze')}</option>
                                            <option>{t('Matte Black')}</option>
                                        </select>
                                    </div>

                                    {/* WhatsApp Button */}
                                    <a
                                        href="https://wa.me/05380833252"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary w-full text-center inline-block"
                                    >
                                        {t('Launch Full Designer')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                                {t('Design Your Dream Door in Minutes')}
                            </h2>
                            <p className="text-xl text-text-secondary mb-8">
                                {t('Our revolutionary AI-powered configurator lets you visualize, customize, and perfect your door design before installation. See exactly how your door will look in your space.')}
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg
                                            className="w-4 h-4 text-gray-900"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary">
                                            {t('Real-Time Visualization')}
                                        </h4>
                                        <p className="text-text-secondary">
                                            {t('See your customizations instantly with photorealistic rendering')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg
                                            className="w-4 h-4 text-gray-900"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary">
                                            {t('Unlimited Combinations')}
                                        </h4>
                                        <p className="text-text-secondary">
                                            {t('Mix and match styles, finishes, and hardware options')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg
                                            className="w-4 h-4 text-gray-900"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary">
                                            {t('Save & Share')}
                                        </h4>
                                        <p className="text-text-secondary">
                                            {t('Save your designs and share with family or architects')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/05380833252"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-center inline-block"
                                >
                                    {t('Start Designing Now')}
                                </a>
                                <a
                                    href="https://wa.me/05380833252"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary text-center inline-block"
                                >
                                    {t('View Gallery')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Customer Transformation Stories  */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                            {t('Transformation Stories')}
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            {t('See how Medine Steel Doors transforms entrances and enhances security for homes and businesses')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Transformation  */}
                        {transformations.map((transformation, idx) => (
                            <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-all duration-300">
                                <div className="relative">
                                    <img
                                        src={`${app_url}/storage/${transformation.image}`}
                                        alt="Modern Home Transformation"
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src =
                                                "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800";
                                        }}
                                    />
                                    <div className="absolute top-4 left-4 bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {t('Before & After')}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                                        {transformation.name}
                                    </h3>
                                    <p className="text-text-secondary mb-4">
                                        {transformation.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-text-secondary">
                                            {transformation.location}
                                        </span>
                                        <a
                                            href="https://wa.me/05380833252?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Modern%20Villa%20Entrance"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary font-medium hover:text-secondary-700 transition-colors"
                                        >
                                            {t('View Details')} →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href="https://wa.me/05380833252?text=Hi%2C%20I%20want%20to%20see%20all%20transformations"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            {t('View All Transformations')}
                        </a>
                    </div>
                </div>
            </section>
            {/* CTA Section  */}
            <section className="py-20 bg-gradient-primary">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('Ready to Transform Your Entrance?')}
                    </h2>
                    <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                        {t('Join thousands of satisfied customers who chose Medine Steel Doors for uncompromising security and sophisticated design.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/05380833252?text=Hi%2C%20I%20want%20a%20free%20consultation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                        >
                            {t('Get Free Consultation')}
                        </a>
                        <a
                            href="tel:+05380833252"
                            className="bg-accent text-white font-semibold px-8 py-4 rounded-lg hover:bg-accent-600 transition-all duration-300"
                        >
                            {t('Call Now')}: 05380833252
                        </a>
                    </div>
                </div>
            </section>
            {selectedPDF && (
                <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={closePDF}
                >
                <div
                    className="bg-white rounded-xl w-11/12 md:w-3/4 lg:w-1/2 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-end p-2">
                    <button
                        className="text-gray-600 hover:text-gray-900 font-bold"
                        onClick={closePDF}
                    >
                        ×
                    </button>
                    </div>
                    <iframe
                    src={`${app_url}/storage/${selectedPDF}`}
                    className="w-full h-[600px]"
                    title="PDF Viewer"
                    ></iframe>
                </div>
                </div>
            )}
            <Footer />

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

                <div
                    className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-elevated p-6 hidden"
                    id="assistance-panel"
                >
                    <h4 className="font-semibold text-text-primary mb-4">
                        {t('How can we help you?')}
                    </h4>

                    <div className="space-y-3">
                        <a
                            href="https://wa.me/05380833252?text=Hi%2C%20I%20need%20Emergency%20Service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                        >
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
                                    {t('Emergency Service')}
                                </div>
                                <div className="text-xs text-text-secondary">
                                    {t('24/7 urgent repairs')}
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://wa.me/05380833252?text=Hi%2C%20I%20need%20Design%20Consultation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                        >
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
                                    {t('Design Consultation')}
                                </div>
                                <div className="text-xs text-text-secondary">
                                    {t('Free door design help')}
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://wa.me/05380833252?text=Hi%2C%20I%20need%20Get%20Quote"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                        >
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
                                    {t('Get Quote')}
                                </div>
                                <div className="text-xs text-text-secondary">
                                    {t('Free installation estimate')}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
