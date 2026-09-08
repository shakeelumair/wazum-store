import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-black text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} />
              <h2 className="text-base font-light uppercase tracking-widest">
                Shopping Bag ({cart.length})
              </h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                <ShoppingBag size={48} className="mb-3 text-gray-300 stroke-[1.2]" />
                <p className="text-base font-light text-gray-700">Your shopping bag is empty</p>
                <p className="text-xs text-gray-400 mt-1">Explore our collections and add items to your cart.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-black text-white px-6 py-2.5 rounded-full text-xs font-light tracking-widest uppercase hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-black line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-0.5 ml-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 font-light mt-0.5">
                        Size: <span className="font-normal text-black">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="inline-flex items-center border border-gray-200 rounded-md bg-gray-50 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black"
                        >
                          -
                        </button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-black">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center text-sm mb-2 text-gray-600 font-light">
                <span>Subtotal</span>
                <span className="font-semibold text-black text-base">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">
                Shipping and taxes calculated at checkout. Free shipping over Rs. 10,000.
              </p>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-black text-white py-3.5 rounded-xl text-xs md:text-sm font-medium uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
