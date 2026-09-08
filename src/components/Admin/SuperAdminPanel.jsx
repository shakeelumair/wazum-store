import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Crown, Save, RefreshCw, Download, Upload, Eye, Shield, Lock,
  Layout, Image as ImageIcon, Sliders, ToggleLeft, ToggleRight, Sparkles,
  ArrowLeft, Check, AlertCircle, FileJson, Layers, Package, ShoppingBag, Truck
} from 'lucide-react';

const SuperAdminPanel = () => {
  const {
    siteConfig,
    updateSiteConfig,
    adminAuth,
    updateAdminAuth,
    superAdminAuth,
    updateSuperAdminAuth,
    logoutSuperAdmin,
    setCurrentView,
    categories,
    products,
    orders,
    lookVideos,
    comboOffers,
    paymentSettings,
    setProducts,
    setCategories
  } = useStore();

  const [activeTab, setActiveTab] = useState('brand'); // 'brand', 'hero', 'sections', 'shipping', 'social', 'security', 'backup'
  const [configForm, setConfigForm] = useState({ ...siteConfig });
  const [clientForm, setClientForm] = useState({ ...adminAuth });
  const [superForm, setSuperForm] = useState({ ...superAdminAuth });
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveConfig = () => {
    updateSiteConfig(configForm);
    showToast('✓ Store visual & text configuration saved live across website!');
  };

  const handleSaveClientAuth = () => {
    if (!clientForm.username.trim() || !clientForm.password.trim()) {
      showToast('Client Username & Password cannot be empty!', 'error');
      return;
    }
    updateAdminAuth(clientForm);
    showToast('✓ Client Admin login credentials updated!');
  };

  const handleResetClientAuth = () => {
    const defaultAuth = { username: 'admin', password: 'admin123' };
    setClientForm(defaultAuth);
    updateAdminAuth(defaultAuth);
    showToast('✓ Client Admin password & ID reset to default (admin / admin123)!');
  };

  const handleSaveSuperAuth = () => {
    if (!superForm.username.trim() || !superForm.password.trim()) {
      showToast('Super Admin Master ID and Password cannot be empty!', 'error');
      return;
    }
    updateSuperAdminAuth(superForm);
    showToast('✓ Super Admin Master Key updated!');
  };

  // Export Complete Backup JSON
  const handleExportBackup = () => {
    const backupData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      siteConfig,
      paymentSettings,
      categories,
      products,
      orders,
      lookVideos,
      comboOffers,
      adminAuth
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wazum_store_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('✓ Master Database JSON Backup downloaded successfully!');
  };

  // Import Backup JSON
  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.siteConfig) updateSiteConfig(data.siteConfig);
        if (data.categories) setCategories(data.categories);
        if (data.products) setProducts(data.products);
        if (data.adminAuth) updateAdminAuth(data.adminAuth);
        showToast('✓ Complete Store Backup restored successfully!');
      } catch (err) {
        showToast('Invalid backup JSON file format!', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-white font-sans pb-24 selection:bg-[#c5a059] selection:text-black">
      
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

      {/* Top Super Admin Header */}
      <header className="sticky top-0 z-40 bg-[#0b0d14]/95 backdrop-blur-md border-b-2 border-[#c5a059]/40 shadow-[0_4px_30px_rgba(197,160,89,0.15)] px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 bg-[#161825] border-2 border-[#c5a059] rounded-xl flex items-center justify-center shadow-lg">
            <Crown size={22} className="text-[#e5c158]" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-black bg-[#c5a059] px-2 py-0.5 rounded shadow">
                OWNER VAULT
              </span>
              <h1 className="text-sm md:text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-white via-[#f3e7c4] to-[#c5a059] bg-clip-text text-transparent">
                SUPER ADMIN MASTER CONTROL
              </h1>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wider">NO-CODE WEBSITE CUSTOMIZER & ARCHITECTURAL VAULT</p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button 
            onClick={() => setCurrentView('store')}
            className="bg-[#141624] border border-[#c5a059]/40 text-[#e5c158] hover:bg-[#c5a059] hover:text-black font-semibold text-xs px-4 py-2 rounded-xl uppercase tracking-wider transition-all shadow flex items-center space-x-1.5 cursor-pointer"
          >
            <Eye size={15} />
            <span className="hidden sm:inline">Preview Store</span>
          </button>

          <button 
            onClick={logoutSuperAdmin}
            className="bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-red-200 font-semibold text-xs px-3.5 py-2 rounded-xl uppercase tracking-wider transition-all shadow cursor-pointer"
          >
            <span>Exit Vault</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        
        {/* Master Section Tabs */}
        <div className="bg-[#11131d] p-2 rounded-2xl border border-[#c5a059]/30 shadow-xl mb-8 flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'brand', label: '🎨 Brand & Theme', icon: Layout },
            { id: 'hero', label: '🖼️ Hero Banner', icon: ImageIcon },
            { id: 'sections', label: '🧱 Homepage Layout', icon: Sliders },
            { id: 'shipping', label: '📦 Shipping & Rules', icon: Truck },
            { id: 'security', label: '🔒 Admin Credentials', icon: Lock },
            { id: 'backup', label: '💾 Backup & Restore', icon: FileJson }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#b8952b] text-black shadow-lg shadow-[#c5a059]/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1d2d]'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- TAB 1: BRAND & THEME --- */}
        {activeTab === 'brand' && (
          <div className="bg-[#11131d] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
              <Layout size={18} />
              <span>Brand Identity, Logo & Theme Styling</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Store Brand Name *
                </label>
                <input
                  type="text"
                  value={configForm.storeName}
                  onChange={(e) => setConfigForm({ ...configForm, storeName: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Store Logo URL / Path *
                </label>
                <input
                  type="text"
                  value={configForm.logoUrl}
                  onChange={(e) => setConfigForm({ ...configForm, logoUrl: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Footer Copyright Text *
                </label>
                <input
                  type="text"
                  value={configForm.footerCopyright}
                  onChange={(e) => setConfigForm({ ...configForm, footerCopyright: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Top Announcement Ticker Bar Text *
                </label>
                <input
                  type="text"
                  value={configForm.announcementText}
                  onChange={(e) => setConfigForm({ ...configForm, announcementText: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={handleSaveConfig}
                className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Save size={16} />
                <span>Save Live Brand Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 2: HERO BANNER --- */}
        {activeTab === 'hero' && (
          <div className="bg-[#11131d] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
              <ImageIcon size={18} />
              <span>Hero Banner Text & Background Customizer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Hero Tagline / Gold Badge Text *
                </label>
                <input
                  type="text"
                  value={configForm.heroTagline}
                  onChange={(e) => setConfigForm({ ...configForm, heroTagline: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Hero Main Headline *
                </label>
                <input
                  type="text"
                  value={configForm.heroTitle}
                  onChange={(e) => setConfigForm({ ...configForm, heroTitle: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Hero Button CTA Label *
                </label>
                <input
                  type="text"
                  value={configForm.heroCtaText}
                  onChange={(e) => setConfigForm({ ...configForm, heroCtaText: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Hero Background Image URL *
                </label>
                <input
                  type="text"
                  value={configForm.heroImageUrl}
                  onChange={(e) => setConfigForm({ ...configForm, heroImageUrl: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Hero Subtitle / Description *
                </label>
                <textarea
                  rows={3}
                  value={configForm.heroSubtitle}
                  onChange={(e) => setConfigForm({ ...configForm, heroSubtitle: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={handleSaveConfig}
                className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Save size={16} />
                <span>Save Live Hero Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 3: HOMEPAGE SECTIONS & MARQUEE --- */}
        {activeTab === 'sections' && (
          <div className="bg-[#11131d] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
              <Sliders size={18} />
              <span>Homepage Section Show / Hide Toggles & Marquee Editor</span>
            </h3>

            <div className="space-y-4">
              {/* Announcement Bar */}
              <div className="flex items-center justify-between p-4 bg-[#181a2a] rounded-xl border border-gray-800">
                <div>
                  <h4 className="text-sm font-semibold text-white">Top Announcement Bar</h4>
                  <p className="text-xs text-gray-400">Show or hide the black-and-gold top ticker above header.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigForm({ ...configForm, showAnnouncementBar: !configForm.showAnnouncementBar })}
                  className="text-[#c5a059] hover:text-white cursor-pointer"
                >
                  {configForm.showAnnouncementBar ? <ToggleRight size={36} className="text-[#c5a059]" /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>

              {/* Hero Banner */}
              <div className="flex items-center justify-between p-4 bg-[#181a2a] rounded-xl border border-gray-800">
                <div>
                  <h4 className="text-sm font-semibold text-white">Main Hero Banner</h4>
                  <p className="text-xs text-gray-400">Show or hide the large hero banner on storefront.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigForm({ ...configForm, showHero: !configForm.showHero })}
                  className="text-[#c5a059] hover:text-white cursor-pointer"
                >
                  {configForm.showHero ? <ToggleRight size={36} className="text-[#c5a059]" /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>

              {/* Marquee Ticker */}
              <div className="p-4 bg-[#181a2a] rounded-xl border border-gray-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Infinite Marquee Ticker ("APKA APNA WAZUM STORE")</h4>
                    <p className="text-xs text-gray-400">Show or hide the sliding marquee text.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfigForm({ ...configForm, showTicker: !configForm.showTicker })}
                    className="text-[#c5a059] hover:text-white cursor-pointer"
                  >
                    {configForm.showTicker ? <ToggleRight size={36} className="text-[#c5a059]" /> : <ToggleLeft size={36} className="text-gray-600" />}
                  </button>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-300 mb-1">
                    Custom Ticker Text:
                  </label>
                  <input
                    type="text"
                    value={configForm.tickerText}
                    onChange={(e) => setConfigForm({ ...configForm, tickerText: e.target.value })}
                    className="w-full bg-[#11131d] border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Shop The Look Slider */}
              <div className="flex items-center justify-between p-4 bg-[#181a2a] rounded-xl border border-gray-800">
                <div>
                  <h4 className="text-sm font-semibold text-white">Shop The Look Video Slider</h4>
                  <p className="text-xs text-gray-400">Show or hide the interactive video reel slider.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigForm({ ...configForm, showShopTheLook: !configForm.showShopTheLook })}
                  className="text-[#c5a059] hover:text-white cursor-pointer"
                >
                  {configForm.showShopTheLook ? <ToggleRight size={36} className="text-[#c5a059]" /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>

              {/* Combo Offers */}
              <div className="flex items-center justify-between p-4 bg-[#181a2a] rounded-xl border border-gray-800">
                <div>
                  <h4 className="text-sm font-semibold text-white">Combo Deals & Offers</h4>
                  <p className="text-xs text-gray-400">Show or hide the bundle deals section.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigForm({ ...configForm, showComboOffers: !configForm.showComboOffers })}
                  className="text-[#c5a059] hover:text-white cursor-pointer"
                >
                  {configForm.showComboOffers ? <ToggleRight size={36} className="text-[#c5a059]" /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={handleSaveConfig}
                className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Save size={16} />
                <span>Save Section Layout</span>
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 4: SHIPPING & RULES --- */}
        {activeTab === 'shipping' && (
          <div className="bg-[#11131d] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
              <Truck size={18} />
              <span>Checkout Policy & Free Shipping Thresholds</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Free Shipping Order Threshold (Rs.) *
                </label>
                <input
                  type="number"
                  value={configForm.freeShippingThreshold}
                  onChange={(e) => setConfigForm({ ...configForm, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Standard Shipping Fee (Rs.) *
                </label>
                <input
                  type="number"
                  value={configForm.shippingFee}
                  onChange={(e) => setConfigForm({ ...configForm, shippingFee: Number(e.target.value) })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between p-4 bg-[#181a2a] rounded-xl border border-gray-800">
                <div>
                  <h4 className="text-sm font-semibold text-white">Require Postal Code at Checkout</h4>
                  <p className="text-xs text-gray-400">Force customers to enter valid postal code when placing orders.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigForm({ ...configForm, requirePostalCode: !configForm.requirePostalCode })}
                  className="text-[#c5a059] hover:text-white cursor-pointer"
                >
                  {configForm.requirePostalCode ? <ToggleRight size={36} className="text-[#c5a059]" /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={handleSaveConfig}
                className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Save size={16} />
                <span>Save Shipping Rules</span>
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 5: SECURITY & CREDENTIALS --- */}
        {activeTab === 'security' && (
          <div className="bg-[#11131d] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
              <Lock size={18} />
              <span>Admin Credentials & Permission Manager</span>
            </h3>

            {/* Client Admin Credentials Box */}
            <div className="bg-[#161825] p-5 rounded-xl border border-gray-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Shield size={16} className="text-[#c5a059]" />
                <span>Client Admin Credentials (Given to Store Owner)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-300 mb-1">
                    Client Admin ID / Username *
                  </label>
                  <input
                    type="text"
                    value={clientForm.username}
                    onChange={(e) => setClientForm({ ...clientForm, username: e.target.value })}
                    className="w-full bg-[#11131d] border border-gray-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-300 mb-1">
                    Client Admin Password *
                  </label>
                  <input
                    type="text"
                    value={clientForm.password}
                    onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                    className="w-full bg-[#11131d] border border-gray-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetClientAuth}
                  className="w-full sm:w-auto bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-200 font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw size={14} className="text-amber-400" />
                  <span>⚡ 1-Click Reset Client Password (admin / admin123)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveClientAuth}
                  className="w-full sm:w-auto bg-[#c5a059] text-black font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-[#e5c158] transition-colors cursor-pointer"
                >
                  Update Client Admin Login
                </button>
              </div>
            </div>

            {/* Super Admin Master Credentials Box */}
            <div className="bg-[#161825] p-5 rounded-xl border border-[#c5a059]/40 space-y-4">
              <h4 className="text-sm font-bold text-[#e5c158] flex items-center space-x-2">
                <Crown size={16} className="text-[#e5c158]" />
                <span>Super Admin Master Credentials (Developer / Master Vault)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-gray-300 mb-1">
                    Super Admin Master ID *
                  </label>
                  <input
                    type="text"
                    value={superForm.username}
                    onChange={(e) => setSuperForm({ ...superForm, username: e.target.value })}
                    className="w-full bg-[#11131d] border border-gray-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gray-300 mb-1">
                    Super Admin Master Password *
                  </label>
                  <input
                    type="text"
                    value={superForm.password}
                    onChange={(e) => setSuperForm({ ...superForm, password: e.target.value })}
                    className="w-full bg-[#11131d] border border-gray-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveSuperAuth}
                  className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:brightness-110 transition-all cursor-pointer"
                >
                  Update Super Master Credentials
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 6: BACKUP & RESTORE --- */}
        {activeTab === 'backup' && (
          <div className="bg-[#11131d] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#c5a059] border-b border-gray-800 pb-3 flex items-center space-x-2">
              <FileJson size={18} />
              <span>1-Click Master Store Backup & Instant JSON Restore</span>
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed">
              Export complete store database (products, categories, orders, look videos, combo deals, settings, credentials) into a single downloadable JSON backup file. You can restore this file anytime to clone or restore the website state without writing code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Backup Download Box */}
              <div className="bg-[#161825] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <Download size={18} className="text-[#c5a059]" />
                    <span>Export Master Backup</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Download complete store snapshot in 1 click.</p>
                </div>

                <button
                  onClick={handleExportBackup}
                  className="w-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-[#e5c158] transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow"
                >
                  <Download size={16} />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              {/* Restore Box */}
              <div className="bg-[#161825] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <Upload size={18} className="text-[#c5a059]" />
                    <span>Restore Store From JSON</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Upload a previously saved JSON backup to restore website.</p>
                </div>

                <label className="w-full bg-[#1f2235] border border-[#c5a059]/40 text-[#e5c158] font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-[#c5a059] hover:text-black transition-all flex items-center justify-center space-x-2 cursor-pointer shadow">
                  <Upload size={16} />
                  <span>Upload & Restore Backup</span>
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SuperAdminPanel;
