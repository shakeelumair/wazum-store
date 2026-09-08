import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

const ProductModal = () => {
  const { selectedProduct, setSelectedProduct, buyNow, setIsCheckoutOpen } = useStore();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const sizes = selectedProduct.sizes && selectedProduct.sizes.length > 0 
    ? selectedProduct.sizes 
    : ['S', 'M', 'L', 'XL'];

  const handleOrderNow = () => {
    buyNow(selectedProduct, selectedSize, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 text-white hover:bg-black rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-[#090a0f] relative aspect-square md:aspect-auto flex items-center justify-center">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{
              objectPosition: selectedProduct.imagePosition ? `${selectedProduct.imagePosition.x}% ${selectedProduct.imagePosition.y}%` : '50% 50%'
            }}
            className={`w-full h-full ${
              selectedProduct.imageFit === 'contain' ? 'object-contain p-6' : 'object-cover'
            }`}
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              {selectedProduct.category}
            </span>
            <h2 className="text-xl md:text-2xl font-light text-black tracking-wide mt-1">
              {selectedProduct.title}
            </h2>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mt-3">
              <span className="text-2xl font-semibold text-black">
                Rs. {selectedProduct.price?.toLocaleString()}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {selectedProduct.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed mt-4">
              {selectedProduct.description}
            </p>

            {/* Size Selector */}
            <div className="mt-6">
              <label className="block text-xs uppercase tracking-widest font-medium text-gray-700 mb-2">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-black text-white border-black shadow'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="block text-xs uppercase tracking-widest font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:text-black font-semibold text-sm"
                >
                  -
                </button>
                <span className="px-4 text-sm font-medium text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-gray-600 hover:text-black font-semibold text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <button
              onClick={handleOrderNow}
              className="w-full bg-[#c5a059] text-black py-3.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg hover:bg-[#e5c158] transition-colors cursor-pointer"
            >
              <span>ORDER NOW</span>
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-between text-[11px] text-gray-500 font-light pt-2">
              <span className="flex items-center gap-1">
                <Truck size={14} /> Free Shipping Over 10k
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} /> 100% Authentic
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductModal;
