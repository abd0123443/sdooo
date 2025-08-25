import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import "../../css/main.css";
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useTranslation } from 'react-i18next';

export default function ProductGallery() {
    const { t } = useTranslation();
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [styleFilter, setStyleFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [modalProduct, setModalProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const { app_url } = usePage().props;
        const showAllProducts = async () => {
        try {
            const response = await axios.get(
                `${app_url}/api/products`
            );
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };
    const ProductCard = ({ product, onDetailsClick, onCustomizeClick }) => (
    <div className="product-card group" data-category={product.category} data-style={product.style}>
        <div className="relative overflow-hidden rounded-xl bg-white shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative aspect-w-4 aspect-h-5 overflow-hidden">
                <img src={`${app_url}/storage/${product.image}`} alt={product.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" onError={(e) => e.target.src = product.fallbackUrl} />
                {product.id === 'fireguard-pro' && <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-medium">{t('UL Listed')}</div>}
                {product.id === 'safeguard-modern' && <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-medium">{t('60-Min')}</div>}
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-text-primary">{product.title}</h3>
                    <div className="flex items-center space-x-1">
                        <span className="text-sm text-text-secondary">{product.tag}</span>
                    </div>
                </div>
                <p className="text-text-secondary mb-4">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">



                </div>
                <div className="flex items-center justify-between">
                    <button className="text-secondary font-medium hover:text-secondary-700 transition-colors" onClick={() => onDetailsClick(product.id)}>{t('View Details')} →</button>
                    <button className="btn-primary text-sm px-4 py-2" onClick={() => onCustomizeClick(product.id)}>{t('Customize')}</button>
                </div>
            </div>
        </div>
    </div>
);
    useEffect(() => {
        showAllProducts();
    }, []);
    const openConfigurator = () => {
        alert('Door Configurator will open here! This would launch the full AI-powered design tool.');
    };


    const ProductModal = ({ product, onClose, onCustomizeClick }) => {
    if (!product) return null;

    // Mock specifications from existing product data
    const specs = {
        Material: product.Material,
        "Security Rating": product.Security_Rating,
        "Finish Options":product.Finish_Options,
        "Standard Size": product.Standard_Size,
        "Glass Type": product.Glass_Type,
        "Hardware ": product.Hardware,
        "Lock System": product.Lock_System,
        "Warranty": product.Warranty,
    };

    // Extract features from the product description
    const features = ["Smart lock integration with biometric access",
        "Architectural glass panels with privacy options",
        "Weather-sealed construction",
         "Energy-efficient insulation",
        "Custom sizing available",
         "Professional installation included"];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-text-primary">{product.title}</h3>
                        <button className="text-text-secondary hover:text-text-primary" onClick={onClose}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div><img src={`${app_url}/storage/${product.image}`} alt={product.title} className="w-full h-96 object-cover rounded-lg" /></div>
                        <div>
                            <p className="text-text-secondary mb-6">{product.description}</p>
                            <h4 className="text-lg font-semibold text-text-primary mb-4">{t('Key Features')}</h4>
                            <ul className="space-y-2 mb-6">
                                {features.length > 0 ? features.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-2"><svg className="w-5 h-5 text-success mt-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-text-secondary">{t(feature)}</span></li>
                                )) : <p className="text-text-secondary">{t('No specific features listed.')}</p>}
                            </ul>
                            <div className="flex space-x-4">
                                <button className="btn-primary" onClick={() => onCustomizeClick(product.id)}>{t('Customize This Door')}</button>
                                <button className="btn-secondary">{t('Get Quote')}</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className="text-lg font-semibold text-text-primary mb-4">{t('Specifications')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(specs).map(([key, value]) => (<div key={key} className="flex justify-between py-2 border-b border-gray-100"><span className="font-medium text-text-secondary">{t(key)}:</span><span className="text-text-primary">{typeof value === 'object' && value !== null ? t(value.name) : t(value)}</span></div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

    const viewDetails = (productId) => {
        const product = products.find(p => p.id === productId);
        setModalProduct(product);
    };

    const closeModal = () => {
        setModalProduct(null);
    };

    const customizeDoor = (productId) => {
        closeModal();
        openConfigurator();
    };

    const resetFilters = () => {
        setCategoryFilter('all');
        setStyleFilter('all');
        setSearchTerm('');
    };



    useEffect(() => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const handleMobileMenuClick = () => mobileMenu?.classList.toggle('hidden');
        mobileMenuBtn?.addEventListener('click', handleMobileMenuClick);

        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('bg-white/98');
                    navbar.classList.remove('bg-white/95');
                } else {
                    navbar.classList.add('bg-white/95');
                    navbar.classList.remove('bg-white/98');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            mobileMenuBtn?.removeEventListener('click', handleMobileMenuClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bg-background">
            <Head>
                <title>{t('Product Gallery')}</title>
                <meta name="description" content="Explore our extensive gallery of high-quality steel doors. Find the perfect door for your home or business."/>
            </Head>
            <Header />

            <section className="pt-24 pb-16 bg-gradient-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t('Premium Door Collection')}</h1>
                        <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto">{t('Discover our complete range of precision-crafted steel doors designed for security, style, and sophistication')}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                            <div className="text-center"><div className="text-3xl font-bold text-gray-900">200+</div><div className="text-sm text-gray-800">{t('Door Styles')}</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-gray-900">50+</div><div className="text-sm text-gray-800">{t('Finish Options')}</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-gray-900">A+</div><div className="text-sm text-gray-800">{t('Fire Rating')}</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-gray-900">∞</div><div className="text-sm text-gray-800">{t('Customization')}</div></div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="py-16 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} onDetailsClick={viewDetails} onCustomizeClick={customizeDoor} />
                        ))}
                    </div>
                    <div className="text-center mt-12"><button className="btn-secondary"><svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>{t('Load More Products')}</button></div>
                </div>
            </section>


            <ProductModal product={modalProduct} onClose={closeModal} onCustomizeClick={customizeDoor} />

            <Footer />
        </div>
    );
}
