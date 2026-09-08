import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import CategoryPage from './components/CategoryPage';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import TrackOrderModal from './components/TrackOrderModal';
import CartToast from './components/CartToast';
import AdminPanel from './components/Admin/AdminPanel';
import AdminLoginModal from './components/Admin/AdminLoginModal';
import SuperAdminPanel from './components/Admin/SuperAdminPanel';
import SuperAdminLoginModal from './components/Admin/SuperAdminLoginModal';
import Footer from './components/Footer';

function MainApp() {
  const { currentView, isAdminAuthenticated, isSuperAdminAuthenticated } = useStore();

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans antialiased text-white selection:bg-[#c5a059] selection:text-black">
      {/* Top Announcement Slider */}
      <AnnouncementBar />

      {/* Main Luxury Header */}
      <Header />

      {/* Main View Router */}
      {currentView === 'superadmin' ? (
        isSuperAdminAuthenticated ? <SuperAdminPanel /> : <SuperAdminLoginModal />
      ) : currentView === 'admin' ? (
        isAdminAuthenticated ? <AdminPanel /> : <AdminLoginModal />
      ) : currentView === 'category' ? (
        <CategoryPage />
      ) : (
        <main className="pb-20 animate-fadeIn">
          {/* Hero Banner */}
          <Hero />

          {/* Wazum Store Collection Categories Grid */}
          <CategoryGrid />
        </main>
      )}

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <TrackOrderModal />

      {/* World-Class Luxury Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

export default App;
