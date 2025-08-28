import "../../css/main.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Reviews from "@/Components/StudentReviews";
import Faq from "@/Components/Faq";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const { t } = useTranslation();
    const { app_url } = usePage().props;

    const showAllCategories = async () => {
        try {
            const response = await axios.get(`${app_url}/api/categories/list`);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const showAllProducts = async () => {
        try {
            const response = await axios.get(`${app_url}/api/products`);
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showAllProducts();
        showAllCategories();
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title key="title">
                    {t(
                        "Medine Steel Doors - Premium Door Installation Services"
                    )}
                </title>
                <meta
                    key="desc"
                    name="description"
                    content={t(
                        "Medine Steel Doors offers premium door installation services, combining security, style, and durability. Specializing in steel doors, we provide high-quality solutions for homes and businesses."
                    )}
                />
                <meta
                    key="ogtitle"
                    property="og:title"
                    content={t(
                        "Medine Steel Doors - Premium Door Installation Services"
                    )}
                />
                <meta
                    key="ogdesc"
                    property="og:description"
                    content={t(
                        "Medine Steel Doors offers premium door installation services, combining security, style, and durability. Specializing in steel doors, we provide high-quality solutions for homes and businesses."
                    )}
                />
                <meta
                    key="ogimage"
                    property="og:image"
                    content={`${app_url}/icon.jpeg`}
                />
                <meta key="ogurl" property="og:url" content={app_url} />
                <meta
                    key="keywords"
                    name="keywords"
                    content={t(
                        "steel doors, door installation, security doors, modern doors, durable doors, home improvement, Medine Steel Doors"
                    )}
                />
            </Head>

            <div className="font-sans bg-gray-50 mt-10">
                {/* Hero Section */}
                <section className="bg-green-700 text-white py-20 px-4">
                    <div className="container mx-auto flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                {t("Premium Door Installation Services")}
                            </h1>
                            <p className="text-xl mb-8">
                                {t(
                                    "Enhancing homes with quality doors that combine security, style, and durability."
                                )}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/905380833252"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    {t("get_free_estimate")}
                                </a>
                                <Link
                                    href="/portfolio"
                                    className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    {t("view_our_work")}
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                                alt={t("Modern door installation")}
                                className="rounded-lg shadow-2xl max-w-full h-auto"
                            />
                        </div>
                    </div>
                </section>

                {/* About Us */}
                <section className="py-16 px-4 bg-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {t("About Our Company")}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="md:w-1/2">
                                <img
                                    src="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                                    alt={t("Our team")}
                                    className="rounded-lg shadow-lg w-full"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h3 className="text-2xl font-semibold mb-4 text-green-700">
                                    {t(
                                        "20+ Years of Excellence in Door Installation"
                                    )}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t(
                                        "Founded in 2003, we've grown from a small local business to the region's leading door installation specialists. Our team of certified professionals combines technical expertise with an eye for design to deliver exceptional results."
                                    )}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span className="text-gray-700">
                                            {t(
                                                "Licensed and insured professionals"
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span className="text-gray-700">
                                            {t(
                                                "Over 5,000 successful installations"
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span className="text-gray-700">
                                            {t(
                                                "Manufacturer-trained technicians"
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span className="text-gray-700">
                                            {t(
                                                "Sustainable and eco-friendly practices"
                                            )}
                                        </span>
                                    </li>
                                </ul>
                                <a
                                    href="https://wa.me/905380833252"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                                >
                                    {t("Learn More About Us")}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Types of Doors */}
                <section className="py-16 px-4 bg-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {t("Types of Doors We Install")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="door-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition duration-300"
                                >
                                    <img
                                        src={`${app_url}/storage/${category.image}`}
                                        alt={category.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-5">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {category.description}
                                        </p>
                                        <Link
                                            href="/portfolio"
                                            className="text-green-600 font-medium hover:text-green-800"
                                        >
                                            {t("View Options →")}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link
                                href="/portfolio"
                                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                            >
                                {t("View All Door Types")}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section className="py-16 px-4 bg-gray-100">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {t("Our Recent Door Installation Projects")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="relative group overflow-hidden rounded-lg shadow-md"
                                >
                                    <img
                                        src={`${app_url}/storage/${product.image}`}
                                        alt={product.title}
                                        className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-300">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link
                                href="/portfolio"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                            >
                                {t("View Full Portfolio")}
                            </Link>
                        </div>
                    </div>
                </section>

                <Reviews />
                <Faq />
            </div>
            <Footer />
        </>
    );
}
