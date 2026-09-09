import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp, MessageSquare, Plus, X, Award, Truck, Shield } from 'lucide-react';

const CustomerReviews = () => {
  const { reviews, addReview, products } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newForm, setNewForm] = useState({
    name: '',
    city: '',
    rating: 5,
    productName: '',
    review: ''
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newForm.name || !newForm.review) return;

    addReview({
      name: newForm.name,
      city: newForm.city || 'Pakistan',
      rating: Number(newForm.rating),
      productName: newForm.productName || 'Wazum Luxury Collection',
      review: newForm.review,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`
    });

    setNewForm({ name: '', city: '', rating: 5, productName: '', review: '' });
    setIsFormOpen(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <section className="py-14 md:py-20 px-4 md:px-12 lg:px-16 w-full max-w-[1800px] mx-auto border-t border-[#c5a059]/20 relative">
      
      {/* Header & Trust Banner */}
      <div className="flex flex-col items-center text-center mb-12 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium flex items-center space-x-1.5">
          <Award size={15} />
          <span>VERIFIED CUSTOMER REVIEWS</span>
        </span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight uppercase tracking-widest text-white">
          REFINED CLIENT EXPERIENCES
        </h2>
        
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-2"></div>

        {/* Overall Rating Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="bg-[#141624] border border-[#c5a059]/40 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-bold text-white font-mono">4.9 / 5.0</span>
            <span className="text-xs text-gray-400 border-l border-gray-700 pl-2">(2,450+ Verified Orders)</span>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-full hover:brightness-110 transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
          >
            <Plus size={14} />
            <span>Write a Review</span>
          </button>
        </div>

        {submittedMessage && (
          <div className="mt-4 bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 px-4 py-2 rounded-xl text-xs font-medium animate-fadeIn">
            ✓ Thank you! Your review has been submitted successfully.
          </div>
        )}
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
        <div className="bg-[#121420] p-4 rounded-2xl border border-gray-800 flex items-center space-x-3">
          <div className="p-2.5 bg-[#c5a059]/10 rounded-xl text-[#c5a059] shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Nationwide Delivery</h4>
            <p className="text-[11px] text-gray-400">Safely delivered in 2-4 days across Pakistan</p>
          </div>
        </div>

        <div className="bg-[#121420] p-4 rounded-2xl border border-gray-800 flex items-center space-x-3">
          <div className="p-2.5 bg-[#c5a059]/10 rounded-xl text-[#c5a059] shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Open Parcel Checking</h4>
            <p className="text-[11px] text-gray-400">Inspect parcel before making payment</p>
          </div>
        </div>

        <div className="bg-[#121420] p-4 rounded-2xl border border-gray-800 flex items-center space-x-3">
          <div className="p-2.5 bg-[#c5a059]/10 rounded-xl text-[#c5a059] shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Quality Assurance</h4>
            <p className="text-[11px] text-gray-400">High-grade materials & Japanese movements</p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div 
            key={rev.id}
            className="bg-[#11131f] p-6 rounded-2xl border border-gray-800/90 hover:border-[#c5a059]/50 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden"
          >
            {/* Subtle Gold Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#c5a059]/10" />

            <div className="space-y-3">
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#c5a059]/40 bg-black" 
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <span>{rev.name}</span>
                    </h3>
                    <span className="text-[11px] text-gray-400 block">{rev.city}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex text-amber-400">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Verified Purchase Badge */}
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center space-x-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  <CheckCircle2 size={11} />
                  <span>Verified Purchase</span>
                </span>

                <span className="text-[10px] text-gray-500 font-mono">{rev.date || 'Verified'}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs text-gray-300 leading-relaxed font-light italic pt-1">
                "{rev.review}"
              </p>
            </div>

            {/* Product Purchased Footer Tag */}
            {rev.productName && (
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
                <span className="text-gray-400 line-clamp-1 font-medium">
                  Watch: <strong className="text-[#e5c158] font-normal">{rev.productName}</strong>
                </span>

                <div className="flex items-center space-x-1 text-emerald-400 text-[10px] shrink-0 font-medium">
                  <ThumbsUp size={11} />
                  <span>Recommended</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leave Review Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121420] border border-[#c5a059]/40 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4 animate-fadeIn relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <MessageSquare size={18} className="text-[#c5a059]" />
                <span>Submit Customer Review</span>
              </h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 uppercase font-semibold mb-1">Your Full Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Syed Shahzaib"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 uppercase font-semibold mb-1">City / Location</label>
                  <input 
                    type="text"
                    placeholder="e.g. Lahore, Karachi"
                    value={newForm.city}
                    onChange={(e) => setNewForm({ ...newForm, city: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 uppercase font-semibold mb-1">Star Rating</label>
                  <select
                    value={newForm.rating}
                    onChange={(e) => setNewForm({ ...newForm, rating: e.target.value })}
                    className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-amber-400 focus:outline-none focus:border-[#c5a059] font-bold"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 uppercase font-semibold mb-1">Select Product / Watch Model</label>
                <select 
                  value={newForm.productName}
                  onChange={(e) => setNewForm({ ...newForm, productName: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="">-- General Store Review --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.title}>{p.title} ({p.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 uppercase font-semibold mb-1">Your Feedback / Review *</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Tell us about the quality, packaging, delivery speed, or overall experience..."
                  value={newForm.review}
                  onChange={(e) => setNewForm({ ...newForm, review: e.target.value })}
                  className="w-full bg-[#181a2a] border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] text-black font-bold py-3 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#c5a059]/20"
                >
                  Post Customer Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default CustomerReviews;
