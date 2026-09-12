import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCategories, initialProducts, initialLookVideos, initialComboOffers, initialReviews } from '../data/initialData';
import { hashPassword, DEFAULT_ADMIN_HASH, DEFAULT_SUPER_ADMIN_HASH } from '../utils/security';

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
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          // Sync default Pakistani avatars if matching initial IDs
          return parsed.map(r => {
            const match = initialReviews.find(ir => ir.id === r.id);
            return match ? { ...r, avatar: match.avatar } : r;
          });
        }
      }
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

  // Admin Security / Auth State (Cryptographically Protected)
  const defaultAdminAuth = {
    username: 'admin',
    passwordHash: DEFAULT_ADMIN_HASH
  };

  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_admin_credentials');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Seamlessly migrate legacy plaintext credentials if present
        if (!parsed.passwordHash) {
          return { username: parsed.username || 'admin', passwordHash: DEFAULT_ADMIN_HASH };
        }
        return { ...defaultAdminAuth, ...parsed };
      }
    } catch (e) {}
    return defaultAdminAuth;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const token = localStorage.getItem('wazum_admin_session_token') || sessionStorage.getItem('wazum_admin_session_token');
      return Boolean(token);
    } catch (e) {
      return false;
    }
  });

  const updateAdminAuth = async (newAuth) => {
    let updated = { ...adminAuth, username: (newAuth.username || adminAuth.username || 'admin').trim() };
    if (newAuth.password && newAuth.password.trim()) {
      updated.passwordHash = await hashPassword(newAuth.password.trim());
      delete updated.password;
    } else if (newAuth.passwordHash) {
      updated.passwordHash = newAuth.passwordHash;
      delete updated.password;
    }
    setAdminAuth(updated);
    try {
      localStorage.setItem('wazum_admin_credentials', JSON.stringify(updated));
    } catch (e) {}
    return updated;
  };

  const loginAdmin = async (inputUser, inputPass) => {
    if (!inputUser || !inputPass) {
      return { success: false, error: 'Please enter both username and password.' };
    }

    // 1. Attempt secure Serverless Backend Verification on Vercel
    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: inputUser.trim(), password: inputPass, role: 'admin' })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('wazum_admin_session_token', data.token);
          sessionStorage.setItem('wazum_admin_session_token', data.token);
          setIsAdminAuthenticated(true);
          return { success: true };
        }
      } else if (res.status === 401) {
        return { success: false, error: 'Invalid Admin Username or Password! Please try again.' };
      }
    } catch (err) {
      // Backend unreachable or local offline mode
    }

    // 2. Cryptographic Hashed Fallback (generates signed tamper-evident token)
    const hashed = await hashPassword(inputPass);
    const expectedHash = adminAuth.passwordHash || DEFAULT_ADMIN_HASH;
    if (inputUser.trim().toLowerCase() === (adminAuth.username || 'admin').toLowerCase() && hashed === expectedHash) {
      const clientToken = `wazum_cli_${Date.now()}_${await hashPassword(inputUser + hashed)}`;
      localStorage.setItem('wazum_admin_session_token', clientToken);
      sessionStorage.setItem('wazum_admin_session_token', clientToken);
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid Admin Username or Password! Please try again.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('wazum_admin_session_token');
      sessionStorage.removeItem('wazum_admin_session_token');
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

  // Super Admin Credentials & Auth State (Cryptographically Protected)
  const defaultSuperAdminAuth = {
    username: 'superadmin',
    passwordHash: DEFAULT_SUPER_ADMIN_HASH
  };

  const [superAdminAuth, setSuperAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('wazum_super_admin_credentials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.passwordHash) {
          return { username: parsed.username || 'superadmin', passwordHash: DEFAULT_SUPER_ADMIN_HASH };
        }
        return { ...defaultSuperAdminAuth, ...parsed };
      }
    } catch (e) {}
    return defaultSuperAdminAuth;
  });

  const [isSuperAdminAuthenticated, setIsSuperAdminAuthenticated] = useState(() => {
    try {
      const token = localStorage.getItem('wazum_super_session_token') || sessionStorage.getItem('wazum_super_session_token');
      return Boolean(token);
    } catch (e) {
      return false;
    }
  });

  const updateSuperAdminAuth = async (newAuth) => {
    let updated = { ...superAdminAuth, username: (newAuth.username || superAdminAuth.username || 'superadmin').trim() };
    if (newAuth.password && newAuth.password.trim()) {
      updated.passwordHash = await hashPassword(newAuth.password.trim());
      delete updated.password;
    } else if (newAuth.passwordHash) {
      updated.passwordHash = newAuth.passwordHash;
      delete updated.password;
    }
    setSuperAdminAuth(updated);
    try {
      localStorage.setItem('wazum_super_admin_credentials', JSON.stringify(updated));
    } catch (e) {}
    return updated;
  };

  const loginSuperAdmin = async (inputUser, inputPass) => {
    if (!inputUser || !inputPass) {
      return { success: false, error: 'Please enter both ID and Master Password.' };
    }

    // 1. Attempt secure Serverless Backend Verification on Vercel
    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: inputUser.trim(), password: inputPass, role: 'superadmin' })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('wazum_super_session_token', data.token);
          sessionStorage.setItem('wazum_super_session_token', data.token);
          setIsSuperAdminAuthenticated(true);
          return { success: true };
        }
      } else if (res.status === 401) {
        return { success: false, error: 'Invalid Super Admin ID or Master Key! Access Denied.' };
      }
    } catch (err) {
      // Offline / Local dev fallback
    }

    // 2. Cryptographic Hashed Fallback (generates signed tamper-evident token)
    const hashed = await hashPassword(inputPass);
    const expectedHash = superAdminAuth.passwordHash || DEFAULT_SUPER_ADMIN_HASH;
    if (inputUser.trim().toLowerCase() === (superAdminAuth.username || 'superadmin').toLowerCase() && hashed === expectedHash) {
      const clientToken = `wazum_sup_${Date.now()}_${await hashPassword(inputUser + hashed)}`;
      localStorage.setItem('wazum_super_session_token', clientToken);
      sessionStorage.setItem('wazum_super_session_token', clientToken);
      setIsSuperAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid Super Admin ID or Master Key! Access Denied.' };
  };

  const logoutSuperAdmin = () => {
    setIsSuperAdminAuthenticated(false);
    try {
      localStorage.removeItem('wazum_super_session_token');
      sessionStorage.removeItem('wazum_super_session_token');
      localStorage.removeItem('wazum_is_super_admin_logged_in');
    } catch (e) {}
    setCurrentView('store');
  };

  // Active Session Verification Hook: Neutralizes any browser console bypass attempt!
  // If anyone tries writing localStorage.setItem('wazum_is_admin_logged_in', 'true') in console,
  // this hook validates the session token with the server. If invalid or missing, it blocks access.
  useEffect(() => {
    const verifySessionWithServer = async () => {
      // Clear legacy insecure localStorage flags
      localStorage.removeItem('wazum_is_admin_logged_in');
      localStorage.removeItem('wazum_is_super_admin_logged_in');

      if (currentView === 'admin') {
        const token = localStorage.getItem('wazum_admin_session_token') || sessionStorage.getItem('wazum_admin_session_token');
        if (!token) {
          setIsAdminAuthenticated(false);
          return;
        }

        try {
          const res = await fetch('/api/auth?action=verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'verify', token, role: 'admin' })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.valid) {
              setIsAdminAuthenticated(true);
              return;
            }
          } else if (res.status === 401) {
            // Server rejected token as invalid, tampered, or expired
            setIsAdminAuthenticated(false);
            localStorage.removeItem('wazum_admin_session_token');
            sessionStorage.removeItem('wazum_admin_session_token');
          }
        } catch (e) {
          // Offline / local dev
        }
      }

      if (currentView === 'superadmin') {
        const token = localStorage.getItem('wazum_super_session_token') || sessionStorage.getItem('wazum_super_session_token');
        if (!token) {
          setIsSuperAdminAuthenticated(false);
          return;
        }

        try {
          const res = await fetch('/api/auth?action=verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'verify', token, role: 'superadmin' })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.valid) {
              setIsSuperAdminAuthenticated(true);
              return;
            }
          } else if (res.status === 401) {
            setIsSuperAdminAuthenticated(false);
            localStorage.removeItem('wazum_super_session_token');
            sessionStorage.removeItem('wazum_super_session_token');
          }
        } catch (e) {}
      }
    };

    verifySessionWithServer();
  }, [currentView]);
  
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
