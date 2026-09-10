import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Send, Mail } from 'lucide-react';

const Footer = () => {
  const { categories, openCategoryPage, setCurrentView, setSelectedCategory, setIsTrackOrderOpen, paymentSettings, siteConfig } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const cleanWhatsappNumber = (paymentSettings?.whatsappNumber || '923024000389').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#070707] text-white border-t border-[#c5a059]/30 py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Logo */}
        <div 
          onClick={() => { setCurrentView('store'); setSelectedCategory('All'); }}
          className="cursor-pointer bg-white/95 px-4 py-1.5 rounded-xl border-2 border-[#c5a059] shadow-lg shadow-[#c5a059]/20 hover:scale-105 transition-transform"
        >
          <img 
            src={siteConfig?.logoUrl || '/logo.png'} 
            alt="Wazum Logo" 
            className="h-10 md:h-13 w-auto object-contain max-w-[160px] md:max-w-[220px]"
          />
        </div>

        {/* Category & Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs md:text-sm font-extralight tracking-widest text-gray-300">
          <button onClick={() => { setCurrentView('store'); setSelectedCategory('All'); }} className="hover:text-[#e5c158] transition-colors cursor-pointer uppercase">
            Home
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => openCategoryPage(cat.name)}
              className="hover:text-[#e5c158] transition-colors cursor-pointer uppercase"
            >
              {cat.name}
            </button>
          ))}
          <button 
            onClick={() => setIsTrackOrderOpen(true)} 
            className="text-[#e5c158] hover:text-white transition-colors cursor-pointer uppercase font-medium flex items-center space-x-1"
          >
            <span>📦 Track Order</span>
          </button>
        </div>

        {/* Customer Support Contact Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs md:text-sm text-gray-300 font-light tracking-wider">
          <div className="flex items-center space-x-2 bg-[#121212] border border-[#c5a059]/30 px-4 py-2 rounded-full shadow-md">
            <Mail size={15} className="text-[#c5a059]" />
            <span className="text-gray-400">Email:</span>
            <a 
              href={`mailto:${paymentSettings?.supportEmail || 'umarjoon29@gmail.com'}`} 
              className="text-[#e5c158] hover:underline font-medium transition-colors"
            >
              {paymentSettings?.supportEmail || 'umarjoon29@gmail.com'}
            </a>
          </div>

          <div className="flex items-center space-x-2 bg-[#121212] border border-[#c5a059]/30 px-4 py-2 rounded-full shadow-md">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="text-emerald-400">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span className="text-gray-400">WhatsApp:</span>
            <a 
              href={`https://wa.me/${cleanWhatsappNumber}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e5c158] hover:underline font-medium transition-colors"
            >
              +92 302 4000389
            </a>
          </div>
        </div>

        {/* Email Subscription Box */}
        <div className="w-full max-w-md my-2">
          <form onSubmit={handleSubscribe} className="flex items-center bg-[#141414] border border-[#c5a059]/40 rounded-full p-1.5 shadow-lg">
            <input 
              type="email"
              required
              placeholder="Enter your VIP email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent px-4 py-2 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-[#c5a059] text-black hover:bg-[#b8952b] font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Subscribe</span>
              <Send size={14} />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-[#e5c158] font-light mt-2.5 text-center animate-fadeIn">
              ✓ Thank you for subscribing to Wazum VIP Club!
            </p>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-4 pt-1">
          <a 
            href={`https://wa.me/${cleanWhatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp" 
            className="w-9 h-9 rounded-full bg-[#141414] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
          <a 
            href={siteConfig?.instagramUrl || 'https://www.instagram.com/wazum_store?igsi=MWgwdnJqdDIybGgxMQ=='} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="w-9 h-9 rounded-full bg-[#141414] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a 
            href={siteConfig?.facebookUrl || 'https://www.facebook.com/share/1CUyJT7Dah/'} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook" 
            className="w-9 h-9 rounded-full bg-[#141414] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
          </a>
          <a 
            href={siteConfig?.tiktokUrl || 'https://www.tiktok.com/@wazum_store?_r=1&_t=ZN-99TtN1KGcVS'} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="TikTok" 
            className="w-9 h-9 rounded-full bg-[#141414] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] hover:bg-[#FE2C55] hover:text-white hover:border-[#FE2C55] transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.58a6.34 6.34 0 0 0-5.38 6.22 6.34 6.34 0 1 0 10.72-4.52A8.32 8.32 0 0 0 20 10.15V6.69z"/></svg>
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-[#c5a059]/30"></div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] font-extralight text-gray-400 tracking-widest uppercase">
          <span>{siteConfig?.footerCopyright || '© 2026 WAZUM LUXURY STORE. ALL RIGHTS RESERVED.'}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

