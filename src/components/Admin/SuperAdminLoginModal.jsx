import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Crown, Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

const SuperAdminLoginModal = () => {
  const { loginSuperAdmin, setCurrentView, superAdminAuth } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginSuperAdmin(username, password);
      setLoading(false);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setLoading(false);
      setError('Authentication error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0d0f17] border-2 border-[#c5a059]/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-fadeIn">
        
        {/* Back to Store Button */}
        <button
          onClick={() => setCurrentView('store')}
          className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-[#e5c158] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Storefront</span>
        </button>

        {/* Crown Badge Header */}
        <div className="text-center mb-8">
          <div className="w-18 h-18 bg-[#161825] border-2 border-[#c5a059] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#c5a059]/20 relative">
            <Crown size={36} className="text-[#e5c158] animate-pulse" />
            <Sparkles size={16} className="text-[#c5a059] absolute -top-1 -right-1" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] bg-[#c5a059]/15 border border-[#c5a059]/40 px-3 py-1 rounded-full">
            OWNER MASTER PORTAL
          </span>
          <h2 className="text-2xl font-light tracking-widest uppercase text-white mt-2">
            Super Admin Access
          </h2>
          <p className="text-xs text-gray-400 font-light mt-1 tracking-wider">
            Enter Master Super Admin credentials to unlock No-Code website customization & master controls.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-950/80 border border-red-500/50 text-red-200 text-xs p-3.5 rounded-xl flex items-center space-x-2.5 animate-fadeIn">
            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Master Super Admin ID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1.5">
              Super Admin Master ID *
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-3.5 text-[#c5a059]" />
              <input
                type="text"
                required
                placeholder="Enter Super Admin ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161825] border border-gray-700 focus:border-[#c5a059] text-white text-sm rounded-xl py-3 pl-11 pr-4 placeholder-gray-500 focus:outline-none transition-colors font-mono"
                autoFocus
              />
            </div>
          </div>

          {/* Master Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1.5">
              Super Admin Master Password *
            </label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-3.5 text-[#c5a059]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter Master Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161825] border border-gray-700 focus:border-[#c5a059] text-white text-sm rounded-xl py-3 pl-11 pr-11 placeholder-gray-500 focus:outline-none transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#c5a059] via-[#e5c158] to-[#c5a059] hover:brightness-110 text-black font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-[#c5a059]/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Unlocking Vault...</span>
            ) : (
              <>
                <Crown size={18} />
                <span>UNLOCK SUPER ADMIN PANEL ➔</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default SuperAdminLoginModal;
