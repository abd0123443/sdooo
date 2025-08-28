import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                className={`w-full flex justify-between items-center p-5 text-left transition duration-300 ${isOpen ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
                <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'} text-green-600`}></i>
            </button>
            {isOpen && (
                <div className="p-5 bg-white text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const Faq = () => {
    const { t } = useTranslation();

    const faqData = [
        {
            question: t('how long does a typical door installation take'),
            answer: t('most standard door installations can be completed in 2-4 hours however the exact time depends on several factors including the type of door the condition of the existing frame and any custom modifications required our team will provide a more accurate timeline during your free consultation'),
        },
        {
            question: t('whats included in your installation service'),
            answer: t('our full installation service includes removal and disposal of your old door preparation of the door opening installation of the new door with proper shimming and alignment hardware installation weatherstripping and a final quality inspection we also clean up the work area thoroughly before we leave'),
        },
        {
            question: t('do i need to be home during the installation'),
            answer: t('for residential installations we recommend that an adult be present to approve the final installation and to secure the property after we leave for commercial properties we can work with your building manager or security team if needed'),
        },
        {
            question: t('what types of payment do you accept'),
            answer: t('we accept all major credit cards checks and cash for larger projects we also offer financing options with approved credit a deposit is typically required when ordering custom doors with the balance due upon completion of the installation'),
        },
        {
            question: t('how do i maintain my new doors'),
            answer: t('maintenance requirements vary by door material we provide specific care instructions for each door we install generally wood doors may need periodic refinishing while fiberglass and steel doors require minimal maintenance just occasional cleaning and lubrication of moving parts all doors benefit from seasonal checks of weatherstripping and hardware'),
        },
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{t('frequently asked questions')}</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <p className="text-gray-600 mb-4">{t("have more questions we're happy to help")}</p>
                    <a  href="https://wa.me/905380833252" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                        {t('contact our team')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Faq;
