import React, { useEffect, useRef } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, usePage } from "@inertiajs/react";
import '../../css/contact.css';
import { PhoneIcon, MapPinIcon, ClockIcon, ExclamationTriangleIcon, MapIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const animatedElements = useRef([]);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            animatedElements.current.forEach(element => {
                if (element) {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('animate');
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title key="title">{t("contact")}</title>
            </Head>

            <header className="contact-header">
                <div className="container">
                    <h1>{t('contact_header_title')}</h1>
                    <p>{t('contact_header_description')}</p>
                </div>
            </header>

            <main className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info animated" ref={el => animatedElements.current[0] = el}>
                            <div className="info-item">
                                <div className="info-icon"><PhoneIcon className="h-6 w-6" /></div>
                                <div className="info-content">
                                    <h3>{t('phone_whatsapp_title')}</h3>
                                    <p>{t('phone_main')}: <strong>(555) 123-4567</strong><br />
                                       {t('phone_whatsapp')}: <strong>(555) 765-4321</strong><br />
                                       {t('available_24_7_emergencies')}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon"><MapPinIcon className="h-6 w-6" /></div>
                                <div className="info-content">
                                    <h3>{t('office_location_title')}</h3>
                                    <p><strong>{t('office_name')}</strong><br />
                                       {t('office_address_line1')}<br />
                                       {t('office_address_line2')}<br />
                                       {t('office_address_line3')}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon"><ClockIcon className="h-6 w-6" /></div>
                                <div className="info-content">
                                    <h3>{t('business_hours_title')}</h3>
                                    <ul className="hours-list">
                                        <li><span>{t('monday_friday')}</span> <span>8:00 AM - 6:00 PM</span></li>
                                        <li><span>{t('saturday')}</span> <span>9:00 AM - 4:00 PM</span></li>
                                        <li><span>{t('sunday')}</span> <span>{t('emergency_services_only')}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="emergency-contact animated" ref={el => animatedElements.current[2] = el}>
                        <div className="emergency-icon"><ExclamationTriangleIcon className="h-12 w-12 mx-auto" /></div>
                        <h2 className="emergency-title">{t('emergency_service_24_7_title')}</h2>
                        <div className="emergency-phone">
                            <PhoneIcon className="h-8 w-8 inline-block mr-2" /> (555) EMERGENCY
                        </div>
                        <p className="emergency-text">{t('emergency_service_description')}</p>
                        <a href="https://wa.me/905380833252" className="btn">{t('call_now_button')}</a>
                    </div>
                </div>
            </main>

            <section className="map-section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', color: 'var(--black)' }}>{t('our_location_title')}</h2>
                    <div className="map-container animated" ref={el => animatedElements.current[3] = el}>
                        <div className="map-placeholder">
                            <MapIcon className="h-12 w-12 mr-4" />
                            <span>{t('interactive_map_location')}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="social-section">
                <div className="container">
                    <h2 className="social-title">{t('follow_us_title')}</h2>
                    <div className="social-links flex gap-4 justify-center">
                        <a href="https://www.facebook.com/share/1LokMm27Zu/" target="_blank" rel="noopener noreferrer" className="social-link animated" ref={el => animatedElements.current[4] = el}>
                            <FaFacebookF className="h-6 w-6 text-blue-600" />
                        </a>
                        <a href="https://www.instagram.com/medinecelikapi?igsh=NWQ4anVsNW5hbWds" target="_blank" rel="noopener noreferrer" className="social-link animated" ref={el => animatedElements.current[5] = el}>
                            <FaInstagram className="h-6 w-6 text-pink-500" />
                        </a>
                        <a href="mailto:medinecelikkapi@gmail.com" className="social-link animated" ref={el => animatedElements.current[6] = el}>
                            <FaEnvelope className="h-6 w-6 text-gray-800" />
                        </a>
                        <a href="https://wa.me/905380833252" target="_blank" rel="noopener noreferrer" className="social-link animated" ref={el => animatedElements.current[7] = el}>
                            <FaWhatsapp className="h-6 w-6 text-green-600" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
