import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Hero = () => {
  const { siteConfig } = useStore();

  if (siteConfig?.showHero === false) {
    return null;
  }

  const bgImage = siteConfig?.heroImageUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=80';
  const tagline = siteConfig?.heroTagline ?? '';
  const title = siteConfig?.heroTitle ?? '';
  const subtitle = siteConfig?.heroSubtitle ?? '';
  const ctaText = siteConfig?.heroCtaText ?? '';

  const hasContent = Boolean(tagline || title || subtitle || ctaText);

  return (
    <section className="relative w-full h-[75vh] min-h-[500px] max-h-[750px] bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center border-b border-[#c5a059]/20">
      {/* Luxury Watch Macro Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${hasContent ? 'opacity-50' : 'opacity-100'}`}
        style={{ 
          backgroundImage: `url('${bgImage}')` 
        }}
      />
      
      {/* Dark Overlay only if text content exists */}
      {hasContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/70" />
      )}

      {/* Hero Content Overlay */}
      {hasContent && (
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Optional Tagline Badge */}
          {tagline && (
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#c5a059] bg-black/60 border border-[#c5a059]/40 px-3 py-1 rounded-full mb-3 shadow">
              {tagline}
            </span>
          )}

          {/* Title */}
          {title && (
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-xs font-light tracking-[0.3em] uppercase text-[#c5a059] mb-2 opacity-90">
                ✦ EXCLUSIVE TIMEPIECES ✦
              </span>

              <h1 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.22em] uppercase leading-none bg-gradient-to-r from-[#ffffff] via-[#f3e7c4] to-[#c5a059] bg-clip-text text-transparent italic drop-shadow-[0_8px_25px_rgba(197,160,89,0.4)] whitespace-nowrap py-1"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
              >
                {title}
              </h1>

              <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mt-3 opacity-90" />
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-300 font-extralight tracking-wider max-w-xl mb-6 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Button */}
          {ctaText && (
            <button 
              onClick={() => {
                const catSection = document.getElementById('categories-section');
                if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 sm:mt-14 bg-[#c5a059] text-black hover:bg-[#b8952b] transition-all px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center space-x-2 shadow-xl shadow-[#c5a059]/20 hover:scale-105 cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowDown size={16} />
            </button>
          )}

        </div>
      )}
    </section>
  );
};

export default Hero;
