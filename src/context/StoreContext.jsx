import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCategories, initialProducts, initialLookVideos, initialComboOffers, initialReviews } from '../data/initialData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Categories State
  const oldCategoryNames = ['Tops', 'Bottoms', 'Chronograph', 'Automatic & Mechanical', 'Minimalist Dress Watches', 'Dive & Sports Steel', 'Smart Luxury Editions', 'Limited Edition Vault'];

  // Categories State
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6 && !parsed.some(c => oldCategoryNames.includes(c.name))) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading categories from localStorage:', err);
    }
    try {
      localStorage.setItem('wazum_categories', JSON.stringify(initialCategories));
    } catch (e) {}
    return initialCategories;
  });

  // Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 48 && !parsed.some(p => oldCategoryNames.includes(p.category))) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading products from localStorage:', err);
    }
    try {
      localStorage.setItem('wazum_products', JSON.stringify(initialProducts));
    } catch (e) {}
    return initialProducts;
  });

  // Look Videos State
  const [lookVideos, setLookVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_look_videos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialLookVideos;
  });

  // Combo Offers State
  const [comboOffers, setComboOffers] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_combo_offers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialComboOffers;
  });

  // Customer Reviews State
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialReviews;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // View state: 'store', 'admin', 'superadmin', 'category'
  const [currentView, setCurrentViewRaw] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/admin')) return 'admin';
      if (path.includes('/superadmin')) return 'superadmin';
    }
    return 'store';
  });

  const setCurrentView = (view) => {
    setCurrentViewRaw(view);
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      if (view === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else if (view === 'superadmin') {
        window.history.pushState({}, '', '/superadmin');
      } else if (view === 'store') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/admin')) {
        setCurrentViewRaw('admin');
      } else if (path.includes('/superadmin')) {
        setCurrentViewRaw('superadmin');
      } else {
        setCurrentViewRaw('store');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [adminTab, setAdminTab] = useState('overview'); // 'overview', 'categories', 'products', 'orders', 'looks', 'combos', 'settings'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Payment & Store Settings State
  const defaultPaymentSettings = {
    jazzcashNumber: '03024000389',
    bankName: 'UBL Bank',
    bankAccountNumber: '0865395419159',
    accountTitle: 'Umar Huzaifa',
    advanceAmount: '300',
    whatsappNumber: '923024000389',
    supportEmail: 'umarjoon29@gmail.com'
  };

  const [paymentSettings, setPaymentSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_payment_settings');
      if (saved) return { ...defaultPaymentSettings, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultPaymentSettings;
  });

  const updatePaymentSettings = (newSettings) => {
    const updated = { ...paymentSettings, ...newSettings };
    setPaymentSettings(updated);
    try {
      localStorage.setItem('wazum_payment_settings', JSON.stringify(updated));
    } catch (e) {}
  };

  // Admin Security / Auth State
  const defaultAdminAuth = {
    username: 'admin',
    password: 'admin123'
  };

  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_admin_credentials');
      if (saved) return { ...defaultAdminAuth, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultAdminAuth;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('wazum_is_admin_logged_in') === 'true';
    } catch (e) {
      return false;
    }
  });

  const updateAdminAuth = (newAuth) => {
    const updated = { ...adminAuth, ...newAuth };
    setAdminAuth(updated);
    try {
      localStorage.setItem('wazum_admin_credentials', JSON.stringify(updated));
    } catch (e) {}
  };

  const loginAdmin = (inputUser, inputPass) => {
    if (inputUser.trim() === adminAuth.username && inputPass === adminAuth.password) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('wazum_is_admin_logged_in', 'true');
      } catch (e) {}
      return { success: true };
    }
    return { success: false, error: 'Invalid Admin Username or Password! Please try again.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('wazum_is_admin_logged_in');
    } catch (e) {}
    setCurrentView('store');
  };

  // Global Site No-Code Configuration State
  const defaultSiteConfig = {
    storeName: 'WAZUM LUXURY STORE',
    logoUrl: '/logo.png',
    themeAccentColor: '#c5a059',
    
    showAnnouncementBar: true,
    announcementText: 'Easy exchange policy | Free shipping on orders above Rs. 10,000 | 300 dc advance required to confirm your order',
    
    showHero: true,
    heroTagline: '',
    heroTitle: 'Refined Presence',
    heroSubtitle: '',
    heroCtaText: 'DISCOVER COLLECTION',
    heroImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80',
    
    showCategoriesGrid: true,
    showShopTheLook: true,
    showTicker: true,
    tickerText: 'APKA APNA WAZUM STORE',
    showComboOffers: true,
    
    footerCopyright: '© 2026 WAZUM LUXURY STORE. ALL RIGHTS RESERVED.',
    instagramUrl: 'https://www.instagram.com/wazum_store?igsi=MWgwdnJqdDIybGgxMQ==',
    facebookUrl: 'https://www.facebook.com/share/1CUyJT7Dah/',
    tiktokUrl: 'https://www.tiktok.com/@wazum_store?_r=1&_t=ZN-99TtN1KGcVS',
    
    freeShippingThreshold: 10000,
    shippingFee: 250,
    requirePostalCode: true,
    allowGuestCheckout: true,
    
    clientCanEditPayment: true,
    clientCanDeleteOrders: true,
    clientCanEditProducts: true
  };

  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.showHero = parsed.showHero !== false;
        parsed.showCategoriesGrid = parsed.showCategoriesGrid !== false;
        if (!parsed.announcementText || parsed.announcementText.split('|').length < 3) {
          parsed.announcementText = defaultSiteConfig.announcementText;
        }
        return { ...defaultSiteConfig, ...parsed };
      }
    } catch (e) {}
    return defaultSiteConfig;
  });

  const updateSiteConfig = (newConfig) => {
    const updated = { ...siteConfig, ...newConfig };
    setSiteConfig(updated);
    localStorage.setItem('wazum_site_config', JSON.stringify(updated));
  };

  // Super Admin Credentials & Auth State
  const defaultSuperAdminAuth = {
    username: 'superadmin',
    password: 'superwazum2026'
  };

  const [superAdminAuth, setSuperAdminAuth] = useState(() => {
    const saved = localStorage.getItem('wazum_super_admin_credentials');
    return saved ? { ...defaultSuperAdminAuth, ...JSON.parse(saved) } : defaultSuperAdminAuth;
  });

  const [isSuperAdminAuthenticated, setIsSuperAdminAuthenticated] = useState(() => {
    return localStorage.getItem('wazum_is_super_admin_logged_in') === 'true';
  });

  const updateSuperAdminAuth = (newAuth) => {
    const updated = { ...superAdminAuth, ...newAuth };
    setSuperAdminAuth(updated);
    localStorage.setItem('wazum_super_admin_credentials', JSON.stringify(updated));
  };

  const loginSuperAdmin = (inputUser, inputPass) => {
    if (inputUser.trim() === superAdminAuth.username && inputPass === superAdminAuth.password) {
      setIsSuperAdminAuthenticated(true);
      localStorage.setItem('wazum_is_super_admin_logged_in', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid Super Admin ID or Master Key! Access Denied.' };
  };

  const logoutSuperAdmin = () => {
    setIsSuperAdminAuthenticated(false);
    localStorage.removeItem('wazum_is_super_admin_logged_in');
    setCurrentView('store');
  };
  
  // UI Drawer / Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [trackQuery, setTrackQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartNotification, setCartNotification] = useState(null);

  // Persist data in localStorage
  useEffect(() => {
    localStorage.setItem('wazum_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('wazum_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wazum_look_videos', JSON.stringify(lookVideos));
  }, [lookVideos]);

  useEffect(() => {
    localStorage.setItem('wazum_combo_offers', JSON.stringify(comboOffers));
  }, [comboOffers]);

  useEffect(() => {
    localStorage.setItem('wazum_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wazum_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('wazum_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      verified: true,
      date: 'Just now',
      ...reviewData
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const deleteReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  // Look Video helper functions
  const addLookVideo = (newLook) => {
    setLookVideos(prev => [...prev, { ...newLook, id: `look-${Date.now()}` }]);
  };

  const updateLookVideo = (id, updatedData) => {
    setLookVideos(prev => prev.map(l => l.id === id ? { ...l, ...updatedData } : l));
  };

  const deleteLookVideo = (id) => {
    setLookVideos(prev => prev.filter(l => l.id !== id));
  };

  // Combo Offer helper functions
  const addComboOffer = (newCombo) => {
    const saveAmt = (Number(newCombo.originalPrice) || 0) > Number(newCombo.price)
      ? Number(newCombo.originalPrice) - Number(newCombo.price)
      : 0;

    const formattedCombo = {
      id: `combo-${Date.now()}`,
      saveAmount: saveAmt,
      ...newCombo
    };
    setComboOffers(prev => [formattedCombo, ...prev]);
  };

  const updateComboOffer = (id, updatedData) => {
    setComboOffers(prev => prev.map(c => {
      if (c.id === id) {
        const origPrice = Number(updatedData.originalPrice) || c.originalPrice || 0;
        const salePrice = Number(updatedData.price) || c.price || 0;
        const saveAmt = origPrice > salePrice ? origPrice - salePrice : 0;
        return { ...c, ...updatedData, saveAmount: saveAmt };
      }
      return c;
    }));
  };

  const deleteComboOffer = (id) => {
    setComboOffers(prev => prev.filter(c => c.id !== id));
  };

  // Cart helper functions
  const buyNow = (product, selectedSize = 'M', quantity = 1) => {
    const newItem = { 
      id: `${product.id}-${selectedSize}-${Date.now()}`, 
      product, 
      size: selectedSize, 
      quantity 
    };
    setCart([newItem]);
  };

  const addToCart = (product, selectedSize = 'M', quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { id: `${product.id}-${selectedSize}`, product, size: selectedSize, quantity }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Category CRUD
  const addCategory = (categoryData) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      ...categoryData,
      itemCount: 0
    };
    setCategories(prev => [newCat, ...prev]);
  };

  const updateCategory = (id, updatedData) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
      ...productData
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const reorderProducts = (startIndex, endIndex) => {
    setProducts(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // Order helpers
  const placeOrder = (customerDetails) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      customer: customerDetails,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const openCategoryPage = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider value={{
      categories,
      products,
      cart,
      orders,
      currentView,
      setCurrentView,
      adminTab,
      setAdminTab,
      selectedCategory,
      setSelectedCategory,
      openCategoryPage,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isTrackOrderOpen,
      setIsTrackOrderOpen,
      trackQuery,
      setTrackQuery,
      selectedProduct,
      setSelectedProduct,
      searchQuery,
      setSearchQuery,
      cartNotification,
      setCartNotification,
      buyNow,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartCount,
      addCategory,
      updateCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      setProducts,
      reorderProducts,
      lookVideos,
      setLookVideos,
      addLookVideo,
      updateLookVideo,
      deleteLookVideo,
      comboOffers,
      setComboOffers,
      addComboOffer,
      updateComboOffer,
      deleteComboOffer,
      reviews,
      setReviews,
      addReview,
      deleteReview,
      placeOrder,
      updateOrderStatus,
      deleteOrder,
      paymentSettings,
      updatePaymentSettings,
      adminAuth,
      updateAdminAuth,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      siteConfig,
      updateSiteConfig,
      superAdminAuth,
      updateSuperAdminAuth,
      isSuperAdminAuthenticated,
      loginSuperAdmin,
      logoutSuperAdmin
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
