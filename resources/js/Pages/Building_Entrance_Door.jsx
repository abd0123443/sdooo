import { useRef } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Head, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {  Link, } from "@inertiajs/react";
import axios from "axios";
import { useState, useEffect } from "react";

const Building_Entrance_Door = () => {
    const { app_url } = usePage().props;
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
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

    }, []);

    return (
        <>
            <Header />
            <Head>
                <title key="title">
                    {t(
                        "Medine Steel Doors - Our Portfolio of Steel Door Installations"
                    )}
                </title>
                <meta
                    key="desc"
                    name="description"
                    content={t(
                        "Explore the extensive portfolio of Medine Steel Doors, showcasing our high-quality steel door installations for various projects. View our completed works and find inspiration for your next door."
                    )}
                />
                <meta
                    key="ogtitle"
                    property="og:title"
                    content={t(
                        "Medine Steel Doors - Our Portfolio of Steel Door Installations"
                    )}
                />
                <meta
                    key="ogdesc"
                    property="og:description"
                    content={t(
                        "Explore the extensive portfolio of Medine Steel Doors, showcasing our high-quality steel door installations for various projects. View our completed works and find inspiration for your next door."
                    )}
                />
                <meta
                    key="ogimage"
                    property="og:image"
                    content={`${app_url}/icon.jpeg`}
                />
                <meta
                    key="ogurl"
                    property="og:url"
                    content={`${app_url}/portfolio`}
                />
                <meta
                    key="keywords"
                    name="keywords"
                    content={t(
                        "steel door portfolio, door installation projects, completed door works, security door gallery, modern door designs, Medine Steel Doors projects"
                    )}
                />
            </Head>
                <section className="py-16 px-4 bg-gray-100 mt-10">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {t("Building Entrance Door")}
                        </h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products
        .filter((product) => product.category.name === "Building Entrance Door")
        .map((product) => (
            <div
                key={product.id}
                className="relative group overflow-hidden rounded-lg shadow-md"
            >
                <img
                    src={`${app_url}/storage/${product.image}`}
                    alt={product.title}
                    className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-lg font-bold text-white mb-1">
                        {product.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                        {product.description}
                    </p>
                </div>
            </div>
        ))}
</div>

                    </div>
                </section>
            <Footer />
        </>
    );
};

export default Building_Entrance_Door;
