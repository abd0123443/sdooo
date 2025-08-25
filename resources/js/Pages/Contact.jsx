import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import "../../css/main.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t } = useTranslation();
    const [consultationType, setConsultationType] = useState('on-site');
    const [inquiryType, setInquiryType] = useState(null);

    const openConfigurator = () => {
        alert('Door Configurator will open here! This would launch the full AI-powered design tool.');
    };

    const scrollToConsultation = () => {
        document.getElementById('consultation-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const scrollToContactForm = () => {
        document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const openEmergencyForm = () => {
        document.getElementById('emergency-modal')?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeEmergencyForm = () => {
        document.getElementById('emergency-modal')?.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    const openScheduler = () => {
        alert('Calendar scheduler would open here with available time slots!');
    };

    const openSupportForm = () => {
        alert('Technical support form would open here!');
    };

    const handleImageError = (e) => {
        const fallbackSrc = e.target.dataset.fallback;
        if (fallbackSrc && e.target.src !== fallbackSrc) {
            e.target.src = fallbackSrc;
        }
    };

    const handleFileUpload = (e, fileListId) => {
        const fileList = document.getElementById(fileListId);
        if (!fileList) return;
        fileList.innerHTML = '';
        Array.from(e.target.files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between p-2 bg-gray-50 rounded text-sm';
            fileItem.innerHTML = `<span>${file.name}</span><span class="text-text-secondary">${(file.size / 1024 / 1024).toFixed(2)} MB</span>`;
            fileList.appendChild(fileItem);
        });
    };

    const handleGeneralFileUpload = (e) => {
        const fileCount = e.target.files.length;
        const label = e.target.nextElementSibling;
        if (label) {
            const textDiv = label.querySelector('div');
            if (textDiv) {
                textDiv.textContent = fileCount > 0 ? `${fileCount} file(s) selected` : 'Upload supporting documents';
            }
        }
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

        const emergencyModal = document.getElementById('emergency-modal');
        const handleModalClickOutside = (e) => {
            if (e.target === emergencyModal) {
                closeEmergencyForm();
            }
        };
        emergencyModal?.addEventListener('click', handleModalClickOutside);

        const dateInput = document.querySelector('input[name="preferred_date"]');
        if (dateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }

        return () => {
            mobileMenuBtn?.removeEventListener('click', handleMobileMenuClick);
            window.removeEventListener('scroll', handleScroll);
            emergencyModal?.removeEventListener('click', handleModalClickOutside);
        };
    }, []);

    return (
        <div className="bg-background">
            <Head>
                <title>{t('Contact Us')}</title>
                <meta name="description" content="Contact Medine Steel Doors for emergency service, design consultations, or any other inquiries. We are available 24/7 to assist you." />
            </Head>
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t('Get in Touch')}</h1>
                        <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto">{t('Whether you need emergency service, design consultation, or technical support, we\'re here to help 24/7')}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="tel:+1-555-DOORS-24" className="bg-accent text-white font-semibold px-8 py-4 rounded-lg hover:bg-accent-600 transition-all duration-300 flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                                <span>{t('Emergency Service')}</span>
                            </a>
                            <button className="bg-white/20 backdrop-blur-sm text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 border border-gray-900/20" onClick={scrollToConsultation}>{t('Schedule Consultation')}</button>
                            <a href="mailto:info@medinesteeldoors.com" className="text-gray-900 font-semibold hover:text-gray-700 transition-colors flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-8 8-8-8V4z" /><path d="M2 7.414V18a2 2 0 002 2h16a2 2 0 002-2V7.414l-8 8-8-8z" /></svg>
                                <span>{t('Email Us')}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">{t('How Can We Help You?')}</h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t('Choose the contact method that best fits your needs and urgency level')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-accent-50 rounded-xl p-8 text-center hover:shadow-elevated transition-all duration-300 border-2 border-accent-100">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg></div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">{t('Emergency Service')}</h3>
                            <p className="text-text-secondary mb-6">{t('24/7 immediate response for urgent door failures or security breaches')}</p>
                            <div className="space-y-3">
                                <a href="tel:+1-555-DOORS-24" className="btn-accent w-full flex items-center justify-center space-x-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg><span>{t('Call Now')}</span></a>
                                <button className="text-accent font-medium hover:text-accent-600 transition-colors" onClick={openEmergencyForm}>{t('Emergency Form')} →</button>
                            </div>
                            <div className="mt-4 text-sm text-accent font-medium">{t('Response Time')}: &lt; 2 {t('hours')}</div>
                        </div>
                        <div className="bg-primary-50 rounded-xl p-8 text-center hover:shadow-elevated transition-all duration-300 border-2 border-primary-100">
                            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">{t('Design Consultation')}</h3>
                            <p className="text-text-secondary mb-6">{t('Schedule on-site visits or virtual design sessions with our experts')}</p>
                            <div className="space-y-3">
                                <button className="btn-primary w-full" onClick={openScheduler}>{t('Schedule Visit')}</button>
                                <button className="text-secondary font-medium hover:text-secondary-700 transition-colors" onClick={openConfigurator}>{t('Virtual Designer')} →</button>
                            </div>
                            <div className="mt-4 text-sm text-secondary font-medium">{t('Response Time')}: {t('Same day')}</div>
                        </div>
                        <div className="bg-secondary-50 rounded-xl p-8 text-center hover:shadow-elevated transition-all duration-300 border-2 border-secondary-100">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" /></svg></div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">{t('Technical Support')}</h3>
                            <p className="text-text-secondary mb-6">{t('Expert assistance for existing customers and specification questions')}</p>
                            <div className="space-y-3">
                                <a href="tel:+1-555-TECH-HELP" className="btn-secondary w-full flex items-center justify-center space-x-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg><span>{t('Tech Support')}</span></a>
                                <button className="text-secondary font-medium hover:text-secondary-700 transition-colors" onClick={openSupportForm}>{t('Support Ticket')} →</button>
                            </div>
                            <div className="mt-4 text-sm text-secondary font-medium">{t('Response Time')}: 4-6 {t('hours')}</div>
                        </div>
                        <div className="bg-surface rounded-xl p-8 text-center hover:shadow-elevated transition-all duration-300 border-2 border-border">
                            <div className="w-16 h-16 bg-text-secondary rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">{t('General Inquiries')}</h3>
                            <p className="text-text-secondary mb-6">{t('Questions about products, pricing, or general information')}</p>
                            <div className="space-y-3">
                                <a href="mailto:info@medinesteeldoors.com" className="bg-text-secondary text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700 w-full flex items-center justify-center space-x-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-8 8-8-8V4z" /><path d="M2 7.414V18a2 2 0 002 2h16a2 2 0 002-2V7.414l-8 8-8-8z" /></svg><span>{t('Email Us')}</span></a>
                                <button className="text-text-secondary font-medium hover:text-gray-700 transition-colors" onClick={scrollToContactForm}>{t('Contact Form')} →</button>
                            </div>
                            <div className="mt-4 text-sm text-text-secondary font-medium">{t('Response Time')}: 24 {t('hours')}</div>
                        </div>
                    </div>
                </div>
            </section>





            {/* Location & Team Information */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-3xl font-bold text-text-primary mb-8">{t('Visit Our Showroom')}</h3>
                            <div className="bg-gray-200 rounded-xl h-64 mb-6 relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Medine Steel Doors Showroom Location" className="w-full h-full object-cover" loading="lazy" data-fallback="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" onError={handleImageError} />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="bg-white rounded-lg p-4 shadow-card">
                                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto mb-2"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg></div>
                                        <div className="text-sm font-medium text-text-primary">{t('Medine Steel Doors')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0"><svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg></div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary mb-1">{t('Showroom Address')}</h4>
                                        <p className="text-text-secondary">123 Steel Avenue<br />Security City, SC 12345<br />United States</p>
                                        <button className="text-primary font-medium hover:text-primary-400 transition-colors mt-2">{t('Get Directions')} →</button>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary mb-1">{t('Business Hours')}</h4>
                                        <div className="text-text-secondary space-y-1">
                                            <div className="flex justify-between"><span>{t('Monday - Friday')}:</span><span>8:00 AM - 6:00 PM</span></div>
                                            <div className="flex justify-between"><span>{t('Saturday')}:</span><span>9:00 AM - 4:00 PM</span></div>
                                            <div className="flex justify-between"><span>{t('Sunday')}:</span><span>{t('Closed')}</span></div>
                                            <div className="text-accent font-medium mt-2">{t('Emergency Service')}: 24/7</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary mb-1">{t('Parking & Access')}</h4>
                                        <p className="text-text-secondary">{t('Free parking available')}<br />{t('Wheelchair accessible entrance')}<br />{t('Large door samples on display')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-text-primary mb-8">{t('Meet Our Team')}</h3>
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl p-6 shadow-card">
                                    <div className="flex items-start space-x-4">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Michael Chen - Design Consultant" className="w-16 h-16 rounded-full object-cover" loading="lazy" data-fallback="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800" onError={handleImageError} />
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold text-text-primary">Michael Chen</h4>
                                            <p className="text-secondary font-medium mb-2">{t('Senior Design Consultant')}</p>
                                            <p className="text-text-secondary text-sm mb-3">{t('Specializes in custom door design and architectural integration. 12+ years experience.')}</p>
                                            <div className="flex space-x-3"><a href="tel:+1-555-DESIGN-1" className="text-primary font-medium hover:text-primary-400 transition-colors text-sm">📞 {t('Direct Line')}</a><a href="mailto:michael@medinesteeldoors.com" className="text-secondary font-medium hover:text-secondary-700 transition-colors text-sm">✉️ {t('Email')}</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-card">
                                    <div className="flex items-start space-x-4">
                                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sarah Rodriguez - Installation Coordinator" className="w-16 h-16 rounded-full object-cover" loading="lazy" data-fallback="https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg" onError={handleImageError} />
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold text-text-primary">Sarah Rodriguez</h4>
                                            <p className="text-secondary font-medium mb-2">{t('Installation Coordinator')}</p>
                                            <p className="text-text-secondary text-sm mb-3">{t('Manages installation scheduling and project coordination. Ensures seamless delivery.')}</p>
                                            <div className="flex space-x-3"><a href="tel:+1-555-INSTALL" className="text-primary font-medium hover:text-primary-400 transition-colors text-sm">📞 {t('Direct Line')}</a><a href="mailto:sarah@medinesteeldoors.com" className="text-secondary font-medium hover:text-secondary-700 transition-colors text-sm">✉️ {t('Email')}</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-card">
                                    <div className="flex items-start space-x-4">
                                        <img src="https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg" alt="David Thompson - Customer Service Manager" className="w-16 h-16 rounded-full object-cover" loading="lazy" data-fallback="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop" onError={handleImageError} />
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold text-text-primary">David Thompson</h4>
                                            <p className="text-secondary font-medium mb-2">{t('Customer Service Manager')}</p>
                                            <p className="text-text-secondary text-sm mb-3">{t('Handles support requests, warranty issues, and customer satisfaction. Always here to help.')}</p>
                                            <div className="flex space-x-3"><a href="tel:+1-555-SUPPORT" className="text-primary font-medium hover:text-primary-400 transition-colors text-sm">📞 {t('Direct Line')}</a><a href="mailto:david@medinesteeldoors.com" className="text-secondary font-medium hover:text-secondary-700 transition-colors text-sm">✉️ {t('Email')}</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 p-6 bg-white rounded-xl shadow-card">
                                <h4 className="font-semibold text-text-primary mb-4">{t('Follow Our Work')}</h4>
                                <div className="flex space-x-4">
                                    <a href="javascript:void(0)" className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg><span className="text-sm">{t('Latest Projects')}</span></a>
                                    <a href="javascript:void(0)" className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg><span className="text-sm">{t('Behind the Scenes')}</span></a>
                                    <a href="javascript:void(0)" className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg><span className="text-sm">{t('Professional Network')}</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Response Time Commitments */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-text-primary mb-4">{t('Our Service Commitments')}</h3>
                        <p className="text-xl text-text-secondary">{t('Professional response times you can count on')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6 bg-accent-50 rounded-xl border border-accent-100"><div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg></div><h4 className="font-bold text-text-primary mb-2">{t('Emergency')}</h4><div className="text-2xl font-bold text-accent mb-1">&lt; 2 {t('Hours')}</div><p className="text-sm text-text-secondary">{t('Urgent security issues')}</p></div>
                        <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100"><div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zm-6 4a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z" /></svg></div><h4 className="font-bold text-text-primary mb-2">{t('Consultation')}</h4><div className="text-2xl font-bold text-primary-500 mb-1">{t('Same Day')}</div><p className="text-sm text-text-secondary">{t('Design appointments')}</p></div>
                        <div className="text-center p-6 bg-secondary-50 rounded-xl border border-secondary-100"><div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" /></svg></div><h4 className="font-bold text-text-primary mb-2">{t('Technical')}</h4><div className="text-2xl font-bold text-secondary mb-1">4-6 {t('Hours')}</div><p className="text-sm text-text-secondary">{t('Support requests')}</p></div>
                        <div className="text-center p-6 bg-surface rounded-xl border border-border"><div className="w-12 h-12 bg-text-secondary rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div><h4 className="font-bold text-text-primary mb-2">{t('General')}</h4><div className="text-2xl font-bold text-text-secondary mb-1">24 {t('Hours')}</div><p className="text-sm text-text-secondary">{t('Email inquiries')}</p></div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Emergency Form Modal */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden" id="emergency-modal">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-text-primary">{t('Emergency Service Request')}</h3>
                            <button className="text-gray-400 hover:text-gray-600" onClick={closeEmergencyForm}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div><label className="block text-sm font-medium text-text-primary mb-2">{t('Emergency Type')} *</label><select className="input-field" required><option value="">{t('Select emergency type')}</option><option value="door-failure">{t('Door Won\'t Open/Close')}</option><option value="lock-failure">{t('Lock Malfunction')}</option><option value="security-breach">{t('Security Breach')}</option><option value="fire-door-issue">{t('Fire Door Problem')}</option><option value="other">{t('Other Emergency')}</option></select></div>
                            <div><label className="block text-sm font-medium text-text-primary mb-2">{t('Your Name')} *</label><input type="text" className="input-field" required /></div>
                            <div><label className="block text-sm font-medium text-text-primary mb-2">{t('Phone Number')} *</label><input type="tel" className="input-field" required /></div>
                            <div><label className="block text-sm font-medium text-text-primary mb-2">{t('Location Address')} *</label><textarea className="input-field" rows="2" required></textarea></div>
                            <div><label className="block text-sm font-medium text-text-primary mb-2">{t('Brief Description')} *</label><textarea className="input-field" rows="3" required placeholder="Describe the emergency situation..."></textarea></div>
                            <div className="flex space-x-3"><button type="submit" className="btn-accent flex-1">{t('Submit Emergency Request')}</button><a href="tel:+1-555-DOORS-24" className="btn-primary flex-1 text-center">{t('Call Now')}</a></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
