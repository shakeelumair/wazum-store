import React from 'react';
import { useStore } from '../context/StoreContext';
import { Layers, ArrowRight } from 'lucide-react';
import ShopTheLookSlider from './ShopTheLookSlider';
import ComboOffers from './ComboOffers';
import CustomerReviews from './CustomerReviews';

const CategoryGrid = () => {
  const { categories, selectedCategory, openCategoryPage, products, siteConfig } = useStore();

  const showCategories = siteConfig?.showCategoriesGrid !== false;
  const showLook = siteConfig?.showShopTheLook !== false;
  const showTicker = siteConfig?.showTicker !== false;
  const showCombos = siteConfig?.showComboOffers !== false;
  const marqueeMsg = siteConfig?.tickerText || 'APKA APNA WAZUM STORE';

  return (
    <section id="categories-section" className="py-10 md:py-16 px-4 md:px-12 lg:px-16 w-full max-w-[1800px] mx-auto">
      
      {/* Categories Section */}
      {showCategories && (
        <>
          <div className="flex flex-col items-start text-left mb-8 md:mb-12 border-b border-[#c5a059]/20 pb-4">
            <h2 className="text-2xl md:text-4xl font-light uppercase tracking-widest text-white">
              {siteConfig?.storeName || 'Wazum Store'} Collection
            </h2>
            <div className="w-20 h-0.5 bg-[#c5a059] mt-3"></div>
          </div>

          {categories.length === 0 ? (
            <div className="bg-[#141414] rounded-2xl p-8 text-center text-gray-400 border border-dashed border-[#c5a059]/30 max-w-md mx-auto">
              <Layers size={36} className="mx-auto mb-2 text-[#c5a059]" />
              <p className="text-xs">No categories added yet. Go to Admin Panel to add categories!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6 md:gap-10">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const count = products.filter(p => p.category && p.category.trim().toLowerCase() === cat.name.trim().toLowerCase()).length;

                return (
                  <div
                    key={cat.id}
                    onClick={() => openCategoryPage(cat.name)}
                    className="group flex flex-col cursor-pointer transition-all duration-300"
                  >
                    <div 
                      className={`w-full h-56 sm:h-80 md:h-96 lg:h-[420px] bg-[#141414] rounded-xl md:rounded-2xl overflow-hidden relative border border-[#c5a059]/30 group-hover:border-[#c5a059] transition-all duration-300 shadow-xl ${
                        isSelected ? 'ring-2 ring-[#c5a059] ring-offset-2 ring-offset-black' : ''
                      }`}
                    >
                      <img
                        src={cat.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    </div>

                    <div className="pt-3 px-1 flex items-center justify-between w-full">
                      <h3 className="text-sm md:text-lg font-normal tracking-wider uppercase text-white group-hover:text-[#e5c158] transition-colors line-clamp-1">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] md:text-xs text-[#c5a059] font-light bg-[#141414] border border-[#c5a059]/30 px-2 py-0.5 rounded-md flex-shrink-0 ml-2">
                        {count} {count === 1 ? 'Item' : 'Items'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Centered Shop The Look Banner */}
      {showLook && (
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-[#c5a059]/20 flex flex-col items-center justify-center text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-serif tracking-wider uppercase text-white font-light">
            Shop The Look
          </h2>
          <div className="w-16 h-0.5 bg-[#c5a059] my-2"></div>
          <p className="text-sm md:text-lg font-light tracking-widest text-gray-300 uppercase">
            Watch. Discover. Shop instantly.
          </p>

          <ShopTheLookSlider />
        </div>
      )}

      {/* Infinite Marquee Ticker */}
      {showTicker && (
        <div className="w-full overflow-hidden bg-[#070707] py-4 md:py-5 border-y border-[#c5a059]/30 mt-12 md:mt-16 select-none relative">
          <div className="flex animate-marquee space-x-4 sm:space-x-5 items-center">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="text-base sm:text-xl md:text-2xl font-serif tracking-widest text-white uppercase font-light whitespace-nowrap flex-shrink-0">
                {marqueeMsg}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Combo Offers Section */}
      {showCombos && <ComboOffers />}

      {/* Customer Reviews Section */}
      <CustomerReviews />
    </section>
  );
};

export default CategoryGrid;
