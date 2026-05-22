import React, { useState, useEffect } from 'react';

interface ProductLayoutProps {
  children: React.ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="modern-layout">
      {/* Header */}
      <header className="modern-header">
        <div className="header-container">
          {/* Logo - har doim ko'rinadi */}
          <div className="logo-section">
            <div className="logo-icon">
              <svg width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} viewBox="0 0 40 40" fill="none">
                <path d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="5" fill="currentColor"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="brand-name">SHOP</span>
              <span className="brand-suffix">.uz</span>
            </div>
          </div>

          {/* Desktop navigation - faqat desktopda */}
          {!isMobile && !isTablet && (
            <nav className="desktop-nav">
              {['Bosh sahifa', 'Mahsulotlar', 'Chegirmalar', 'Biz haqimizda'].map((item) => (
                <a key={item} href="/" className="nav-link">
                  {item}
                  <span className="nav-indicator"></span>
                </a>
              ))}
            </nav>
          )}

          {/* Tablet navigation - qisqartirilgan */}
          {isTablet && (
            <nav className="tablet-nav">
              {['Asosiy', 'Mahsulotlar', 'Chegirma'].map((item) => (
                <a key={item} href="/" className="tablet-nav-link">{item}</a>
              ))}
            </nav>
          )}

          {/* Header Actions */}
          <div className="header-actions">
            <button className="action-btn search-btn">
              <svg width={isMobile ? 18 : 20} height={isMobile ? 18 : 20} viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 14L19 19" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <button className="action-btn cart-btn">
              <svg width={isMobile ? 18 : 20} height={isMobile ? 18 : 20} viewBox="0 0 20 20" fill="none">
                <circle cx="7" cy="17" r="1.5" fill="currentColor"/>
                <circle cx="15" cy="17" r="1.5" fill="currentColor"/>
                <path d="M3 3H6L8 12H16L18 6H6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="cart-badge">3</span>
            </button>

            {/* Mobile/Tablet menu button */}
            {(isMobile || isTablet) && (
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        {(isMobile || isTablet) && (
          <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
            {['Bosh sahifa', 'Mahsulotlar', 'Chegirmalar', 'Biz haqimizda', "Aloqa"].map((item) => (
              <a key={item} href="/" className="mobile-nav-link">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="modern-main">
        <div className={`main-container ${isMobile ? 'mobile-container' : ''} ${isTablet ? 'tablet-container' : ''}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50 C300,100 600,0 1440,50 L1440,100 L0,100 Z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className={`footer-content ${isMobile ? 'mobile-footer' : ''}`}>
          <div className={`footer-grid ${isMobile ? 'mobile-grid' : ''} ${isTablet ? 'tablet-grid' : ''}`}>
            {/* About Section */}
            <div className="footer-section">
              <h3>SHOP.uz</h3>
              <p className="footer-description">
                {isMobile ? 'Eng zamonaviy mahsulotlar' : 'Eng zamonaviy va sifatli mahsulotlar eng qulay narxlarda'}
              </p>
              <div className="social-links">
                {['facebook', 'instagram', 'telegram'].slice(0, isMobile ? 3 : 4).map((social) => (
                  <a key={social} href="/" className={`social-link ${social}`}></a>
                ))}
              </div>
            </div>

            {/* Links - mobil uchun yashiramiz */}
            {!isMobile && (
              <>
                <div className="footer-section">
                  <h4>Ma'lumot</h4>
                  <ul>
                    <li><a href="/">Biz haqimizda</a></li>
                    <li><a href="/">Yetkazib berish</a></li>
                    <li><a href="/">To'lov usullari</a></li>
                  </ul>
                </div>

                <div className="footer-section">
                  <h4>Xizmatlar</h4>
                  <ul>
                    <li><a href="/">Kafolat</a></li>
                    <li><a href="/">Mahsulotni qaytarish</a></li>
                    <li><a href="/">Bonus dasturi</a></li>
                  </ul>
                </div>
              </>
            )}

            {/* Contact - har doim ko'rinadi */}
            <div className="footer-section">
              <h4>Bog'lanish</h4>
              <ul className="contact-info">
                <li>📞 +998 90 123 45 67</li>
                {!isMobile && <li>✉️ info@shop.uz</li>}
                <li>📍 Toshkent</li>
              </ul>
            </div>
          </div>

          <div className={`footer-bottom ${isMobile ? 'mobile-bottom' : ''}`}>
            <p>© 2024 SHOP.uz</p>
            <div className="payment-methods">
              <span className="payment-icon visa"></span>
              <span className="payment-icon mastercard"></span>
              {!isMobile && <span className="payment-icon payme"></span>}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductLayout;