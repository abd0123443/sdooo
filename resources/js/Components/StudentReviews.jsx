import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Reviews() {
    const { app_url } = usePage().props;
    const [transformations, setTransformations] = useState([]);

    const showAllTransformations = async () => {
        try {
            const response = await axios.get(`${app_url}/api/transformations`);
            setTransformations(response.data.transformations);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showAllTransformations();
    }, []);

    // صور ثابتة (رجال)
    const staticImages = [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/men/45.jpg",
        "https://randomuser.me/api/portraits/men/76.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg",
        "https://randomuser.me/api/portraits/men/54.jpg",
    ];

    return (
        <section dir="ltr" className="py-24 bg-green-50 text-gray-800">
            <div className="container mx-auto px-6">
                <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    What Our Customers Say
                </h3>

                {transformations.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={20}
                        slidesPerView={"auto"}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        loop={transformations.length > 2}
                        navigation={true}
                    >
                        {transformations.map((review, index) => (
                            <SwiperSlide
                                key={index}
                                style={{ width: "350px", height: "360px" }}
                            >
                                <div className="testimonial-card bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between">
                                    {/* النجوم ثابتة */}
                                    <div className="flex items-center mb-4 text-yellow-400 text-xl">
                                        ★ ★ ★ ★ ★
                                    </div>

                                    {/* النص */}
                                    <p className="text-gray-600 mb-6">
                                        "{review.description}"
                                    </p>

                                    {/* صورة + اسم */}
                                    <div className="flex items-center mt-auto">
                                        <img
                                            src={staticImages[index % staticImages.length]}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                {review.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {review.work}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center text-gray-500">
                        No reviews available yet.
                    </p>
                )}
            </div>
        </section>
    );
}
