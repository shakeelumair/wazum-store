import React from 'react';
import { useStore } from '../context/StoreContext';
import { Eye, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { setSelectedProduct } = useStore();

  return (
    <div className="group bg-[#141414] rounded-xl overflow-hidden border border-[#c5a059]/20 hover:border-[#c5a059]/60 shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          style={{
            objectPosition: product.imagePosition ? `${product.imagePosition.x}% ${product.imagePosition.y}%` : '50% 50%'
          }}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100 ${
            product.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'
          }`}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Category Tag */}
        <span className="absolute top-2 left-2 bg-black/80 text-[#e5c158] border border-[#c5a059]/40 text-[8px] md:text-[10px] uppercase font-light tracking-wider px-2 py-0.5 rounded">
          {product.category}
        </span>

        {/* Desktop Quick Actions Hover */}
        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center space-x-3 p-4">
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
            className="px-4 py-2 bg-[#c5a059] text-black font-bold rounded-full flex items-center justify-center space-x-1.5 shadow-lg hover:bg-[#e5c158] transition-all transform hover:scale-105 text-xs uppercase tracking-wider cursor-pointer"
            title="View & Buy Now"
          >
            <Eye size={16} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4 flex flex-col flex-grow justify-between bg-[#141414]">
        <div>
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-light text-white text-xs md:text-sm tracking-wide hover:text-[#e5c158] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.title}
          </h3>
          <p className="text-gray-400 text-[10px] md:text-xs mt-0.5 line-clamp-1 font-extralight">
            {product.description}
          </p>
        </div>

        {/* Price & Buy Now button */}
        <div className="mt-3 pt-2.5 border-t border-gray-800 flex items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-1.5">
            <span className="font-semibold text-xs md:text-base text-[#e5c158]">
              Rs. {product.price?.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] md:text-xs text-gray-500 line-through">
                Rs. {product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedProduct(product)}
            className="bg-[#c5a059] text-black hover:bg-[#e5c158] px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-1 shadow-md whitespace-nowrap"
          >
            <span>Buy Now</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
