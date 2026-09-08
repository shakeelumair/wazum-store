import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, Search, Truck, Clock, CheckCircle2, PackageCheck, AlertCircle, Phone, Mail, ExternalLink, ShieldCheck
} from 'lucide-react';

const TrackOrderModal = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, orders, trackQuery, setTrackQuery } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (isTrackOrderOpen && trackQuery) {
      setSearchQuery(trackQuery);
      const query = trackQuery.trim().toLowerCase();
      const found = orders.find(o => 
        o.id.toLowerCase() === query || 
        (o.customer?.phone && o.customer.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, '')))
      );
      setSearchedOrder(found || null);
      setHasSearched(true);
    }
  }, [isTrackOrderOpen, trackQuery, orders]);

  if (!isTrackOrderOpen) return null;

  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = orders.find(o => 
      o.id.toLowerCase() === query || 
      o.customer?.phone?.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getStatusStep = (status) => {
    const s = (status || 'Pending').toLowerCase();
    if (s === 'delivered') return 4;
    if (s === 'shipped') return 3;
    if (s === 'processing') return 2;
    return 1; // Pending
  };

  const currentStep = searchedOrder ? getStatusStep(searchedOrder.status) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f111a] border border-[#c5a059]/40 text-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={() => { setIsTrackOrderOpen(false); setHasSearched(false); setSearchedOrder(null); setSearchQuery(''); }}
          className="absolute top-4 right-4 z-10 p-2 bg-[#181a2a] text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer border border-gray-800"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-2">
          <div className="inline-flex items-center space-x-2 bg-black/60 px-3 py-1 rounded-full border border-[#c5a059]/30 text-[#e5c158] text-xs font-semibold uppercase tracking-wider">
            <Truck size={14} />
            <span>Live Order Tracking</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider bg-gradient-to-r from-white via-[#f3e7c4] to-[#c5a059] bg-clip-text text-transparent">
            Track Your Package
          </h2>
          <p className="text-xs text-gray-400">Enter your Order ID (e.g. ORD-1725...) or Phone Number to view live shipment status.</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrackSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              required
              placeholder="Enter Order ID or Mobile Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181a2a] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center space-x-1.5 whitespace-nowrap"
          >
            <span>Track Now</span>
          </button>
        </form>

        {/* Results View */}
        {hasSearched && (
          searchedOrder ? (
            <div className="space-y-6 pt-2 animate-fadeIn">
              
              {/* Order Meta Bar */}
              <div className="bg-[#171a2b] p-4 rounded-xl border border-gray-800 flex flex-wrap justify-between items-center gap-2 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Order Reference</span>
                  <span className="font-mono font-bold text-[#e5c158] text-sm">{searchedOrder.id}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Placed On</span>
                  <span className="text-white font-medium">{searchedOrder.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Current Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    searchedOrder.status === 'Delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    searchedOrder.status === 'Shipped' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                    searchedOrder.status === 'Processing' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                    'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                  }`}>
                    {searchedOrder.status || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Visual Timeline Progress Steps */}
              <div className="bg-[#171a2b] p-6 rounded-xl border border-gray-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059] block">
                  Shipment Progress Timeline
                </span>

                <div className="grid grid-cols-4 gap-2 text-center relative pt-2">
                  
                  {/* Step 1: Placed */}
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= 1 ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-lg shadow-[#c5a059]/20' : 'bg-[#121420] text-gray-600 border-gray-800'
                    }`}>
                      <CheckCircle2 size={18} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
                      Order Placed
                    </span>
                  </div>

                  {/* Step 2: Processing */}
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= 2 ? 'bg-blue-500 text-black border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-[#121420] text-gray-600 border-gray-800'
                    }`}>
                      <Clock size={18} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                      Packed / Prep
                    </span>
                  </div>

                  {/* Step 3: Shipped */}
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= 3 ? 'bg-purple-500 text-black border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-[#121420] text-gray-600 border-gray-800'
                    }`}>
                      <Truck size={18} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 3 ? 'text-white' : 'text-gray-500'}`}>
                      In Transit
                    </span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= 4 ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-[#121420] text-gray-600 border-gray-800'
                    }`}>
                      <PackageCheck size={18} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 4 ? 'text-white' : 'text-gray-500'}`}>
                      Delivered
                    </span>
                  </div>

                </div>

                {/* Status Explanation Message */}
                <div className="bg-[#121420] p-3 rounded-lg border border-gray-800/80 text-xs text-gray-300 text-center leading-relaxed">
                  {searchedOrder.status === 'Delivered' && '🟢 Package delivered successfully! Thank you for shopping with Wazum Store.'}
                  {searchedOrder.status === 'Shipped' && '🟣 Your package is on the way with our courier partner. Expected delivery in 1-2 working days.'}
                  {searchedOrder.status === 'Processing' && '🔵 Your timepiece is being inspected, quality checked, and packaged in our velvet gift box.'}
                  {(!searchedOrder.status || searchedOrder.status === 'Pending') && '🟡 Order confirmed! Our team is preparing your package for warehouse dispatch.'}
                </div>

              </div>

              {/* Delivery Address & Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#171a2b] p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059]">Delivery Address</span>
                  <p className="font-bold text-white text-sm">{searchedOrder.customer?.name}</p>
                  <p className="text-gray-300">{searchedOrder.customer?.address}, {searchedOrder.customer?.city}</p>
                  <p className="text-gray-400">Phone: {searchedOrder.customer?.phone}</p>
                </div>

                <div className="bg-[#171a2b] p-4 rounded-xl border border-gray-800 space-y-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059]">Payment Info</span>
                    <p className="text-gray-300 mt-1">Method: <strong className="text-white uppercase">{searchedOrder.customer?.paymentMethod || 'Cash on Delivery'}</strong></p>
                  </div>
                  <div className="pt-2 border-t border-gray-800 flex justify-between items-center font-mono">
                    <span className="text-gray-400">Total Amount:</span>
                    <span className="text-sm font-bold text-[#e5c158]">Rs. {searchedOrder.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#171a2b] p-8 text-center rounded-xl border border-gray-800 space-y-3 animate-fadeIn">
              <AlertCircle size={36} className="text-amber-400 mx-auto" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Order Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                We couldn't find an active order matching "<span className="text-[#e5c158] font-mono">{searchQuery}</span>". Please verify your Order ID or contact support.
              </p>

              <div className="pt-2 flex justify-center space-x-3 text-xs">
                <a
                  href={`https://wa.me/923024000389?text=Hi,%20I%20need%20help%20tracking%20my%20order%20${encodeURIComponent(searchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 px-4 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Phone size={14} />
                  <span>WhatsApp Support</span>
                </a>
                <a
                  href="mailto:umarjoon29@gmail.com"
                  className="bg-[#121420] text-gray-300 hover:text-white border border-gray-800 px-4 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Mail size={14} />
                  <span>Email Support</span>
                </a>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default TrackOrderModal;
