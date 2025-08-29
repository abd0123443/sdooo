import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
     
      <a
        href="https://wa.me/905380833252"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors duration-300"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>


      <a
        href="tel:+905380833252"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        <FaPhoneAlt className="text-white text-xl" />
      </a>
    </div>
  );
}
