import React, { useState, useEffect } from 'react';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  discount?: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function App() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [likedProducts, setLikedProducts] = useState<number[]>(() => {
    const saved = localStorage.getItem('likedProducts');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, message: string, type: string}>({
    show: false,
    message: '',
    type: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: 14500000,
      description: "6.7 dyuym Super Retina XDR displey, 256GB xotira, A16 Bionic chip, Dynamic Island, Always-On displey, 48MP kamera",
      image: "https://images.unsplash.com/photo-1678685888221-cda773c3dcdb?w=400",
      category: "Telefonlar",
      inStock: true,
      rating: 4.9,
      discount: 10
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      price: 13500000,
      description: "6.8 dyuym Dynamic AMOLED 2X, 512GB xotira, S-Pen, 200MP kamera, Snapdragon 8 Gen 2",
      image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=400",
      category: "Telefonlar",
      inStock: true,
      rating: 4.8,
      discount: 15
    },
    {
      id: 3,
      name: "MacBook Pro 16 M2",
      price: 32500000,
      description: "16.2 dyuym Liquid Retina XDR, 32GB RAM, 1TB SSD, M2 Max chip, 22 soat batareya",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "Noutbuklar",
      inStock: false,
      rating: 4.9
    },
    {
      id: 4,
      name: "Apple AirPods Max",
      price: 5500000,
      description: "Over-ear, Active Noise Cancellation, Spatial Audio, 20 soat batareya, 5 ta rang",
      image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=400",
      category: "Aksessuarlar",
      inStock: true,
      rating: 4.7,
      discount: 20
    },
    {
      id: 5,
      name: "iPad Pro 12.9",
      price: 12500000,
      description: "12.9 dyuym Liquid Retina XDR, 256GB xotira, M2 chip, 5G, Apple Pencil qo'llab-quvvatlaydi",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      category: "Planshetlar",
      inStock: true,
      rating: 4.8
    },
    {
      id: 6,
      name: "Apple Watch Ultra",
      price: 8500000,
      description: "49mm titanium korpus, GPS + Cellular, Action button, 100m suv o'tkazmas, 36 soat batareya",
      image: "https://images.unsplash.com/photo-1664472550490-16b2ec364d7c?w=400",
      category: "Aqlli soatlar",
      inStock: true,
      rating: 4.6
    },
    {
      id: 7,
      name: "Sony WH-1000XM5",
      price: 3800000,
      description: "Wireless Noise Cancelling, 30 soat batareya, LDAC, 4 ta mikrofon",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      category: "Aksessuarlar",
      inStock: true,
      rating: 4.8,
      discount: 25
    },
    {
      id: 8,
      name: "Dell XPS 15",
      price: 18500000,
      description: "15.6 dyuym OLED 4K, Intel i9-13900H, 32GB RAM, RTX 4070, 1TB SSD",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
      category: "Noutbuklar",
      inStock: true,
      rating: 4.7
    },
    {
      id: 9,
      name: "Xiaomi 13 Pro",
      price: 8900000,
      description: "6.73 dyuym AMOLED, 256GB xotira, Snapdragon 8 Gen 2, 120W tez quvvatlash",
      image: "https://images.unsplash.com/photo-1675842696555-810b0b2e0a52?w=400",
      category: "Telefonlar",
      inStock: true,
      rating: 4.5,
      discount: 12
    },
    {
      id: 10,
      name: "Google Pixel 7 Pro",
      price: 9900000,
      description: "6.7 dyuym LTPO AMOLED, 256GB xotira, Google Tensor G2, 5 yil yangilanish",
      image: "https://images.unsplash.com/photo-1669191793122-d75a767a8819?w=400",
      category: "Telefonlar",
      inStock: true,
      rating: 4.6,
      discount: 8
    },
    {
      id: 11,
      name: "Logitech MX Master 3S",
      price: 890000,
      description: "Ultra-tek 8K DPI sensori, 3 ta qurilma bilan ishlaydi, USB-C quvvatlash",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400",
      category: "Aksessuarlar",
      inStock: true,
      rating: 4.8,
      discount: 15
    },
    {
      id: 12,
      name: "Samsung 49'' Odyssey G9",
      price: 18900000,
      description: "49 dyuym Dual QHD, 240Hz, 1ms, Quantum Mini-LED, G-Sync",
      image: "https://images.unsplash.com/photo-1616604118346-2f9ab0cef0d6?w=400",
      category: "Monitorlar",
      inStock: true,
      rating: 4.9,
      discount: 10
    }
  ];

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount / 100);
  };

  const filteredProducts = products
    .filter(product => {
      const matchFilter = filter === 'all' || product.category === filter;
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });

  const toggleLike = (id: number) => {
    setLikedProducts(prev => {
      const newLiked = prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id];
      showNotification(
        prev.includes(id) ? "Sevimlidan olib tashlandi" : "Sevimlilarga qo'shildi",
        "success"
      );
      return newLiked;
    });
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product.inStock) {
      showNotification("Mahsulot sotuvda mavjud emas!", "error");
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showNotification(`${product.name} savatga yana qo'shildi (+1)`, "success");
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showNotification(`${product.name} savatga qo'shildi!`, "success");
      return [...prev, {
        id: product.id,
        name: product.name,
        price: getDiscountedPrice(product.price, product.discount),
        quantity,
        image: product.image
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showNotification("Mahsulot savatdan olib tashlandi", "info");
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Savat tozalandi", "info");
  };

  const checkout = () => {
    if (cart.length === 0) {
      showNotification("Savat bo'sh!", "error");
      return;
    }
    showNotification(`Jami ${getCartTotal().toLocaleString()} so'm to'lash uchun tayyor!`, "success");
    setTimeout(() => {
      setCart([]);
      setShowCart(false);
    }, 1500);
  };

  return (
    <div className="app">
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">TechStore</span>
          </div>
          
          <div className="nav-links">
            <a href="#" className="nav-link active" onClick={(e) => { e.preventDefault(); setFilter('all'); setSearchTerm(''); }}>Bosh sahifa</a>
            {!isMobile && <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>Mahsulotlar</a>}
            {!isMobile && <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setFilter('all'); setSortBy('discount'); }}>Chegirmalar</a>}
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); }}>Kontakt</a>
          </div>

          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setShowCart(true)}>
              🛒
              {cart.length > 0 && <span className="badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
            </button>
            <button className="icon-btn" onClick={() => showNotification("Profil tez kunda!", "info")}>
              👤
            </button>
            {isMobile && (
              <button className="icon-btn" onClick={() => setShowFilters(!showFilters)}>
                🔍
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🌟 2024-yilda eng ko'p sotilgan</span>
          </div>
          <h1 className="hero-title">
            {isMobile ? "Premium Texnologiya" : "Eng yaxshi texnologiyalar"}
          </h1>
          <p className="hero-subtitle">
            {isMobile ? "Eng sara mahsulotlar arzon narxlarda" : "Eng zamonaviy va sifatli mahsulotlar eng qulay narxlarda. 12 oy kafolat!"}
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">{products.length}+</span>
              <span className="stat-label">Mahsulot</span>
            </div>
            {!isMobile && (
              <>
                <div className="stat">
                  <span className="stat-value">24/7</span>
                  <span className="stat-label">Qo'llab-quvvatlash</span>
                </div>
                <div className="stat">
                  <span className="stat-value">⭐ 4.8</span>
                  <span className="stat-label">O'rtacha reyting</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="filters-section" id="products">
        <div className="filters-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn" onClick={() => setSearchTerm('')}>
              {searchTerm ? '✕' : '🔍'}
            </button>
          </div>

          <div className={`filter-group ${!showFilters && isMobile ? 'hidden' : ''}`}>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? '📱 Barcha kategoriyalar' : cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="default">📊 Standart</option>
              <option value="price-asc">💰 Narxi: arzon ➔ qimmat</option>
              <option value="price-desc">💰 Narxi: qimmat ➔ arzon</option>
              <option value="rating">⭐ Reyting bo'yicha</option>
              <option value="discount">🏷️ Chegirma bo'yicha</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="products-header">
          <h2>Mahsulotlar</h2>
          <p>{filteredProducts.length} ta mahsulot topildi</p>
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => {
            const discountedPrice = getDiscountedPrice(product.price, product.discount);
            return (
              <div key={product.id} className="product-card">
                <div className="product-badges">
                  {!product.inStock && <span className="badge out-stock">Sotuvda yo'q</span>}
                  {product.discount && (
                    <span className="badge discount">-{product.discount}%</span>
                  )}
                  {product.rating >= 4.8 && product.inStock && (
                    <span className="badge top">TOP</span>
                  )}
                </div>
                
                <button 
                  className={`like-btn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                  onClick={() => toggleLike(product.id)}
                >
                  {likedProducts.includes(product.id) ? '❤️' : '🤍'}
                </button>

                <div className="product-image" onClick={() => { setSelectedProduct(product); setShowModal(true); }}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="image-overlay">Tez ko'rish</div>
                </div>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">
                    {isMobile ? product.description.substring(0, 60) + '...' : product.description}
                  </p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="rating-value">({product.rating})</span>
                  </div>

                  <div className="product-price">
                    <span className="current-price">{discountedPrice.toLocaleString()} so'm</span>
                    {product.discount && (
                      <>
                        <span className="old-price">{product.price.toLocaleString()} so'm</span>
                        <span className="saved">Tejov: {(product.price - discountedPrice).toLocaleString()} so'm</span>
                      </>
                    )}
                  </div>

                  <button 
                    className={`buy-btn ${!product.inStock ? 'disabled' : ''}`}
                    disabled={!product.inStock}
                    onClick={() => addToCart(product, 1)}
                  >
                    {product.inStock ? '🛒 Savatga qo\'shish' : '❌ Mavjud emas'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <span>🔍</span>
            <h3>Hech narsa topilmadi</h3>
            <p>Qidiruv so'zini o'zgartirib ko'ring</p>
            <button onClick={() => { setSearchTerm(''); setFilter('all'); }}>Filtrlarni tozalash</button>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-sidebar" onClick={() => setShowCart(false)}>
          <div className="cart-content" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h3>🛒 Savatcha</h3>
              <div>
                <button onClick={clearCart} className="clear-cart-btn" title="Savatni tozalash">
                  🗑️
                </button>
                <button onClick={() => setShowCart(false)}>✕</button>
              </div>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <span>🛒</span>
                  <p>Savat hozircha bo'sh</p>
                  <button onClick={() => setShowCart(false)}>Xarid qilish</button>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>{(item.price).toLocaleString()} so'm</p>
                        <div className="cart-item-quantity">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <div className="cart-item-total">
                        <p>{(item.price * item.quantity).toLocaleString()} so'm</p>
                        <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Jami:</span>
                  <span className="total-price">{getCartTotal().toLocaleString()} so'm</span>
                </div>
                <div className="cart-actions">
                  <button className="checkout-btn" onClick={checkout}>
                    Rasmiylashtirish → 
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-info">
                <span className="product-category">{selectedProduct.category}</span>
                <h2>{selectedProduct.name}</h2>
                <div className="product-rating">
                  <div className="stars">
                    {'★'.repeat(Math.floor(selectedProduct.rating))}
                    {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
                  </div>
                  <span>({selectedProduct.rating})</span>
                </div>
                <p className="modal-description">{selectedProduct.description}</p>
                <div className="product-price">
                  <span className="current-price">{getDiscountedPrice(selectedProduct.price, selectedProduct.discount).toLocaleString()} so'm</span>
                  {selectedProduct.discount && (
                    <>
                      <span className="old-price">{selectedProduct.price.toLocaleString()} so'm</span>
                      <span className="saved">-{selectedProduct.discount}% chegirma</span>
                    </>
                  )}
                </div>
                <div className="modal-actions">
                  <button 
                    className="buy-btn"
                    disabled={!selectedProduct.inStock}
                    onClick={() => {
                      addToCart(selectedProduct, 1);
                      setShowModal(false);
                    }}
                  >
                    {selectedProduct.inStock ? '🛒 Savatga qo\'shish' : '❌ Mavjud emas'}
                  </button>
                  <button 
                    className={`like-btn ${likedProducts.includes(selectedProduct.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(selectedProduct.id)}
                  >
                    {likedProducts.includes(selectedProduct.id) ? '❤️ Sevimlilarda' : '🤍 Sevimlilarga'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>🏪 TechStore</h3>
              <p>Eng zamonaviy va sifatli mahsulotlar eng qulay narxlarda</p>
              <div className="social-links">
                <a href="#" onClick={(e) => { e.preventDefault(); showNotification("Instagram tez kunda!", "info"); }}>📘</a>
                <a href="#" onClick={(e) => { e.preventDefault(); showNotification("Instagram tez kunda!", "info"); }}>📸</a>
                <a href="#" onClick={(e) => { e.preventDefault(); showNotification("Telegram tez kunda!", "info"); }}>💬</a>
              </div>
            </div>
            {!isMobile && (
              <>
                <div className="footer-col">
                  <h4>Ma'lumot</h4>
                  <a href="#" onClick={(e) => e.preventDefault()}>Biz haqimizda</a>
                  <a href="#" onClick={(e) => e.preventDefault()}>Yetkazib berish</a>
                  <a href="#" onClick={(e) => e.preventDefault()}>To'lov usullari</a>
                  <a href="#" onClick={(e) => e.preventDefault()}>Maxfiylik siyosati</a>
                </div>
                <div className="footer-col">
                  <h4>Xizmatlar</h4>
                  <a href="#" onClick={(e) => e.preventDefault()}>12 oy kafolat</a>
                  <a href="#" onClick={(e) => e.preventDefault()}>14 kun ichida qaytarish</a>
                  <a href="#" onClick={(e) => e.preventDefault()}>Bonus dasturi</a>
                  <a href="#" onClick={(e) => e.preventDefault()}>Kreditga sotib olish</a>
                </div>
              </>
            )}
            <div className="footer-col">
              <h4>Bog'lanish</h4>
              <p>📞 +998 90 123 45 67</p>
              <p>✉️ info@techstore.uz</p>
              <p>📍 Toshkent sh., Amir Temur 45</p>
              <p>⏰ 09:00 - 21:00</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 TechStore. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;