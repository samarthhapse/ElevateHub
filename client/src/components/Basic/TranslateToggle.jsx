import React, { useState, useEffect } from 'react';
import translateIcon from "../../assets/translate-icon.png"

const TranslateToggle = () => {
  const [showTranslate, setShowTranslate] = useState(false);

  const toggleTranslate = () => {
    setShowTranslate(!showTranslate);
  };

  useEffect(() => {
    if (showTranslate) {
      const script = document.createElement('script');
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      };
    }
  }, [showTranslate]);

  return (
    <div>
      <button onClick={toggleTranslate} style={{ position: 'fixed', top: '50px', right: '10px', zIndex: 1001 }}>
        <img src={translateIcon} alt="Translate" style={{ width: '32px', height: '32px' }} />
      </button>
      {showTranslate && (
        <div id="translate-container" style={{
          position: 'fixed',
          top: '50px',
          right: '10px',
          background: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          fontFamily: "'Mukta', sans-serif",
          width: '199px'
        }}>
          <div id="google_translate_element"></div>
        </div>
      )}
    </div>
  );
};

export default TranslateToggle;
