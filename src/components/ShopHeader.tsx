import React, { useEffect, useState } from 'react';

interface ShopHeaderProps {
  dokonNomi: string;
  slogan: string;
  mahsulotlarSoni: number;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ dokonNomi, slogan, mahsulotlarSoni }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  return (
    <div className={`shop-header-modern ${!isVisible ? 'header-shrink' : ''}`}>
      {/* Background */}
      <div className="header-background">
        <div className="gradient-sphere"></div>
        {!isMobile && (
          <div className="floating-elements">
            <div className="float-element"></div>
            <div className="float-element"></div>
            <div className="float-element"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`header-content-wrapper ${isMobile ? 'mobile-content' : ''}`}>
        {/* Badge */}
        <div className="header-badge">
          <span className="live-badge">🔴 LIVE</span>
          {!isMobile && (
            <span className="time-display">
              {currentTime.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Title - mobil uchun qisqartirilgan */}
        <h1 className={`animated-title ${isMobile ? 'mobile-title' : ''}`}>
          {isMobile ? (
            dokonNomi
          ) : (
            dokonNomi.split('').map((char, index) => (
              <span 
                key={index} 
                className="title-char"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))
          )}
        </h1>

        {/* Slogan - mobil uchun qisqa */}
        <p className={`slogan-text ${isMobile ? 'mobile-slogan' : ''}`}>
          {isMobile ? "Eng yaxshi narxlar" : slogan}
        </p>

        {/* Stats - mobil uchun qatorga joylashgan */}
        <div className={`stats-container ${isMobile ? 'mobile-stats' : ''} ${isTablet ? 'tablet-stats' : ''}`}>
          <div className="stat-item">
            <span className="stat-number">{mahsulotlarSoni}+</span>
            <span className="stat-label">{isMobile ? 'Mahsulot' : 'Mahsulotlar'}</span>
          </div>
          {!isMobile && (
            <>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Qo'llab-quvvatlash</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">⭐ 4.8</span>
                <span className="stat-label">Reyting</span>
              </div>
            </>
          )}
        </div>

        {/* Search - mobil uchun kichikroq */}
        <div className={`search-container ${isMobile ? 'mobile-search' : ''}`}>
          <input 
            type="text" 
            placeholder={isMobile ? "Qidirish..." : "Mahsulot qidirish..."} 
            className="search-input"
          />
          <button className="search-button">
            <svg width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14L19 19" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Decoration - mobil uchun kamroq */}
      {!isMobile && (
        <div className="header-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      )}
    </div>
  );
};

export default ShopHeader;