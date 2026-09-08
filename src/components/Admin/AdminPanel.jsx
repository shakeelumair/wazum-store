import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Layers, Package, ShoppingBag, Plus, Trash2, Edit2, 
  BarChart3, Image as ImageIcon, Check, ArrowLeft, X, Film, Upload, Video,
  Search, Eye, TrendingUp, Sparkles, Clock, Phone, Mail, ExternalLink,
  Grid, List, ShieldCheck, AlertCircle, Filter, DollarSign, CheckCircle2, RefreshCw, Tag,
  GripVertical, ArrowUp, ArrowDown, Settings, CreditCard, Save, Lock, LogOut
} from 'lucide-react';

const AdminPanel = () => {
  const {
    categories,
    products,
    orders,
    lookVideos,
    comboOffers,
    adminTab,
    setAdminTab,
    setCurrentView,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    reorderProducts,
    addLookVideo,
    updateLookVideo,
    deleteLookVideo,
    addComboOffer,
    updateComboOffer,
    deleteComboOffer,
    updateOrderStatus,
    deleteOrder,
    paymentSettings,
    updatePaymentSettings,
    adminAuth,
    updateAdminAuth,
    logoutAdmin
  } = useStore();

  const [settingForm, setSettingForm] = useState({
    jazzcashNumber: paymentSettings?.jazzcashNumber || '03024000389',
    bankName: paymentSettings?.bankName || 'UBL Bank',
    bankAccountNumber: paymentSettings?.bankAccountNumber || '0865395419159',
    accountTitle: paymentSettings?.accountTitle || 'Umar Huzaifa',
    advanceAmount: paymentSettings?.advanceAmount || '300',
    whatsappNumber: paymentSettings?.whatsappNumber || '923024000389',
    supportEmail: paymentSettings?.supportEmail || 'umarjoon29@gmail.com'
  });

  const [authForm, setAuthForm] = useState({
    username: adminAuth?.username || 'admin',
    password: adminAuth?.password || 'admin123'
  });

  useEffect(() => {
    if (paymentSettings) {
      setSettingForm({
        jazzcashNumber: paymentSettings.jazzcashNumber || '',
        bankName: paymentSettings.bankName || '',
        bankAccountNumber: paymentSettings.bankAccountNumber || '',
        accountTitle: paymentSettings.accountTitle || '',
        advanceAmount: paymentSettings.advanceAmount || '300',
        whatsappNumber: paymentSettings.whatsappNumber || '',
        supportEmail: paymentSettings.supportEmail || ''
      });
    }
  }, [paymentSettings]);

  useEffect(() => {
    if (adminAuth) {
      setAuthForm({
        username: adminAuth.username || 'admin',
        password: adminAuth.password || 'admin123'
      });
    }
  }, [adminAuth]);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productViewMode, setProductViewMode] = useState('grid'); // 'grid' or 'table'
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Drag and Drop States for Product Reordering
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverItemIndex(index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
      reorderProducts(draggedItemIndex, targetIndex);
      showToast('Product display order updated!');
    }
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  const moveProductUpDown = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < products.length) {
      reorderProducts(index, targetIndex);
      showToast(`Product order shifted ${direction}!`);
    }
  };

  // Category Form State
  const [catForm, setCatForm] = useState({ name: '', image: '', description: '' });
  const [editingCatId, setEditingCatId] = useState(null);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    title: '',
    category: categories[0]?.name || 'Chrono',
    price: '',
    originalPrice: '',
    image: '',
    imageFit: 'cover', // 'cover' or 'contain'
    imagePosition: { x: 50, y: 50 },
    description: '',
    sizes: 'S, M, L, XL',
    inStock: true
  });
  const [editingProdId, setEditingProdId] = useState(null);

  // Image Drag-to-Position Adjuster State & Function
  const [isDraggingImagePos, setIsDraggingImagePos] = useState(false);

  const updateImagePos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0]?.clientY);
    if (clientX === undefined || clientY === undefined) return;

    const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const offsetY = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const xPercent = Math.round((offsetX / rect.width) * 100);
    const yPercent = Math.round((offsetY / rect.height) * 100);

    setProdForm(prev => ({
      ...prev,
      imagePosition: { x: xPercent, y: yPercent }
    }));
  };

  // Shop The Look Video Form State
  const [lookForm, setLookForm] = useState({
    title: '',
    videoUrl: '',
    poster: '',
    productId: products[0]?.id || 'prod-1'
  });
  const [editingLookId, setEditingLookId] = useState(null);

  // Notification Toast State
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Video File Upload Handler (Computer File to Data URL)
  const handleVideoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        showToast('Video file is too large. Please select a file under 50MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLookForm(prev => ({ ...prev, videoUrl: reader.result }));
        showToast('Local video loaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Product Image File Upload Handler (PC / Laptop / Mobile File)
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdForm(prev => ({ ...prev, image: reader.result }));
        showToast('Product image uploaded from device!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Category Image File Upload Handler (PC / Laptop / Mobile File)
  const handleCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatForm(prev => ({ ...prev, image: reader.result }));
        showToast('Category image uploaded from device!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Combo Offer Form State
  const [comboForm, setComboForm] = useState({
    title: '',
    subtitle: '',
    price: '',
    originalPrice: '',
    image: '',
    description: ''
  });
  const [editingComboId, setEditingComboId] = useState(null);

  // Combo Image File Upload Handler
  const handleComboImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setComboForm(prev => ({ ...prev, image: reader.result }));
        showToast('Combo offer image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Combo Offer
  const handleComboSubmit = (e) => {
    e.preventDefault();
    if (!comboForm.title || !comboForm.price) return;

    const formattedCombo = {
      title: comboForm.title,
      subtitle: comboForm.subtitle || '',
      price: Number(comboForm.price),
      originalPrice: comboForm.originalPrice ? Number(comboForm.originalPrice) : null,
      image: comboForm.image || 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      description: comboForm.description || ''
    };

    if (editingComboId) {
      updateComboOffer(editingComboId, formattedCombo);
      showToast(`Combo Offer "${comboForm.title}" updated!`);
      setEditingComboId(null);
    } else {
      addComboOffer(formattedCombo);
      showToast(`New Combo Offer "${comboForm.title}" created!`);
    }

    setComboForm({
      title: '',
      subtitle: '',
      price: '',
      originalPrice: '',
      image: '',
      description: ''
    });
  };

  // Submit Category
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!catForm.name) return;

    if (editingCatId) {
      updateCategory(editingCatId, catForm);
      showToast(`Category "${catForm.name}" updated successfully!`);
      setEditingCatId(null);
    } else {
      addCategory(catForm);
      showToast(`New Category "${catForm.name}" created!`);
    }
    setCatForm({ name: '', image: '', description: '' });
  };

  // Submit Product
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!prodForm.title || !prodForm.price) return;

    const formattedProduct = {
      title: prodForm.title,
      category: prodForm.category || (categories[0]?.name || 'Chrono'),
      price: Number(prodForm.price),
      originalPrice: prodForm.originalPrice ? Number(prodForm.originalPrice) : null,
      image: prodForm.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      imageFit: prodForm.imageFit || 'cover',
      imagePosition: prodForm.imagePosition || { x: 50, y: 50 },
      description: prodForm.description,
      sizes: prodForm.sizes ? prodForm.sizes.split(',').map(s => s.trim()) : ['S', 'M', 'L', 'XL'],
      inStock: prodForm.inStock !== false
    };

    if (editingProdId) {
      updateProduct(editingProdId, formattedProduct);
      showToast(`Product "${prodForm.title}" updated!`);
      setEditingProdId(null);
    } else {
      addProduct(formattedProduct);
      showToast(`Product "${prodForm.title}" added to inventory!`);
    }

    setProdForm({
      title: '',
      category: categories[0]?.name || 'Chrono',
      price: '',
      originalPrice: '',
      image: '',
      imageFit: 'cover',
      imagePosition: { x: 50, y: 50 },
      description: '',
      sizes: 'S, M, L, XL',
      inStock: true
    });
  };

  // Submit Video Look
  const handleLookSubmit = (e) => {
    e.preventDefault();
    if (!lookForm.title || !lookForm.videoUrl) return;

    const formattedLook = {
      title: lookForm.title,
      videoUrl: lookForm.videoUrl,
      poster: lookForm.poster || 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      productId: lookForm.productId || (products[0]?.id || 'prod-1')
    };

    if (editingLookId) {
      updateLookVideo(editingLookId, formattedLook);
      showToast(`Video Look "${lookForm.title}" updated!`);
      setEditingLookId(null);
    } else {
      addLookVideo(formattedLook);
      showToast(`New Video Look "${lookForm.title}" added!`);
    }

    setLookForm({
      title: '',
      videoUrl: '',
      poster: '',
      productId: products[0]?.id || 'prod-1'
    });
  };

  const handleEditLook = (look) => {
    setLookForm({
      title: look.title,
      videoUrl: look.videoUrl,
      poster: look.poster || '',
      productId: look.productId || (products[0]?.id || 'prod-1')
    });
    setEditingLookId(look.id);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) || 
                            p.category.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, productSearch, productCategoryFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                            o.customer?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                            o.customer?.phone?.includes(orderSearch);
      const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Financial Stats
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + (o.total || 0), 0), [orders]);
  const pendingOrdersCount = useMemo(() => orders.filter(o => o.status === 'Pending').length, [orders]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-100 font-sans pb-20 selection:bg-[#c5a059] selection:text-black">
      
      {/* Notification Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider backdrop-blur-md border ${
          toast.type === 'error' 
            ? 'bg-red-950/90 text-red-200 border-red-500/50 shadow-red-900/30' 
            : 'bg-black/90 text-[#e5c158] border-[#c5a059]/60 shadow-[#c5a059]/20'
        } animate-bounce`}>
          <Sparkles size={16} className="text-[#c5a059]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Luxury Admin Header */}
      <header className="sticky top-0 z-40 bg-[#0d0e15]/95 backdrop-blur-md border-b border-[#c5a059]/25 shadow-[0_4px_25px_rgba(0,0,0,0.7)] px-4 md:px-8 py-3.5 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('store')}
            className="p-2 rounded-xl bg-[#171924] border border-gray-800 text-gray-300 hover:text-white hover:border-[#c5a059] hover:bg-black transition-all flex items-center space-x-1.5 shadow"
            title="Return to Storefront"
          >
            <ArrowLeft size={18} className="text-[#c5a059]" />
            <span className="hidden sm:inline text-xs uppercase tracking-wider font-medium">Storefront</span>
          </button>
          
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <h1 className="text-sm md:text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-white via-[#f3e7c4] to-[#c5a059] bg-clip-text text-transparent">
                WAZUM COMMAND CENTER
              </h1>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wider">PREMIUM STORE MANAGEMENT & CONTROL PANEL</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 bg-[#141622] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-full text-xs text-gray-300">
            <ShieldCheck size={14} className="text-[#c5a059]" />
            <span>Admin Status: <strong className="text-emerald-400 uppercase font-semibold">Authorized</strong></span>
          </div>

          <button 
            onClick={() => setCurrentView('store')}
            className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-semibold text-xs px-4 py-2.5 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#c5a059]/20 flex items-center space-x-1.5 cursor-pointer"
          >
            <Eye size={15} />
            <span>View Live Store</span>
          </button>

          <button 
            onClick={() => {
              logoutAdmin();
            }}
            className="bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-red-200 font-semibold text-xs px-3.5 py-2.5 rounded-xl uppercase tracking-widest transition-all shadow flex items-center space-x-1.5 cursor-pointer"
            title="Log Out Admin Session"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        
        {/* Navigation Tabs Header */}
        <div className="bg-[#11131d]/90 backdrop-blur-md p-2 rounded-2xl border border-gray-800/80 shadow-xl mb-8 flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap ${
              adminTab === 'overview'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <BarChart3 size={17} />
            <span>Analytics & Overview</span>
          </button>

          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap ${
              adminTab === 'products'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <Package size={17} />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('categories')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap ${
              adminTab === 'categories'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <Layers size={17} />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('looks')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap ${
              adminTab === 'looks'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <Film size={17} />
            <span>Video Looks ({lookVideos?.length || 0})</span>
          </button>

          <button
            onClick={() => setAdminTab('combos')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap ${
              adminTab === 'combos'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <Tag size={17} />
            <span>Combo Offers ({comboOffers?.length || 0})</span>
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap relative ${
              adminTab === 'orders'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <ShoppingBag size={17} />
            <span>Orders ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-[10px] bg-amber-400 text-black font-black rounded-full animate-pulse">
                {pendingOrdersCount} NEW
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 transition-all whitespace-nowrap ${
              adminTab === 'settings'
                ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/25 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
            }`}
          >
            <Settings size={17} />
            <span>Payment & Settings</span>
          </button>
        </div>

        {/* --- OVERVIEW / ANALYTICS TAB --- */}
        {adminTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Clean Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-[#121420] p-5 rounded-xl border border-gray-800/80 shadow-md">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Sales</span>
                <p className="text-2xl font-bold text-[#e5c158] mt-1 font-mono">
                  Rs. {totalRevenue.toLocaleString()}
                </p>
                <span className="text-[11px] text-gray-500 mt-1 block">Store total revenue</span>
              </div>

              <div className="bg-[#121420] p-5 rounded-xl border border-gray-800/80 shadow-md">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Products</span>
                <p className="text-2xl font-bold text-white mt-1">
                  {products.length} <span className="text-xs text-gray-400 font-normal">Items</span>
                </p>
                <span className="text-[11px] text-gray-500 mt-1 block">{categories.length} Categories</span>
              </div>

              <div className="bg-[#121420] p-5 rounded-xl border border-gray-800/80 shadow-md">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Orders</span>
                <p className="text-2xl font-bold text-white mt-1">
                  {orders.length} <span className="text-xs text-gray-400 font-normal">Orders</span>
                </p>
                <span className="text-[11px] text-amber-400 mt-1 block font-medium">{pendingOrdersCount} Pending Fulfillment</span>
              </div>

              <div className="bg-[#121420] p-5 rounded-xl border border-gray-800/80 shadow-md">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Shop The Look</span>
                <p className="text-2xl font-bold text-white mt-1">
                  {lookVideos?.length || 0} <span className="text-xs text-gray-400 font-normal">Videos</span>
                </p>
                <span className="text-[11px] text-gray-500 mt-1 block">Active video reels</span>
              </div>

            </div>

            {/* Quick Actions Bar */}
            <div className="bg-[#121420] p-4 rounded-xl border border-gray-800/80 shadow-md flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Quick Actions:</span>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setAdminTab('products')}
                  className="bg-[#181a2a] hover:bg-[#22253b] text-[#e5c158] border border-[#c5a059]/40 text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
                
                <button 
                  onClick={() => setAdminTab('categories')}
                  className="bg-[#181a2a] hover:bg-[#22253b] text-gray-200 border border-gray-700 text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <Layers size={14} className="text-[#c5a059]" />
                  <span>Add Category</span>
                </button>

                <button 
                  onClick={() => setAdminTab('looks')}
                  className="bg-[#181a2a] hover:bg-[#22253b] text-gray-200 border border-gray-700 text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <Upload size={14} className="text-[#c5a059]" />
                  <span>Upload Look Video</span>
                </button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#121420] p-5 rounded-xl border border-gray-800/80 shadow-md space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-2">
                  <ShoppingBag className="text-[#c5a059]" size={16} />
                  <span>Recent Customer Orders</span>
                </h3>
                <button 
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-[#c5a059] hover:underline font-medium"
                >
                  View All Orders ({orders.length}) →
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-xs">
                  No orders placed yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-800 uppercase tracking-wider text-[11px]">
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">City</th>
                        <th className="py-2.5 px-3">Total</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {orders.slice(0, 5).map(ord => (
                        <tr key={ord.id} className="hover:bg-[#181a2a] transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#e5c158]">{ord.id}</td>
                          <td className="py-3 px-3 font-medium text-white">{ord.customer?.name}</td>
                          <td className="py-3 px-3 text-gray-400">{ord.customer?.city || 'N/A'}</td>
                          <td className="py-3 px-3 font-bold text-white font-mono">Rs. {ord.total?.toLocaleString()}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              ord.status === 'Delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              ord.status === 'Shipped' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                              ord.status === 'Processing' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                              'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}>
                              {ord.status || 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => setAdminTab('orders')}
                              className="px-3 py-1 bg-[#1a1d2e] hover:bg-[#25283f] text-gray-300 rounded text-[11px] font-medium transition-colors"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* --- PRODUCTS TAB --- */}
        {adminTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Add / Edit Product Form (4 Columns) */}
            <div className="lg:col-span-4 bg-[#121420] p-6 rounded-2xl border border-gray-800/90 shadow-xl h-fit sticky top-24">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Package className="text-[#c5a059]" size={18} />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {editingProdId ? 'Edit Product' : 'Add New Product'}
                  </h3>
                </div>
                {editingProdId && (
                  <button 
                    onClick={() => {
                      setEditingProdId(null);
                      setProdForm({ title: '', category: categories[0]?.name || 'Chrono', price: '', originalPrice: '', image: '', description: '', sizes: 'S, M, L, XL', inStock: true });
                    }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Audemars Piguet Royal Oak Chrono"
                    value={prodForm.title}
                    onChange={e => setProdForm({ ...prodForm, title: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={prodForm.category}
                    onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                      Sale Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="8500"
                      value={prodForm.price}
                      onChange={e => setProdForm({ ...prodForm, price: e.target.value })}
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                      Original Price (Rs.)
                    </label>
                    <input
                      type="number"
                      placeholder="12500"
                      value={prodForm.originalPrice}
                      onChange={e => setProdForm({ ...prodForm, originalPrice: e.target.value })}
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Product Image Upload (File from Device OR Paste URL) */}
                <div className="space-y-2">
                  <label className="block uppercase font-semibold text-gray-300">
                    Product Image (Upload or Link) *
                  </label>
                  
                  <label className="flex items-center justify-center space-x-2 bg-[#181a2a] hover:bg-[#22253b] text-[#e5c158] border border-[#c5a059]/40 rounded-xl px-3.5 py-2.5 cursor-pointer transition-colors shadow">
                    <Upload size={15} />
                    <span className="font-semibold text-xs">Choose Image from PC / Mobile...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center space-x-2 my-1">
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold">OR PASTE URL</span>
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                  </div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={prodForm.image}
                    onChange={e => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                  
                  {prodForm.image && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-400">
                        <span>Drag Image to Adjust Position:</span>
                        <button 
                          type="button" 
                          onClick={() => setProdForm(prev => ({ ...prev, imagePosition: { x: 50, y: 50 } }))}
                          className="text-[#c5a059] hover:underline"
                        >
                          Reset Center
                        </button>
                      </div>

                      <div 
                        onMouseDown={(e) => { setIsDraggingImagePos(true); updateImagePos(e); }}
                        onMouseMove={(e) => { if (isDraggingImagePos) updateImagePos(e); }}
                        onMouseUp={() => setIsDraggingImagePos(false)}
                        onMouseLeave={() => setIsDraggingImagePos(false)}
                        onTouchStart={(e) => updateImagePos(e)}
                        onTouchMove={(e) => updateImagePos(e)}
                        className="h-36 rounded-xl overflow-hidden border border-[#c5a059]/50 bg-black relative cursor-crosshair select-none group"
                        title="Click and drag mouse/finger over image to adjust focal position"
                      >
                        <img 
                          src={prodForm.image} 
                          alt="Preview" 
                          style={{ 
                            objectFit: prodForm.imageFit || 'cover',
                            objectPosition: `${prodForm.imagePosition?.x ?? 50}% ${prodForm.imagePosition?.y ?? 50}%` 
                          }} 
                          className="w-full h-full pointer-events-none transition-all duration-75" 
                        />

                        {/* Target Focal Crosshair Indicator */}
                        <div 
                          style={{ 
                            left: `${prodForm.imagePosition?.x ?? 50}%`, 
                            top: `${prodForm.imagePosition?.y ?? 50}%` 
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-[#e5c158] rounded-full bg-black/40 pointer-events-none shadow-lg flex items-center justify-center"
                        >
                          <span className="w-1.5 h-1.5 bg-[#e5c158] rounded-full"></span>
                        </div>

                        <span className="absolute bottom-1 left-2 text-[9px] font-mono text-[#e5c158] bg-black/80 px-2 py-0.5 rounded border border-gray-800 pointer-events-none">
                          X: {prodForm.imagePosition?.x ?? 50}% | Y: {prodForm.imagePosition?.y ?? 50}%
                        </span>

                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setProdForm(prev => ({ ...prev, image: '' })); }}
                          className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow z-10"
                          title="Remove Image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Image Display Mode Selector */}
                  <div className="pt-1">
                    <label className="block text-[11px] uppercase font-bold text-gray-300 mb-1">
                      Display Mode (How Image Fits on Card)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setProdForm(prev => ({ ...prev, imageFit: 'cover' }))}
                        className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold uppercase transition-all ${
                          (prodForm.imageFit || 'cover') === 'cover'
                            ? 'bg-[#c5a059] text-black border-[#c5a059] shadow'
                            : 'bg-[#181a2a] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                      >
                        Cover (Fill Card)
                      </button>
                      <button
                        type="button"
                        onClick={() => setProdForm(prev => ({ ...prev, imageFit: 'contain' }))}
                        className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold uppercase transition-all ${
                          prodForm.imageFit === 'contain'
                            ? 'bg-[#c5a059] text-black border-[#c5a059] shadow'
                            : 'bg-[#181a2a] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                      >
                        Contain (Full Watch)
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Sizes Available
                  </label>
                  <input
                    type="text"
                    placeholder="Standard, 40mm, 42mm, XL"
                    value={prodForm.sizes}
                    onChange={e => setProdForm({ ...prodForm, sizes: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Luxury timepiece details, stainless steel casing, chronograph features..."
                    value={prodForm.description}
                    onChange={e => setProdForm({ ...prodForm, description: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold py-3 rounded-xl uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>{editingProdId ? 'Update Product' : 'Save Product'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Products List & Filters (8 Columns) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Search & Filters Controls */}
              <div className="bg-[#121420] p-4 rounded-2xl border border-gray-800/90 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Category Filter */}
                  <div className="flex items-center space-x-1.5 text-xs text-gray-300">
                    <Filter size={14} className="text-[#c5a059]" />
                    <select
                      value={productCategoryFilter}
                      onChange={(e) => setProductCategoryFilter(e.target.value)}
                      className="bg-[#181a2a] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-[#181a2a] p-1 rounded-xl border border-gray-800">
                    <button
                      onClick={() => setProductViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${productViewMode === 'grid' ? 'bg-[#c5a059] text-black' : 'text-gray-400 hover:text-white'}`}
                      title="Grid View"
                    >
                      <Grid size={15} />
                    </button>
                    <button
                      onClick={() => setProductViewMode('table')}
                      className={`p-1.5 rounded-lg transition-colors ${productViewMode === 'table' ? 'bg-[#c5a059] text-black' : 'text-gray-400 hover:text-white'}`}
                      title="List View"
                    >
                      <List size={15} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Products Display with Drag & Drop Reordering */}
              {filteredProducts.length === 0 ? (
                <div className="bg-[#121420] p-12 text-center text-gray-500 rounded-2xl border border-gray-800 text-xs uppercase tracking-wider">
                  No products found matching your search.
                </div>
              ) : productViewMode === 'grid' ? (
                /* GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((prod) => {
                    const realIndex = products.findIndex(p => p.id === prod.id);
                    const isDragging = draggedItemIndex === realIndex;
                    const isDragOver = dragOverItemIndex === realIndex;

                    return (
                      <div 
                        key={prod.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, realIndex)}
                        onDragOver={(e) => handleDragOver(e, realIndex)}
                        onDrop={(e) => handleDrop(e, realIndex)}
                        className={`bg-[#121420] rounded-2xl border transition-all flex flex-col justify-between group shadow-xl ${
                          isDragOver 
                            ? 'border-[#c5a059] bg-[#1a1d2e] scale-[1.02]' 
                            : isDragging 
                            ? 'opacity-40 border-dashed border-gray-600' 
                            : 'border-gray-800/90 hover:border-[#c5a059]/50'
                        }`}
                      >
                        <div className="relative h-44 bg-black overflow-hidden">
                          <img 
                            src={prod.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'} 
                            alt={prod.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          
                          {/* Drag Handle Top Bar */}
                          <div className="absolute top-2 left-2 flex items-center space-x-1">
                            <span 
                              className="bg-black/80 backdrop-blur-md text-gray-300 p-1.5 rounded-lg border border-gray-700 cursor-grab active:cursor-grabbing hover:text-[#e5c158] transition-colors"
                              title="Click and drag to reorder display position"
                            >
                              <GripVertical size={14} />
                            </span>
                            <span className="bg-black/80 backdrop-blur-md text-[#e5c158] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-[#c5a059]/40">
                              {prod.category}
                            </span>
                          </div>

                          {/* Quick Up / Down Reorder Buttons */}
                          <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-gray-800">
                            <button
                              onClick={() => moveProductUpDown(realIndex, 'up')}
                              disabled={realIndex === 0}
                              className="p-1 text-gray-300 hover:text-[#e5c158] disabled:opacity-30 disabled:hover:text-gray-300 transition-colors"
                              title="Move Up in Display Order"
                            >
                              <ArrowUp size={13} />
                            </button>
                            <button
                              onClick={() => moveProductUpDown(realIndex, 'down')}
                              disabled={realIndex === products.length - 1}
                              className="p-1 text-gray-300 hover:text-[#e5c158] disabled:opacity-30 disabled:hover:text-gray-300 transition-colors"
                              title="Move Down in Display Order"
                            >
                              <ArrowDown size={13} />
                            </button>
                          </div>

                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shadow">
                              Save Rs. {(prod.originalPrice - prod.price).toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#e5c158] transition-colors">{prod.title}</h4>
                          <div className="flex items-baseline space-x-2 font-mono">
                            <span className="text-sm font-bold text-[#e5c158]">Rs. {prod.price?.toLocaleString()}</span>
                            {prod.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">Rs. {prod.originalPrice?.toLocaleString()}</span>
                            )}
                          </div>
                        </div>

                        <div className="p-4 pt-0 flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingProdId(prod.id);
                              setProdForm({
                                title: prod.title,
                                category: prod.category,
                                price: prod.price,
                                originalPrice: prod.originalPrice || '',
                                image: prod.image || '',
                                imageFit: prod.imageFit || 'cover',
                                imagePosition: prod.imagePosition || { x: 50, y: 50 },
                                description: prod.description || '',
                                sizes: prod.sizes ? prod.sizes.join(', ') : 'S, M, L, XL',
                                inStock: prod.inStock !== false
                              });
                            }}
                            className="flex-1 bg-[#1c1f30] hover:bg-[#282d45] text-gray-200 text-xs font-semibold py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-colors border border-gray-700/60"
                          >
                            <Edit2 size={13} className="text-[#c5a059]" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete product "${prod.title}"?`)) {
                                deleteProduct(prod.id);
                                showToast(`Product "${prod.title}" deleted.`);
                              }
                            }}
                            className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-xl transition-colors border border-red-800/40"
                            title="Delete Product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* TABLE VIEW */
                <div className="bg-[#121420] rounded-2xl border border-gray-800/90 shadow-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#171a2b] text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-800">
                        <th className="py-3 px-4">Order</th>
                        <th className="py-3 px-4">Item</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {filteredProducts.map((prod) => {
                        const realIndex = products.findIndex(p => p.id === prod.id);
                        const isDragging = draggedItemIndex === realIndex;
                        const isDragOver = dragOverItemIndex === realIndex;

                        return (
                          <tr 
                            key={prod.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, realIndex)}
                            onDragOver={(e) => handleDragOver(e, realIndex)}
                            onDrop={(e) => handleDrop(e, realIndex)}
                            className={`transition-colors ${
                              isDragOver ? 'bg-[#1e2238] border-l-4 border-l-[#c5a059]' :
                              isDragging ? 'opacity-40 bg-[#161826]' :
                              'hover:bg-[#181a2a]'
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <span className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-[#e5c158] p-1">
                                  <GripVertical size={15} />
                                </span>
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => moveProductUpDown(realIndex, 'up')}
                                    disabled={realIndex === 0}
                                    className="text-gray-500 hover:text-[#e5c158] disabled:opacity-20"
                                  >
                                    <ArrowUp size={11} />
                                  </button>
                                  <button
                                    onClick={() => moveProductUpDown(realIndex, 'down')}
                                    disabled={realIndex === products.length - 1}
                                    className="text-gray-500 hover:text-[#e5c158] disabled:opacity-20"
                                  >
                                    <ArrowDown size={11} />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={prod.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'} 
                                  alt={prod.title} 
                                  className="w-10 h-10 object-cover rounded-lg bg-black border border-gray-800"
                                />
                                <span className="font-bold text-white text-xs line-clamp-1">{prod.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              <span className="bg-[#1a1d2e] px-2.5 py-1 rounded-md text-[10px] uppercase font-bold text-[#e5c158] border border-gray-800">
                                {prod.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-[#e5c158]">
                              Rs. {prod.price?.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProdId(prod.id);
                                  setProdForm({
                                    title: prod.title,
                                    category: prod.category,
                                    price: prod.price,
                                    originalPrice: prod.originalPrice || '',
                                    image: prod.image || '',
                                    imageFit: prod.imageFit || 'cover',
                                    imagePosition: prod.imagePosition || { x: 50, y: 50 },
                                    description: prod.description || '',
                                    sizes: prod.sizes ? prod.sizes.join(', ') : 'S, M, L, XL',
                                    inStock: prod.inStock !== false
                                  });
                                }}
                                className="p-1.5 bg-[#1c1f30] hover:bg-[#282d45] text-[#c5a059] rounded-lg transition-colors inline-flex items-center"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${prod.title}"?`)) {
                                    deleteProduct(prod.id);
                                    showToast(`Product deleted.`);
                                  }
                                }}
                                className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors inline-flex items-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

          </div>
        )}

        {/* --- CATEGORIES TAB --- */}
        {adminTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Form (4 Cols) */}
            <div className="lg:col-span-4 bg-[#121420] p-6 rounded-2xl border border-gray-800/90 shadow-xl h-fit">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Layers className="text-[#c5a059]" size={18} />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {editingCatId ? 'Edit Category' : 'Add New Category'}
                  </h3>
                </div>
                {editingCatId && (
                  <button 
                    onClick={() => {
                      setEditingCatId(null);
                      setCatForm({ name: '', image: '', description: '' });
                    }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              <form onSubmit={handleCategorySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chrono, Vault, Smart"
                    value={catForm.name}
                    onChange={e => setCatForm({ ...catForm, name: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                {/* Category Cover Image Upload (File from Device OR Paste URL) */}
                <div className="space-y-2">
                  <label className="block uppercase font-semibold text-gray-300">
                    Cover Image (Upload or Link)
                  </label>

                  <label className="flex items-center justify-center space-x-2 bg-[#181a2a] hover:bg-[#22253b] text-[#e5c158] border border-[#c5a059]/40 rounded-xl px-3.5 py-2.5 cursor-pointer transition-colors shadow">
                    <Upload size={15} />
                    <span className="font-semibold text-xs">Choose Image from PC / Mobile...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCategoryImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center space-x-2 my-1">
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold">OR PASTE URL</span>
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                  </div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={catForm.image}
                    onChange={e => setCatForm({ ...catForm, image: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                  
                  {catForm.image && (
                    <div className="mt-2 h-28 rounded-xl overflow-hidden border border-[#c5a059]/40 bg-black relative">
                      <img src={catForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setCatForm(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                        title="Remove Image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Brief overview of this luxury collection..."
                    value={catForm.description}
                    onChange={e => setCatForm({ ...catForm, description: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold py-3 rounded-xl uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>{editingCatId ? 'Update Category' : 'Save Category'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Categories Cards Grid (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <span>Active Categories ({categories.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const count = products.filter(p => p.category === cat.name).length;
                  return (
                    <div key={cat.id} className="bg-[#121420] p-5 rounded-2xl border border-gray-800/90 shadow-xl flex items-center justify-between space-x-4 hover:border-[#c5a059]/40 transition-all group">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={cat.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'} 
                          alt={cat.name} 
                          className="w-16 h-16 object-cover rounded-xl bg-black border border-gray-800 group-hover:scale-105 transition-transform" 
                        />
                        <div>
                          <h4 className="font-bold text-white text-base group-hover:text-[#e5c158] transition-colors">{cat.name}</h4>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{cat.description || 'Luxury Collection'}</p>
                          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                            {count} {count === 1 ? 'Product' : 'Products'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => {
                            setEditingCatId(cat.id);
                            setCatForm({ name: cat.name, image: cat.image || '', description: cat.description || '' });
                          }}
                          className="p-2 bg-[#1c1f30] hover:bg-[#282d45] text-[#c5a059] rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete category "${cat.name}"?`)) {
                              deleteCategory(cat.id);
                              showToast(`Category deleted.`);
                            }
                          }}
                          className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* --- VIDEO LOOKS TAB --- */}
        {adminTab === 'looks' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Add / Edit Video Look Card */}
            <div className="bg-[#121420] p-6 md:p-8 rounded-2xl border border-gray-800/90 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-black border border-[#c5a059]/40 text-[#c5a059]">
                    <Film size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      {editingLookId ? 'Edit Video Look' : 'Upload Shop The Look Video Reel'}
                    </h3>
                    <p className="text-xs text-gray-400">Add interactive mobile video reels that show up in the "Shop The Look" slider.</p>
                  </div>
                </div>

                {editingLookId && (
                  <button
                    onClick={() => {
                      setEditingLookId(null);
                      setLookForm({ title: '', videoUrl: '', poster: '', productId: products[0]?.id || 'prod-1' });
                    }}
                    className="text-xs text-gray-400 hover:text-white flex items-center space-x-1"
                  >
                    <X size={14} />
                    <span>Cancel Edit</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleLookSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                      Reel Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Oak Chrono Showcase"
                      value={lookForm.title}
                      onChange={(e) => setLookForm({ ...lookForm, title: e.target.value })}
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                      Link to Store Product *
                    </label>
                    <select
                      value={lookForm.productId}
                      onChange={(e) => setLookForm({ ...lookForm, productId: e.target.value })}
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} (Rs. {p.price?.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Upload Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  
                  {/* Computer File Upload */}
                  <div className="bg-[#171a2b] p-4 rounded-xl border border-gray-800 space-y-2">
                    <label className="block text-xs font-semibold text-[#e5c158] uppercase">
                      Option A: Upload Video File from PC / Mobile
                    </label>
                    <label className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black hover:brightness-110 text-xs font-bold py-3 px-4 rounded-xl cursor-pointer transition-all shadow-md">
                      <Upload size={16} />
                      <span>Browse Local Video File...</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-gray-400">Select any MP4 video from your file manager.</p>
                  </div>

                  {/* Direct Link */}
                  <div className="bg-[#171a2b] p-4 rounded-xl border border-gray-800 space-y-2">
                    <label className="block text-xs font-semibold text-[#e5c158] uppercase">
                      Option B: Direct Video URL Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://cdn.example.com/watch-reel.mp4"
                      value={lookForm.videoUrl}
                      onChange={(e) => setLookForm({ ...lookForm, videoUrl: e.target.value })}
                      className="w-full bg-[#121420] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                    <p className="text-[10px] text-gray-400">Paste direct public .mp4 video URL.</p>
                  </div>

                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Poster Cover Image URL (Optional Preview Image)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={lookForm.poster}
                    onChange={(e) => setLookForm({ ...lookForm, poster: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Video Preview */}
                {lookForm.videoUrl && (
                  <div className="pt-2">
                    <span className="block text-xs font-bold text-[#e5c158] uppercase mb-2">Live Video Preview:</span>
                    <video
                      src={lookForm.videoUrl}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full max-w-xs h-56 object-cover rounded-xl border border-[#c5a059]/40 bg-black shadow-xl"
                    />
                  </div>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs py-3 px-8 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg shadow-[#c5a059]/20"
                  >
                    <Plus size={16} />
                    <span>{editingLookId ? 'Update Video Look' : 'Save Video Look'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Video List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Current Active Video Looks ({lookVideos?.length || 0})
              </h3>

              {(!lookVideos || lookVideos.length === 0) ? (
                <div className="bg-[#121420] p-12 text-center text-gray-500 rounded-2xl border border-gray-800 text-xs uppercase tracking-wider">
                  No video looks added yet. Use the form above to add your first video reel!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {lookVideos.map((look) => {
                    const linkedProd = products.find(p => p.id === look.productId);
                    return (
                      <div key={look.id} className="bg-[#121420] p-4 rounded-2xl border border-gray-800/90 shadow-xl flex flex-col justify-between space-y-3 hover:border-[#c5a059]/50 transition-all group">
                        
                        <div className="relative w-full h-56 bg-black rounded-xl overflow-hidden border border-gray-800">
                          <video
                            src={look.videoUrl}
                            poster={look.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-white text-sm uppercase tracking-wide truncate group-hover:text-[#e5c158] transition-colors">
                            {look.title}
                          </h4>
                          <p className="text-xs text-[#c5a059] mt-0.5 truncate font-medium">
                            Linked: {linkedProd ? linkedProd.title : look.productId}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 pt-2 border-t border-gray-800">
                          <button
                            onClick={() => handleEditLook(look)}
                            className="flex-1 bg-[#1c1f30] hover:bg-[#282d45] text-gray-200 text-xs font-semibold py-2 rounded-xl flex items-center justify-center space-x-1 transition-colors border border-gray-700/60"
                          >
                            <Edit2 size={13} className="text-[#c5a059]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${look.title}" video look?`)) {
                                deleteLookVideo(look.id);
                                showToast(`Video look deleted.`);
                              }
                            }}
                            className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-xl transition-colors border border-red-800/40"
                            title="Delete Look"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* --- COMBO OFFERS TAB --- */}
        {adminTab === 'combos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Form (4 Cols) */}
            <div className="lg:col-span-4 bg-[#121420] p-6 rounded-2xl border border-gray-800/90 shadow-xl h-fit sticky top-24">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Tag className="text-[#c5a059]" size={18} />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {editingComboId ? 'Edit Combo Offer' : 'Add Combo Offer'}
                  </h3>
                </div>
                {editingComboId && (
                  <button 
                    onClick={() => {
                      setEditingComboId(null);
                      setComboForm({ title: '', subtitle: '', price: '', originalPrice: '', image: '', description: '' });
                    }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              <form onSubmit={handleComboSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Combo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. His & Hers Royal Duo Pair"
                    value={comboForm.title}
                    onChange={e => setComboForm({ ...comboForm, title: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Subtitle / Included Items
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Oak Chrono + Noir Quartz"
                    value={comboForm.subtitle}
                    onChange={e => setComboForm({ ...comboForm, subtitle: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                      Bundle Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="24900"
                      value={comboForm.price}
                      onChange={e => setComboForm({ ...comboForm, price: e.target.value })}
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                      Original Price (Rs.)
                    </label>
                    <input
                      type="number"
                      placeholder="31000"
                      value={comboForm.originalPrice}
                      onChange={e => setComboForm({ ...comboForm, originalPrice: e.target.value })}
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Combo Image Upload (File from Device OR Paste URL) */}
                <div className="space-y-2">
                  <label className="block uppercase font-semibold text-gray-300">
                    Combo Image (Upload or Link)
                  </label>

                  <label className="flex items-center justify-center space-x-2 bg-[#181a2a] hover:bg-[#22253b] text-[#e5c158] border border-[#c5a059]/40 rounded-xl px-3.5 py-2.5 cursor-pointer transition-colors shadow">
                    <Upload size={15} />
                    <span className="font-semibold text-xs">Choose Image from PC / Mobile...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleComboImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center space-x-2 my-1">
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold">OR PASTE URL</span>
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                  </div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={comboForm.image}
                    onChange={e => setComboForm({ ...comboForm, image: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                  
                  {comboForm.image && (
                    <div className="mt-2 h-28 rounded-xl overflow-hidden border border-[#c5a059]/40 bg-black relative">
                      <img src={comboForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setComboForm(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                        title="Remove Image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block uppercase font-semibold text-gray-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Details about what is included in this bundle deal..."
                    value={comboForm.description}
                    onChange={e => setComboForm({ ...comboForm, description: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold py-3 rounded-xl uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>{editingComboId ? 'Update Combo Offer' : 'Save Combo Offer'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Combo Offers (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <span>Active Combo Deals ({comboOffers?.length || 0})</span>
              </h3>

              {(!comboOffers || comboOffers.length === 0) ? (
                <div className="bg-[#121420] p-12 text-center text-gray-500 rounded-2xl border border-gray-800 text-xs uppercase tracking-wider">
                  No combo offers created yet. Create one using the form!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {comboOffers.map((combo) => (
                    <div key={combo.id} className="bg-[#121420] p-4 rounded-2xl border border-gray-800/90 shadow-xl flex flex-col justify-between space-y-3 hover:border-[#c5a059]/40 transition-all group">
                      
                      <div className="relative h-48 bg-black rounded-xl overflow-hidden border border-gray-800">
                        <img 
                          src={combo.image || 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'} 
                          alt={combo.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {combo.saveAmount > 0 && (
                          <span className="absolute top-2 left-2 bg-[#c5a059] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                            Save Rs. {combo.saveAmount.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#e5c158] transition-colors">
                          {combo.title}
                        </h4>
                        {combo.subtitle && (
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{combo.subtitle}</p>
                        )}
                        <div className="flex items-baseline space-x-2 font-mono mt-1">
                          <span className="text-sm font-bold text-[#e5c158]">Rs. {combo.price?.toLocaleString()}</span>
                          {combo.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">Rs. {combo.originalPrice?.toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2 border-t border-gray-800">
                        <button
                          onClick={() => {
                            setEditingComboId(combo.id);
                            setComboForm({
                              title: combo.title,
                              subtitle: combo.subtitle || '',
                              price: combo.price,
                              originalPrice: combo.originalPrice || '',
                              image: combo.image || '',
                              description: combo.description || ''
                            });
                          }}
                          className="flex-1 bg-[#1c1f30] hover:bg-[#282d45] text-gray-200 text-xs font-semibold py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-colors border border-gray-700/60"
                        >
                          <Edit2 size={13} className="text-[#c5a059]" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete combo offer "${combo.title}"?`)) {
                              deleteComboOffer(combo.id);
                              showToast(`Combo offer deleted.`);
                            }
                          }}
                          className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-xl transition-colors border border-red-800/40"
                          title="Delete Combo Offer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {adminTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Orders Header & Search */}
            <div className="bg-[#121420] p-4 rounded-2xl border border-gray-800/90 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
              
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search order ID, customer, or phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-xs text-gray-400 font-semibold uppercase">Status:</span>
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-[#c5a059] text-black font-bold shadow'
                        : 'bg-[#181a2a] text-gray-400 hover:text-white border border-gray-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

            </div>

            {/* Orders Feed */}
            {filteredOrders.length === 0 ? (
              <div className="bg-[#121420] p-16 text-center text-gray-500 rounded-2xl border border-gray-800 text-xs uppercase tracking-wider">
                No orders match your filter criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div key={ord.id} className="bg-[#121420] p-6 rounded-2xl border border-gray-800/90 shadow-xl space-y-4 hover:border-gray-700 transition-all">
                    
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-800 pb-4 gap-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-base font-bold text-[#e5c158]">{ord.id}</span>
                        <span className="text-xs text-gray-400 bg-[#181a2a] px-3 py-1 rounded-full border border-gray-800">
                          {ord.date}
                        </span>
                      </div>

                      {/* Interactive Status Selector Dropdown */}
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400 uppercase font-semibold">Change Status:</span>
                        <select
                          value={ord.status || 'Pending'}
                          onChange={(e) => {
                            updateOrderStatus(ord.id, e.target.value);
                            showToast(`Order ${ord.id} status set to ${e.target.value}!`);
                          }}
                          className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition-colors ${
                            ord.status === 'Delivered' ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60' :
                            ord.status === 'Shipped' ? 'bg-purple-950 text-purple-300 border-purple-700/60' :
                            ord.status === 'Processing' ? 'bg-blue-950 text-blue-300 border-blue-700/60' :
                            'bg-amber-950 text-amber-300 border-amber-700/60'
                          }`}
                        >
                          <option value="Pending" className="bg-black text-amber-300">Pending 🟡</option>
                          <option value="Processing" className="bg-black text-blue-300">Processing 🔵</option>
                          <option value="Shipped" className="bg-black text-purple-300">Shipped 🟣</option>
                          <option value="Delivered" className="bg-black text-emerald-300">Delivered 🟢</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Delete order ${ord.id}?`)) {
                              deleteOrder(ord.id);
                              showToast(`Order deleted.`);
                            }
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>

                    {/* Order Details Body */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                      
                      {/* Customer Details (5 Cols) */}
                      <div className="md:col-span-5 bg-[#171a2b] p-4 rounded-xl border border-gray-800 space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a059] block mb-1">
                          Customer Delivery Info
                        </span>
                        <p className="text-white font-bold text-sm">{ord.customer?.name}</p>
                        
                        <div className="flex items-center space-x-2 text-gray-300 pt-1">
                          <Phone size={13} className="text-[#c5a059]" />
                          <span>{ord.customer?.phone}</span>
                          <a 
                            href={`https://wa.me/${ord.customer?.phone?.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-emerald-950 text-emerald-400 hover:underline px-2 py-0.5 rounded border border-emerald-800"
                          >
                            WhatsApp
                          </a>
                        </div>

                        <p className="text-gray-300 leading-relaxed pt-1">
                          <strong className="text-gray-400">Address:</strong> {ord.customer?.address}, {ord.customer?.city}
                        </p>

                        <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-[11px]">
                          <span className="text-gray-400 uppercase">Payment Method:</span>
                          <span className="font-bold text-[#e5c158] uppercase bg-black px-2.5 py-0.5 rounded border border-gray-800">
                            {ord.customer?.paymentMethod || 'Cash on Delivery'}
                          </span>
                        </div>
                      </div>

                      {/* Items Ordered (7 Cols) */}
                      <div className="md:col-span-7 bg-[#171a2b] p-4 rounded-xl border border-gray-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a059] block mb-2">
                            Order Items ({ord.items?.length || 0})
                          </span>

                          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {ord.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-[#121420] p-2.5 rounded-lg border border-gray-800">
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={item.product?.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'} 
                                    alt={item.product?.title} 
                                    className="w-9 h-9 object-cover rounded-md bg-black"
                                  />
                                  <div>
                                    <h5 className="font-bold text-white text-xs line-clamp-1">{item.product?.title}</h5>
                                    <span className="text-[10px] text-gray-400">Size: {item.size} | Qty: {item.quantity}</span>
                                  </div>
                                </div>
                                <span className="font-mono font-bold text-[#e5c158] text-xs">
                                  Rs. {(item.product?.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-800 flex justify-between items-center font-mono">
                          <span className="text-xs uppercase font-bold text-gray-300">Total Order Amount:</span>
                          <span className="text-base font-black text-[#e5c158]">
                            Rs. {ord.total?.toLocaleString()}
                          </span>
                        </div>

                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* --- PAYMENT & STORE SETTINGS TAB --- */}
        {adminTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="bg-[#11131d]/90 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[#c5a059] text-xs font-semibold uppercase tracking-wider mb-1">
                  <Settings size={16} />
                  <span>Payment & Contact Configuration</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
                  Payment & Store Settings
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Update your JazzCash, EasyPaisa, Bank account details, advance DC fee, and WhatsApp support contact shown to customers.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  updatePaymentSettings(settingForm);
                  setToast({ type: 'success', message: '✓ Payment and store settings saved successfully!' });
                  setTimeout(() => setToast(null), 3000);
                }}
                className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer whitespace-nowrap"
              >
                <Save size={16} />
                <span>Save All Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form Settings (2 Cols) */}
              <div className="lg:col-span-2 bg-[#11131d]/90 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 shadow-xl space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
                  <CreditCard size={17} />
                  <span>Edit Payment Account Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* JazzCash / EasyPaisa */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                      JazzCash & EasyPaisa Number *
                    </label>
                    <input
                      type="text"
                      value={settingForm.jazzcashNumber}
                      onChange={(e) => setSettingForm({ ...settingForm, jazzcashNumber: e.target.value })}
                      placeholder="e.g. 03024000389"
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  {/* Account Title */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                      Account Title (Owner Name) *
                    </label>
                    <input
                      type="text"
                      value={settingForm.accountTitle}
                      onChange={(e) => setSettingForm({ ...settingForm, accountTitle: e.target.value })}
                      placeholder="e.g. Umar Huzaifa"
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      value={settingForm.bankName}
                      onChange={(e) => setSettingForm({ ...settingForm, bankName: e.target.value })}
                      placeholder="e.g. UBL Bank"
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  {/* Bank Account Number */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                      Bank Account / IBAN Number *
                    </label>
                    <input
                      type="text"
                      value={settingForm.bankAccountNumber}
                      onChange={(e) => setSettingForm({ ...settingForm, bankAccountNumber: e.target.value })}
                      placeholder="e.g. 0865395419159"
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  {/* Advance DC Fee */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                      Advance DC Fee Amount (Rs.) *
                    </label>
                    <input
                      type="text"
                      value={settingForm.advanceAmount}
                      onChange={(e) => setSettingForm({ ...settingForm, advanceAmount: e.target.value })}
                      placeholder="e.g. 300"
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  {/* WhatsApp Contact */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                      WhatsApp Support Phone Number *
                    </label>
                    <input
                      type="text"
                      value={settingForm.whatsappNumber}
                      onChange={(e) => setSettingForm({ ...settingForm, whatsappNumber: e.target.value })}
                      placeholder="e.g. 923024000389"
                      className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      updatePaymentSettings(settingForm);
                      setToast({ type: 'success', message: '✓ Payment and store settings saved successfully!' });
                      setTimeout(() => setToast(null), 3000);
                    }}
                    className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Save size={15} />
                    <span>Save Payment Settings</span>
                  </button>
                </div>

                {/* Admin Login Credentials Section */}
                <div className="pt-6 border-t border-gray-800/80 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
                    <Lock size={17} />
                    <span>Admin Security & Login Credentials</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Admin ID */}
                    <div>
                      <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                        Admin ID / Username *
                      </label>
                      <input
                        type="text"
                        value={authForm.username}
                        onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                        placeholder="Default: admin"
                        className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors font-mono"
                      />
                    </div>

                    {/* Admin Password */}
                    <div>
                      <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                        Admin Password *
                      </label>
                      <input
                        type="text"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                        placeholder="Default: admin123"
                        className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <p className="text-[11px] text-gray-400">
                      🔒 Change Admin login ID and password here.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (!authForm.username.trim() || !authForm.password.trim()) {
                          setToast({ type: 'error', message: 'Admin ID and Password cannot be empty!' });
                          setTimeout(() => setToast(null), 3000);
                          return;
                        }
                        updateAdminAuth(authForm);
                        setToast({ type: 'success', message: '✓ Admin Username & Password updated successfully!' });
                        setTimeout(() => setToast(null), 3000);
                      }}
                      className="bg-[#181a2a] border border-[#c5a059] text-[#e5c158] hover:bg-[#c5a059] hover:text-black font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <Save size={15} />
                      <span>Update Credentials</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Live Preview Card (1 Col) */}
              <div className="bg-[#11131d]/90 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 shadow-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
                  <Eye size={17} />
                  <span>Live Customer Preview</span>
                </h4>

                <p className="text-xs text-gray-400">
                  This is how customer payment options look during Checkout & Confirmation:
                </p>

                <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs text-amber-950 font-mono space-y-1.5 shadow-md">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-900 text-[11px] uppercase mb-1">
                    <AlertCircle size={15} className="text-amber-600" />
                    <span>Advance Payment Details</span>
                  </div>
                  <p><strong>JazzCash / EasyPaisa:</strong> <span className="text-black font-bold">{settingForm.jazzcashNumber || '03024000389'}</span></p>
                  <p><strong>{settingForm.bankName || 'Bank Account'}:</strong> <span className="text-black font-bold">{settingForm.bankAccountNumber || '0865395419159'}</span></p>
                  <p><strong>Account Title:</strong> <span className="text-black font-bold">{settingForm.accountTitle || 'Umar Huzaifa'}</span></p>
                  <p className="text-[11px] text-amber-800 font-sans pt-1 border-t border-amber-200/60 mt-1">Please send Rs. {settingForm.advanceAmount || '300'} DC advance after placing order.</p>
                </div>

                <div className="bg-[#181a2a] p-3 rounded-xl border border-gray-800 text-xs text-gray-300 space-y-1">
                  <p className="text-[#e5c158] font-bold">📲 WhatsApp Confirmation Number:</p>
                  <p className="font-mono text-white text-sm">{settingForm.whatsappNumber || '923024000389'}</p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
