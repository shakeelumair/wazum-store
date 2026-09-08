import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, CreditCard, Truck, AlertCircle, Copy, Check, MessageSquare, ArrowRight } from 'lucide-react';

const CheckoutModal = () => {
  const { 
    isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, placeOrder,
    setIsTrackOrderOpen, setTrackQuery, paymentSettings
  } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod' // 'cod' or 'advance'
  });

  const [orderComplete, setOrderComplete] = useState(null);
  const [copied, setCopied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required shipping fields.');
      return;
    }

    if (!agreedToTerms) {
      alert('Please accept the Terms & Conditions to confirm your order.');
      return;
    }

    const newOrder = placeOrder(formData);
    setOrderComplete(newOrder);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderComplete(null);
  };

  const handleCopyId = () => {
    if (orderComplete?.id) {
      navigator.clipboard.writeText(orderComplete.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTrackDirectly = () => {
    if (orderComplete?.id) {
      setTrackQuery(orderComplete.id);
      setIsCheckoutOpen(false);
      setIsTrackOrderOpen(true);
      setOrderComplete(null);
    }
  };

  const whatsappNumberClean = paymentSettings.whatsappNumber?.replace(/[^0-9]/g, '') || '923024000389';

  const whatsappMessage = orderComplete
    ? `Assalam-o-Alaikum! I placed an order on Wazum Store.\n\n📌 *Order ID:* ${orderComplete.id}\n👤 *Name:* ${orderComplete.customer?.name}\n📞 *Phone:* ${orderComplete.customer?.phone}\n📍 *Address:* ${orderComplete.customer?.address}, ${orderComplete.customer?.city}${orderComplete.customer?.postalCode ? ` (${orderComplete.customer.postalCode})` : ''}\n💰 *Total:* Rs. ${orderComplete.total?.toLocaleString()}\n💳 *Payment Method:* ${orderComplete.customer?.paymentMethod === 'advance' ? `Rs. ${paymentSettings.advanceAmount} DC Advance` : 'Cash on Delivery'}\n\nPlease confirm dispatch. Thank you!`
    : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-5 sm:p-6 md:p-8 text-black pointer-events-auto my-auto">
        
        <button 
          onClick={handleClose}
          type="button"
          aria-label="Close"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black transition-colors p-1.5 rounded-full hover:bg-gray-100 cursor-pointer z-10"
        >
          <X size={20} />
        </button>

        {orderComplete ? (
          /* Order Success Confirmation Screen */
          <div className="text-center py-4 space-y-5">
            <CheckCircle size={60} className="mx-auto text-emerald-500 animate-bounce" />
            
            <div>
              <h2 className="text-2xl font-extrabold tracking-wide text-black uppercase">
                Order Confirmed! 🎉
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Thank you for shopping with Wazum Store. Your order has been placed successfully.
              </p>
            </div>

            {/* Tracking ID Box */}
            <div className="bg-[#0f111a] text-white p-4 rounded-xl border border-[#c5a059]/40 space-y-2 text-left shadow-lg">
              <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider block">
                Your Official Tracking ID
              </span>
              <div className="flex items-center justify-between bg-[#171a2b] p-3 rounded-lg border border-gray-800">
                <span className="font-mono font-bold text-lg text-[#e5c158]">{orderComplete.id}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="bg-[#c5a059] text-black hover:bg-[#e5c158] px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy ID'}</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-400">
                Save this Tracking ID to check live package progress at any time.
              </p>
            </div>

            {/* Order Items & Customer Details Summary */}
            <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-bold text-gray-900">Customer: {orderComplete.customer?.name}</span>
                <span className="text-gray-600">{orderComplete.customer?.phone}</span>
              </div>
              <p className="text-gray-600">
                <strong className="text-black">Address:</strong> {orderComplete.customer?.address}, {orderComplete.customer?.city} {orderComplete.customer?.postalCode ? `(${orderComplete.customer.postalCode})` : ''}
              </p>

              <div className="pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">Ordered Timepieces:</span>
                {orderComplete.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-700 font-medium py-0.5">
                    <span>{item.product.title} ({item.size}) x{item.quantity}</span>
                    <span>Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-bold text-black">
                <span>Total Amount:</span>
                <span className="text-[#c5a059]">Rs. {orderComplete.total?.toLocaleString()}</span>
              </div>
            </div>

            {orderComplete.customer?.paymentMethod === 'advance' && (
              <div className="bg-amber-50 border border-amber-300 text-amber-950 text-xs p-3.5 rounded-xl text-left space-y-2 shadow-sm">
                <div className="flex items-center space-x-2 font-bold text-amber-900 text-xs uppercase">
                  <AlertCircle size={17} className="text-amber-600 flex-shrink-0" />
                  <span>Advance Payment Accounts</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs space-y-1.5 font-mono text-gray-900 shadow-xs">
                  <p><strong>JazzCash & EasyPaisa:</strong> <span className="text-black font-bold select-all">{paymentSettings.jazzcashNumber}</span></p>
                  <p><strong>{paymentSettings.bankName || 'Bank Account'}:</strong> <span className="text-black font-bold select-all">{paymentSettings.bankAccountNumber}</span></p>
                  <p><strong>Account Title:</strong> <span className="text-black font-bold">{paymentSettings.accountTitle}</span></p>
                  <p className="text-[11px] text-amber-800 font-sans pt-1 border-t border-amber-100">Please send <strong>Rs. {paymentSettings.advanceAmount} DC advance</strong> to confirm order dispatch.</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleTrackDirectly}
                type="button"
                className="flex-1 bg-[#0f111a] text-[#e5c158] border border-[#c5a059] py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Truck size={16} />
                <span>Track Live Package</span>
              </button>

              <a
                href={`https://wa.me/${whatsappNumberClean}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleClose}
              type="button"
              className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-black">
                CHECKOUT DETAILS
              </h2>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Enter your delivery address and contact information.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl text-xs text-gray-600 border border-gray-200">
              <div className="flex justify-between font-bold text-black border-b border-gray-200 pb-2 mb-2">
                <span>Items ({cart.length})</span>
                <span className="text-black">Total: Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-700 font-medium">
                    <span className="truncate max-w-[200px] sm:max-w-[240px]">{item.product.title} ({item.size}) x{item.quantity}</span>
                    <span>Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3.5 sm:space-y-4 text-sm">
              <div>
                <label htmlFor="checkout-name" className="block text-xs uppercase font-bold text-gray-800 mb-1">
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  inputMode="text"
                  placeholder="e.g. Ali Khan"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  onTouchStart={(e) => e.target.focus()}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl p-3 text-base md:text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all select-text cursor-text"
                />
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs uppercase font-bold text-gray-800 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  onTouchStart={(e) => e.target.focus()}
                  className="w-full bg-[#ffffff] text-gray-900 border border-gray-300 rounded-xl p-3 text-base md:text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all select-text cursor-text"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label htmlFor="checkout-city" className="block text-xs uppercase font-bold text-gray-800 mb-1">
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    name="city"
                    type="text"
                    required
                    autoComplete="address-level2"
                    inputMode="text"
                    placeholder="e.g. Lahore, Karachi"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    onTouchStart={(e) => e.target.focus()}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl p-3 text-base md:text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all select-text cursor-text"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-postal" className="block text-xs uppercase font-bold text-gray-800 mb-1">
                    Postal / Zip Code
                  </label>
                  <input
                    id="checkout-postal"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="e.g. 54000"
                    value={formData.postalCode}
                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                    onTouchStart={(e) => e.target.focus()}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl p-3 text-base md:text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all select-text cursor-text"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs uppercase font-bold text-gray-800 mb-1">
                  Complete Address *
                </label>
                <textarea
                  id="checkout-address"
                  name="address"
                  required
                  rows="2"
                  autoComplete="street-address"
                  placeholder="House number, Street, Area"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  onTouchStart={(e) => e.target.focus()}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl p-3 text-base md:text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all select-text cursor-text"
                ></textarea>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs uppercase font-bold text-gray-800 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`border rounded-xl p-3 flex flex-col items-center cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod' ? 'border-black bg-gray-100 font-bold' : 'border-gray-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="hidden"
                    />
                    <Truck size={20} className="mb-1 text-black" />
                    <span className="text-xs text-gray-900">Cash on Delivery</span>
                  </label>

                  <label className={`border rounded-xl p-3 flex flex-col items-center cursor-pointer transition-all ${
                    formData.paymentMethod === 'advance' ? 'border-black bg-gray-100 font-bold' : 'border-gray-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="advance"
                      checked={formData.paymentMethod === 'advance'}
                      onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="hidden"
                    />
                    <CreditCard size={20} className="mb-1 text-black" />
                    <span className="text-xs text-gray-900">{paymentSettings.advanceAmount} DC Advance</span>
                  </label>
                </div>

                {formData.paymentMethod === 'advance' && (
                  <div className="mt-2.5 bg-amber-50 border border-amber-300 p-3 rounded-xl text-xs text-amber-950 font-mono space-y-1 shadow-xs">
                    <p><strong>JazzCash / EasyPaisa:</strong> <span className="text-black font-bold select-all">{paymentSettings.jazzcashNumber}</span></p>
                    <p><strong>{paymentSettings.bankName || 'Bank Account'}:</strong> <span className="text-black font-bold select-all">{paymentSettings.bankAccountNumber}</span></p>
                    <p><strong>Account Title:</strong> <span className="text-black font-bold">{paymentSettings.accountTitle}</span></p>
                    <p className="text-[11px] text-amber-800 font-sans pt-1 border-t border-amber-200/60 mt-1">Please send Rs. {paymentSettings.advanceAmount} DC advance after placing order.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions Agreement Checkbox */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-700 mt-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-black focus:ring-black cursor-pointer"
                />
                <span className="leading-snug">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="font-bold text-black underline hover:text-[#c5a059] cursor-pointer inline-flex items-center space-x-0.5"
                  >
                    <span>Terms & Conditions</span>
                  </button>{' '}
                  (Rs. 300 Advance deposit, 7-day exchange policy, 2-4 days delivery).
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest mt-3 hover:bg-gray-800 transition-all shadow-xl cursor-pointer active:scale-95"
            >
              PLACE ORDER NOW
            </button>
          </form>
        )}

        {/* Interactive Terms & Conditions Modal Overlay */}
        {showTermsModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#11131d] text-white border border-[#c5a059]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Close Terms Modal"
              >
                <X size={18} />
              </button>

              <div className="text-center pb-2 border-b border-gray-800">
                <h3 className="text-base font-bold uppercase tracking-widest bg-gradient-to-r from-white via-[#f3e7c4] to-[#c5a059] bg-clip-text text-transparent">
                  📜 STORE TERMS & CONDITIONS
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Please read before placing your order on Wazum Store.</p>
              </div>

              <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
                <div className="bg-[#181a2a] p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="font-bold text-[#e5c158] block uppercase tracking-wider text-[11px]">💳 1. Advance Deposit</span>
                  <p className="text-gray-300">Order confirm karne ke liye <strong>Rs. 300 Advance Payment</strong> (JazzCash / Bank Transfer) laazmi hai. Baqi remaining amount Cash on Delivery hoga.</p>
                </div>

                <div className="bg-[#181a2a] p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="font-bold text-[#e5c158] block uppercase tracking-wider text-[11px]">🚚 2. Free Express Shipping</span>
                  <p className="text-gray-300"><strong>Rs. 10,000</strong> se zyaada ke orders par Free Delivery. Standard delivery time <strong>2 se 4 working days</strong> hai.</p>
                </div>

                <div className="bg-[#181a2a] p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="font-bold text-[#e5c158] block uppercase tracking-wider text-[11px]">🔄 3. 7-Day Easy Exchange</span>
                  <p className="text-gray-300">Product kharab ya galat milne par <strong>7 din ke andar Easy Exchange</strong> ki sahulat maujood hai.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setAgreedToTerms(true); setShowTermsModal(false); }}
                className="w-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs uppercase tracking-widest py-3 rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                I AGREE & UNDERSTAND ➔
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
