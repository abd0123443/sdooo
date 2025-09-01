import React, { useEffect, useRef } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Head, usePage } from "@inertiajs/react";
import "../../css/contact.css";
import {
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    MapIcon,
} from "@heroicons/react/24/solid";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const animatedElements = useRef([]);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            animatedElements.current.forEach((element) => {
                if (element) {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add("animate");
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title key="title">{t("contact")}</title>
            </Head>

            <header className="contact-header justify-center items-center flex mt-10">
                <div className="container  ">
                    <h1>{t("Contact Us")}</h1>
                </div>
            </header>

            <main className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        <div
                            className="contact-info animated"
                            ref={(el) => (animatedElements.current[0] = el)}
                        >
                            <div className="info-item">
                                <div className="info-icon">
                                    <PhoneIcon className="h-6 w-6" />
                                </div>
                                <div className="info-content">
                                    <h3>{t("phone whatsapp ")}</h3>
                                    <p>
                                        {t("phone main")}:{" "}
                                        <strong>+90 539 695 4204</strong>
                                        <br />
                                        {t("phone whatsapp")}:{" "}
                                        <strong>+90 538 083 3252</strong>
                                        <br />
                                        {t("available 24 7 emergencies")}
                                    </p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">
                                    <MapPinIcon className="h-6 w-6" />
                                </div>
                                <div className="info-content">
                                    <h3>
                                        {t(
                                            "Mecidiye, Fatih Blv. No:444, 34930 Sultanbeyli/İstanbul, Türkiye(Mecidiye, Fatih Blv. No:444, 34930 Sultanbeyli/İstanbul, Türkiye)"
                                        )}
                                    </h3>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">
                                    <ClockIcon className="h-6 w-6" />
                                </div>
                                <div className="info-content">
                                    <h3>{t("business hours title")}</h3>
                                    <ul className="hours-list">
                                        <li>
                                            <span>{t("monday friday")}</span>{" "}
                                            <span>8:00 AM - 6:00 PM</span>
                                        </li>
                                        <li>
                                            <span>{t("saturday")}</span>{" "}
                                            <span>9:00 AM - 4:00 PM</span>
                                        </li>
                                        <li>
                                            <span>{t("sunday")}</span>{" "}
                                            <span>
                                                {t("emergency services only")}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="emergency-contact animated"
                        ref={(el) => (animatedElements.current[2] = el)}
                    >
                        <div className="emergency-icon">
                            <ExclamationTriangleIcon className="h-12 w-12 mx-auto" />
                        </div>

                        <div className="emergency-phone">
                            <PhoneIcon className="h-8 w-8 inline-block mr-2" />{" "}
                            +90 539 695 4204
                        </div>
                        <a href="https://wa.me/905380833252" className="btn">
                            {t("call now button")}
                        </a>
                    </div>
                </div>
            </main>

            <section className="map-section">
                <div className="container">
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "30px",
                            fontSize: "2rem",
                            color: "var(--black)",
                        }}
                    >
                        {t("our location title")}
                    </h2>
                    <div
                        className="map-container animated"
                        ref={(el) => (animatedElements.current[3] = el)}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12042.668689941243!2d29.2947667!3d40.9593578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad093945e97b5%3A0x618685e579189766!2sSultanbeyli%2Fİstanbul!5e0!3m2!1sen!2str!4v1693500000000"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: "12px" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            <section className="social-section">
                <div className="container">
                    <h2 className="social-title">{t("follow us title")}</h2>
                    <div className="social-links flex gap-4 justify-center">
                        <a
                            href="https://www.facebook.com/share/1LokMm27Zu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link animated"
                            ref={(el) => (animatedElements.current[4] = el)}
                        >
                            <FaFacebookF className="h-6 w-6 text-blue-600" />
                        </a>
                        <a
                            href="https://www.instagram.com/medinecelikapi?igsh=NWQ4anVsNW5hbWds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link animated"
                            ref={(el) => (animatedElements.current[5] = el)}
                        >
                            <FaInstagram className="h-6 w-6 text-pink-500" />
                        </a>
                        <a
                            href="mailto:medinecelikkapi@gmail.com"
                            className="social-link animated"
                            ref={(el) => (animatedElements.current[6] = el)}
                        >
                            <FaEnvelope className="h-6 w-6 text-gray-800" />
                        </a>
                        <a
                            href="https://wa.me/905380833252"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link animated"
                            ref={(el) => (animatedElements.current[7] = el)}
                        >
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
