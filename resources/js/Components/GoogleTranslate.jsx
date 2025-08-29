import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // إضافة عنصر ترجمة جوجل
    const addGoogleTranslateElement = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,ar,tr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');

        // إخفاء واجهة جوجل
        setTimeout(() => {
          const frame = document.querySelector('.goog-te-banner-frame');
          if (frame) frame.style.display = 'none';

          const gadget = document.querySelector('.goog-te-gadget');
          if (gadget) gadget.style.color = 'transparent';
        }, 100);
      }
    };

    // تحميل مكتبة ترجمة جوجل إذا لم تكن محملة
    if (!window.google || !window.google.translate) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      window.googleTranslateElementInit = addGoogleTranslateElement;
    } else {
      addGoogleTranslateElement();
    }

    return () => {
      // تنظيف عند إلغاء التثبيت
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default GoogleTranslate;
