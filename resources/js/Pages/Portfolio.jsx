import { useRef } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Head, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Portfolio = ({ categories }) => {
    const { app_url } = usePage().props;
    const swiperRefs = useRef([]);
    const { t } = useTranslation();

    const handleMouseEnter = (swiper) => {
        if (swiper) {
            swiper.autoplay.stop();
        }
    };

    const handleMouseLeave = (swiper) => {
        if (swiper) {
            swiper.autoplay.start();
        }
    };

    const createSwiperSection = (title, products, index) => (
        <section className="py-16 px-4 bg-white" key={index}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                            {title}
                        </h2>
                </h2>
                <div
                    onMouseEnter={() =>
                        handleMouseEnter(swiperRefs.current[index])
                    }
                    onMouseLeave={() =>
                        handleMouseLeave(swiperRefs.current[index])
                    }
                >
                    <Swiper
                        onSwiper={(swiper) =>
                            (swiperRefs.current[index] = swiper)
                        }
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <img
                                    src={`${app_url}/storage/${product.image}`}
                                    alt={product.title}
                                    className="rounded-lg shadow-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );

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
            <div className="font-sans bg-gray-50 mt-10">
                {categories.map((category, index) =>
                    createSwiperSection(category.name, category.products, index)
                )}
            </div>
            <Footer />
        </>
    );
};

export default Portfolio;
