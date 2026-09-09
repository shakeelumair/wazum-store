import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Shield, Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle, Crown } from 'lucide-react';

const AdminLoginModal = () => {
  const { loginAdmin, loginSuperAdmin, setCurrentView, adminAuth } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // 1. Secret Super Admin Master Check
      const superResult = loginSuperAdmin(username, password);
      if (superResult.success) {
        setLoading(false);
        setCurrentView('superadmin');
        return;
      }

      // 2. Client Admin Check
      const clientResult = loginAdmin(username, password);
      setLoading(false);
      if (clientResult.success) {
        setCurrentView('admin');
        return;
      }

      setError('Invalid Admin ID or Password! Please try again.');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#11131d] border border-[#c5a059]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-fadeIn">
        
        {/* Back to Store Button */}
        <button
          onClick={() => setCurrentView('store')}
          className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-[#e5c158] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Store</span>
        </button>

        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#181a2a] border-2 border-[#c5a059] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#c5a059]/10">
            <Shield size={32} className="text-[#c5a059]" />
          </div>
          <h2 className="text-2xl font-light tracking-widest uppercase text-white">
            Admin Authentication
          </h2>
          <p className="text-xs text-gray-400 font-light mt-1 tracking-wider">
            Enter your secure Admin ID & Password to manage Wazum Store.
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
          {/* Admin Username / ID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Admin Username / ID
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-3.5 text-[#c5a059]" />
              <input
                type="text"
                required
                placeholder="Enter Admin ID (e.g. admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#181a2a] border border-gray-700 focus:border-[#c5a059] text-white text-sm rounded-xl py-3 pl-11 pr-4 placeholder-gray-500 focus:outline-none transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Admin Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-3.5 text-[#c5a059]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181a2a] border border-gray-700 focus:border-[#c5a059] text-white text-sm rounded-xl py-3 pl-11 pr-11 placeholder-gray-500 focus:outline-none transition-colors"
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
            className="w-full bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#b59049] hover:to-[#d5b148] text-black font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Shield size={16} />
                <span>ACCESS ADMIN PANEL ➔</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLoginModal;
