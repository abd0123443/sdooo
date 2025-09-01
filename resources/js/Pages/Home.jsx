import "../../css/main.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Reviews from "@/Components/StudentReviews";
import Faq from "@/Components/Faq";
import axios from "axios";
import { useTranslation } from "react-i18next";
import FloatingButtons from "@/Components/FloatingButtons";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const { t } = useTranslation();
    const { app_url } = usePage().props;
    const [modalImage, setModalImage] = useState(null);

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
                                <button
                                    onClick={() =>{
                                        document.getElementById("ourWork").scrollIntoView({
                                            behavior:"smooth"
                                        })
                                    }}
                                    className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    {t("view_our_work")}
                                </button>
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
                {/* Our Services */}
                <section className="py-16 px-4 bg-gray-100">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {t("Our Comprehensive Services")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


                            {/* Service 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                <div className="text-green-600 text-4xl mb-4">
                                    <i className="fas fa-building"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Commercial Door Solutions")}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {t(
                                        "Secure and durable door installations for businesses, offices, and commercial properties."
                                    )}
                                </p>
                                <a
                                    href="https://wa.me/905380833252"
                                    className="text-green-600 font-medium hover:text-green-800"
                                >
                                    {t("Learn More →")}
                                </a>
                            </div>

                            {/* Service 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                <div className="text-green-600 text-4xl mb-4">
                                    <i className="fas fa-tools"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Door Repair & Maintenance")}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {t(
                                        "Professional repair services for sticking, squeaking, or damaged doors to restore functionality."
                                    )}
                                </p>
                                <a
                                    href="https://wa.me/905380833252"
                                    className="text-green-600 font-medium hover:text-green-800"
                                >
                                    {t("Learn More →")}
                                </a>
                            </div>

                            {/* Service 4 */}
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                <div className="text-green-600 text-4xl mb-4">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Security Door Installation")}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {t(
                                        "High-security door solutions including steel doors, reinforced frames, and advanced locking systems."
                                    )}
                                </p>
                                <a
                                    href="https://wa.me/905380833252"
                                    className="text-green-600 font-medium hover:text-green-800"
                                >
                                    {t("Learn More →")}
                                </a>
                            </div>

                            {/* Service 5 */}
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                <div className="text-green-600 text-4xl mb-4">
                                    <i className="fas fa-paint-roller"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Door Finishing & Customization")}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {t(
                                        "Custom staining, painting, and hardware selection to match your home's aesthetic."
                                    )}
                                </p>
                                <a
                                    href="https://wa.me/905380833252"
                                    className="text-green-600 font-medium hover:text-green-800"
                                >
                                    {t("Learn More →")}
                                </a>
                            </div>

                            {/* Service 6 */}
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                <div className="text-green-600 text-4xl mb-4">
                                    <i className="fas fa-undo-alt"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Automatic Door Systems")}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {t(
                                        "Installation of sliding, swinging, and revolving automatic doors for accessibility and convenience."
                                    )}
                                </p>
                                <a
                                    href="https://wa.me/905380833252"
                                    className="text-green-600 font-medium hover:text-green-800"
                                >
                                    {t("Learn More →")}
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
                            {categories.map((category) => {
                                const getCategoryLink = (id) => {
                                    switch (id) {
                                        case 3:
                                            return "/Building_Entrance_Door";
                                        case 5 :
                                            return "/Fire_Door";
                                        case 2:
                                            return "/Villa_Doors";
                                        case 4:
                                            return "/Steel_Door";
                                        default:
                                            return "/";
                                    }
                                };

                                return (
                                    <Link
                                        href={getCategoryLink(category.id)}
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
                                            <button
                                                className="text-green-600 font-medium hover:text-green-800"
                                            >
                                                {t("View Options →")}
                                            </button>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="text-center mt-10">
                            <a
                                target="_blank"
                                href="https://wa.me/905380833252"
                                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                            >
                                {t("View All Door Types")}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Door Installation Process */}
                <section className="py-16 px-4 bg-gray-100">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {t("Our Door Installation Process")}
                        </h2>

                        <div className="relative">
                            {/* Vertical timeline line */}
                            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-600"></div>

                            {/* Steps */}
                            {[1, 2, 3, 4, 5].map((step) => {
                                const isEven = step % 2 === 0;
                                const titles = [
                                    "Consultation & Measurement",
                                    "Door Selection",
                                    "Preparation & Removal",
                                    "Professional Installation",
                                    "Final Inspection",
                                ];
                                const descriptions = [
                                    "Our expert will visit your property to assess your needs, take precise measurements, and discuss design options.",
                                    "Choose from our extensive catalog of premium doors, or request a custom design tailored to your specifications.",
                                    "We carefully remove your old door, prepare the opening, and ensure proper alignment for the new installation.",
                                    "Our certified technicians install your new door with precision, ensuring perfect operation and weatherproofing.",
                                    "We conduct a thorough quality check and walk you through the features and maintenance of your new door.",
                                ];

                                return (
                                    <div
                                        key={step}
                                        className={`mb-12 flex flex-col lg:flex-row items-center lg:items-start ${
                                            isEven ? "lg:flex-row-reverse" : ""
                                        }`}
                                    >
                                        {/* Text */}
                                        <div
                                            className={`lg:w-1/2 px-4 lg:px-8 mb-6 lg:mb-0 text-${
                                                isEven ? "left" : "right"
                                            }`}
                                        >
                                            <h3 className="text-2xl font-semibold mb-3 text-green-700">
                                                {t(
                                                    `${step}. ${
                                                        titles[step - 1]
                                                    }`
                                                )}
                                            </h3>
                                            <p className="text-gray-600">
                                                {t(descriptions[step - 1])}
                                            </p>
                                        </div>

                                        {/* Circle number */}
                                        <div className="lg:w-1/2 flex justify-center lg:justify-center">
                                            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-green-600">
                                                <span className="text-xl font-bold text-gray-800">
                                                    {step}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 px-4 gradient-bg text-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {t("Why Choose Our Door Installation Services")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Reason 1 */}
                            <div className="text-center p-6 bg-black bg-opacity-20 rounded-lg">
                                <div className="text-5xl mb-4 text-green-400">
                                    <i className="fas fa-award"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Certified Experts")}
                                </h3>
                                <p className="text-gray-300">
                                    {t(
                                        "Our installers are factory-trained and certified by leading door manufacturers."
                                    )}
                                </p>
                            </div>

                            {/* Reason 2 */}
                            <div className="text-center p-6 bg-black bg-opacity-20 rounded-lg">
                                <div className="text-5xl mb-4 text-green-400">
                                    <i className="fas fa-calendar-check"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("On-Time Completion")}
                                </h3>
                                <p className="text-gray-300">
                                    {t(
                                        "We respect your time with guaranteed project completion dates."
                                    )}
                                </p>
                            </div>

                            {/* Reason 3 */}
                            <div className="text-center p-6 bg-black bg-opacity-20 rounded-lg">
                                <div className="text-5xl mb-4 text-green-400">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Lifetime Warranty")}
                                </h3>
                                <p className="text-gray-300">
                                    {t(
                                        "We stand behind our work with industry-leading warranty coverage."
                                    )}
                                </p>
                            </div>

                            {/* Reason 4 */}
                            <div className="text-center p-6 bg-black bg-opacity-20 rounded-lg">
                                <div className="text-5xl mb-4 text-green-400">
                                    <i className="fas fa-dollar-sign"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t("Price Match")}
                                </h3>
                                <p className="text-gray-300">
                                    {t(
                                        "We'll match any competitor's price for identical products and services."
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center bg-black bg-opacity-30 rounded-full py-3 px-6">
                                <i className="fas fa-phone-alt text-green-400 mr-3"></i>
                                <div>
                                    <p className="text-sm text-gray-300">
                                        {t("Call us for a free consultation")}
                                    </p>
                                    <p className="text-xl font-bold">
                                        {t("+90 539 695 4204")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products */}
            <section id="ourWork" className="py-16 px-4 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        {t("Our Recent Door Installation Projects")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
                                onClick={() => setModalImage(`${app_url}/storage/${product.image}`)}
                            >
                                <img
                                    src={`${app_url}/storage/${product.image}`}
                                    alt={product.title}
                                    className="w-full h-[450px] object-contain transition duration-500 group-hover:scale-105"
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
                        <a
                            target="_blank"
                            href="https://wa.me/905380833252"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                        >
                            {t("View Full Portfolio")}
                        </a>
                    </div>
                </div>

                {/* Modal */}
                {modalImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="relative">
                            {/* زر الإغلاق */}
                            <button
                                onClick={() => setModalImage(null)}
                                className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
                            >
                                &times;
                            </button>
                            <img
                                src={modalImage}
                                alt="Large view"
                                className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                )}
            </section>


                <Reviews />
                <Faq />
            </div>
            <Footer />
        </>
    );
}
