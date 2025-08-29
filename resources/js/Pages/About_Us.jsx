import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState, useEffect } from "react";
import {  Link, usePage } from "@inertiajs/react";
const About_Us = () => {
    const { t } = useTranslation();
    const [about, setAbout] = useState(null);
    const { app_url } = usePage().props;

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get(`${app_url}/api/abouts`);

                setAbout( res.data.aboutes[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAbout();
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title>{t('About Us')}</title>
            </Head>

<main className="max-w-6xl mx-auto p-6 my-32">
    <h1 className="text-3xl font-bold mb-6 text-center">{t('About Us')}</h1>

    {!about ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
            {t('No About information available.')}
        </p>
    ) : (
        <div className="bg-green-100  rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-start gap-6">
            {about?.image && (
                <img
                    src={`${app_url}/storage/${about.image}`}
                    alt="about"
                    className="w-full md:w-1/3 h-64 object-cover rounded-lg"
                />
            )}
            <div className="flex-1 break-words">
                <p className="text-black dark:text-black text-lg  whitespace-pre-line">
                    {about?.description}
                </p>
            </div>
        </div>
    )}
</main>

            <Footer />
        </>
    );
};

export default About_Us;
