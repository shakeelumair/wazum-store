import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

const CartToast = () => {
  const { cartNotification, setCartNotification, setIsCartOpen, setIsCheckoutOpen } = useStore();

  if (!cartNotification) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-bounce-short">
      <div className="bg-[#121212] border border-[#c5a059] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl shadow-[#c5a059]/20 flex items-center space-x-3.5 max-w-sm sm:max-w-md backdrop-blur-md">
        
        {/* Product Image */}
        {cartNotification.image && (
          <img 
            src={cartNotification.image} 
            alt={cartNotification.title} 
            className="w-12 h-14 object-cover rounded-lg border border-[#c5a059]/40 bg-black flex-shrink-0"
          />
        )}

        {/* Info */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center space-x-1.5 text-[#e5c158] text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Added to Cart!</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-white line-clamp-1 mt-0.5">
            {cartNotification.title}
          </p>
          <p className="text-[11px] text-gray-400">
            Qty: {cartNotification.quantity || 1} • <span className="text-[#c5a059] font-medium">Rs. {cartNotification.price?.toLocaleString()}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-1 pl-2 border-l border-gray-800 flex-shrink-0">
          <button
            onClick={() => {
              setCartNotification(null);
              setIsCartOpen(true);
            }}
            className="bg-[#c5a059] text-black hover:bg-[#e5c158] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md transition-colors flex items-center justify-center space-x-1 cursor-pointer"
          >
            <ShoppingBag size={12} />
            <span>View Cart</span>
          </button>
          <button
            onClick={() => setCartNotification(null)}
            className="text-gray-400 hover:text-white p-0.5 text-[10px] text-center cursor-pointer"
          >
            Dismiss
          </button>
        </div>

        {/* Close X */}
        <button 
          onClick={() => setCartNotification(null)}
          className="text-gray-400 hover:text-white p-1 ml-1 cursor-pointer"
        >
          <X size={14} />
        </button>

      </div>
    </div>
  );
};

export default CartToast;
