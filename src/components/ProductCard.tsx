import React, { useState, useEffect } from 'react';

interface ProductCardProps {
  nomi: string;
  narxi: number;
  tavsifi: string;
  rasmUrl: string;
  kategoriya: string;
  sotuvda: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  nomi,
  narxi,
  tavsifi,
  rasmUrl,
  kategoriya,
  sotuvda
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
  };

  // Mobil uchun qisqa tavsif
  const getShortDescription = (desc: string) => {
    if (isMobile && desc.length > 30) {
      return desc.substring(0, 30) + '...';
    }
    if (isTablet && desc.length > 50) {
      return desc.substring(0, 50) + '...';
    }
    return desc;
  };

  return (
    <div 
      className={`modern-product-card ${!sotuvda ? 'out-of-stock' : ''} 
        ${isMobile ? 'mobile-card' : ''} ${isTablet ? 'tablet-card' : ''}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
    >
      {/* Badges */}
      <div className="card-badges">
        {!sotuvda && <span className="badge out-of-stock">Sotuvda yo'q</span>}
        {narxi < 5000000 && <span className="badge discount">Chegirma</span>}
        {isHovered && !isMobile && <span className="badge new">Yangi</span>}
      </div>

      {/* Like Button - mobil uchun katta */}
      <button 
        className={`like-button ${isLiked ? 'liked' : ''} ${isMobile ? 'mobile-like' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
      >
        <svg width={isMobile ? 28 : 24} height={isMobile ? 28 : 24} viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>

      {/* Image */}
      <div className="product-image-wrapper">
        <div 
          className="product-image-3d"
          style={{
            transform: !isMobile && isHovered ? 'rotateY(10deg) rotateX(5deg)' : 'none',
          }}
        >
          <img src={rasmUrl} alt={nomi} />
          <div className="image-overlay"></div>
        </div>
      </div>

      {/* Details */}
      <div className="product-details">
        <div className="category-tag">{kategoriya}</div>
        
        <h3 className={`product-name ${isMobile ? 'mobile-product-name' : ''}`}>
          {nomi}
        </h3>
        
        <p className="product-description-modern">
          {getShortDescription(tavsifi)}
        </p>

        {/* Rating - mobil uchun soddaroq */}
        <div className="rating">
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
          <span className="rating-count">({isMobile ? '99+' : '128'})</span>
        </div>

        {/* Price and Quantity */}
        <div className={`price-section ${isMobile ? 'mobile-price-section' : ''}`}>
          <div className="price-wrapper">
            <span className="current-price">{formatPrice(narxi)} so'm</span>
            {narxi < 5000000 && !isMobile && (
              <span className="old-price">{formatPrice(narxi * 1.2)} so'm</span>
            )}
          </div>

          {sotuvda && !isMobile && (
            <div className="quantity-selector">
              <button 
                className="qty-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(Math.max(1, quantity - 1));
                }}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`action-buttons ${isMobile ? 'mobile-actions' : ''}`}>
          <button 
            className="btn btn-primary"
            disabled={!sotuvda}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width={isMobile ? 18 : 20} height={isMobile ? 18 : 20} viewBox="0 0 20 20" fill="currentColor">
              <circle cx="7" cy="17" r="1.5"/>
              <circle cx="15" cy="17" r="1.5"/>
              <path d="M3 3H6L8 12H16L18 6H6"/>
            </svg>
            {isMobile ? (sotuvda ? "Sotib olish" : "Mavjud emas") : (sotuvda ? "Sotib olish" : "Mavjud emas")}
          </button>
          
          {!isMobile && (
            <button className="btn btn-icon" onClick={(e) => e.stopPropagation()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 8C15 10 12 13 10 15C8 13 5 10 5 8C5 5.5 7 4 10 4C13 4 15 5.5 15 8Z" 
                  stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;