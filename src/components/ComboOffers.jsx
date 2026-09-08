import React from 'react';
import { useStore } from '../context/StoreContext';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';

const ComboOffers = () => {
  const { comboOffers, buyNow, setIsCheckoutOpen } = useStore();

  const handleOrderBundle = (e, combo) => {
    e.stopPropagation();
    const comboProduct = {
      id: combo.id,
      title: combo.title,
      price: combo.price,
      originalPrice: combo.originalPrice,
      image: combo.image,
      category: 'Combo Offer',
      description: combo.description,
      sizes: ['Bundle Package']
    };
    buyNow(comboProduct, 'Bundle Package', 1);
    setIsCheckoutOpen(true);
  };

  if (!comboOffers || comboOffers.length === 0) {
    return null;
  }

  return (
    <section id="combo-offers-section" className="w-full mt-12 md:mt-16 text-left">
      
      {/* Header: Combo Offers Left Aligned Bold White */}
      <div className="flex flex-col items-start space-y-1.5 mb-6">
        <div className="flex items-center space-x-2.5">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
            Combo Offers
          </h2>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-black bg-[#c5a059] px-2.5 py-0.5 rounded-full shadow flex items-center space-x-1">
            <Sparkles size={11} />
            <span>Limited Bundle Deals</span>
          </span>
        </div>
        <div className="w-16 h-0.5 bg-[#c5a059] rounded-full"></div>
      </div>

      {/* Combo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {comboOffers.map((combo) => (
          <div 
            key={combo.id}
            onClick={(e) => handleOrderBundle(e, combo)}
            className="group flex flex-col cursor-pointer transition-all duration-300 bg-[#121212] p-2.5 rounded-2xl border border-[#c5a059]/20 hover:border-[#c5a059]/60 shadow-lg"
          >
            {/* Image Box (Taller Length) */}
            <div className="w-full h-72 sm:h-96 md:h-[400px] bg-[#141414] rounded-xl overflow-hidden relative border border-[#c5a059]/30 group-hover:border-[#c5a059] transition-all duration-300 shadow-xl">
              <img
                src={combo.image}
                alt={combo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              
              {/* Savings Pill */}
              <div className="absolute top-3 left-3 bg-[#c5a059] text-black text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center space-x-1">
                <Tag size={12} />
                <span>Save Rs. {combo.saveAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Title, Price & Order Bundle Button */}
            <div className="pt-3 px-1 flex flex-col w-full text-left space-y-2">
              <h3 className="text-sm md:text-base font-normal tracking-wider uppercase text-white group-hover:text-[#e5c158] transition-colors line-clamp-1">
                {combo.title}
              </h3>

              <div className="flex items-center justify-between pt-1 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <span className="text-sm md:text-base font-semibold text-[#c5a059]">
                    Rs. {combo.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    Rs. {combo.originalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={(e) => handleOrderBundle(e, combo)}
                  className="bg-[#c5a059] text-black hover:bg-[#e5c158] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-1 shadow-md"
                >
                  <span>Order Bundle</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ComboOffers;
