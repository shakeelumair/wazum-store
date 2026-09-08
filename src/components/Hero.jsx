import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Hero = () => {
  const { siteConfig } = useStore();

  if (siteConfig?.showHero === false) {
    return null;
  }

  const bgImage = siteConfig?.heroImageUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=80';
  const tagline = siteConfig?.heroTagline || 'LUXURY DEFINED';
  const title = siteConfig?.heroTitle || 'Refined Presence';
  const subtitle = siteConfig?.heroSubtitle || '';
  const ctaText = siteConfig?.heroCtaText || 'EXPLORE TIMEPIECES';

  return (
    <section className="relative w-full h-[65vh] min-h-[440px] max-h-[700px] bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center border-b border-[#c5a059]/20">
      {/* Luxury Watch Macro Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105 transition-all duration-1000"
        style={{ 
          backgroundImage: `url('${bgImage}')` 
        }}
      />
      
      {/* Dark Gold Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/80" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Optional Tagline Badge */}
        {tagline && (
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#c5a059] bg-black/60 border border-[#c5a059]/40 px-3 py-1 rounded-full mb-3 shadow">
            {tagline}
          </span>
        )}

        {/* Stylish Title */}
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl font-light tracking-widest uppercase mb-4 leading-tight text-[#e5c158] italic shadow-sm"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          {title}
        </h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-300 font-extralight tracking-wider max-w-xl mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Button */}
        <button 
          onClick={() => {
            const catSection = document.getElementById('categories-section');
            if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#c5a059] text-black hover:bg-[#b8952b] transition-all px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center space-x-2 shadow-xl shadow-[#c5a059]/20 hover:scale-105 cursor-pointer"
        >
          <span>{ctaText}</span>
          <ArrowDown size={16} />
        </button>

      </div>
    </section>
  );
};

export default Hero;
