import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Header = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    setIsTrackOrderOpen,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    openCategoryPage,
    siteConfig
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleCategoryClick = (catName) => {
    if (catName === 'All') {
      setSelectedCategory('All');
      setCurrentView('store');
      setSearchQuery('');
    } else {
      openCategoryPage(catName);
      setSearchQuery('');
    }
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() !== '') {
      setSelectedCategory('All');
      if (currentView !== 'category') {
        setCurrentView('category');
      }
    }
  };

  // Limit desktop header navigation to 3 categories + More dropdown
  const visibleCategories = categories.slice(0, 3);
  const remainingCategories = categories.slice(3);

  return (
    <header className="w-full bg-[#0a0a0a] text-white py-3 md:py-4 px-3 md:px-10 flex justify-between items-center shadow-2xl border-b border-[#c5a059]/20 sticky top-0 z-40 relative">
      
      {/* Left Navigation (Desktop) & Mobile Hamburger */}
      <div className="flex-1 flex items-center space-x-2 md:space-x-3">
        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden p-1 text-[#c5a059] hover:text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Category Links */}
        <nav className="hidden lg:flex items-center space-x-5 text-sm md:text-base font-extralight tracking-wider">
          <button 
            onClick={() => handleCategoryClick('All')}
            className={`hover:text-[#e5c158] transition-colors ${selectedCategory === 'All' && currentView === 'store' && !searchQuery ? 'text-[#e5c158] font-normal border-b-2 border-[#c5a059] pb-0.5' : 'text-gray-200'}`}
          >
            Home
          </button>

          {/* First 3 Categories */}
          {visibleCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`hover:text-[#e5c158] transition-colors whitespace-nowrap ${selectedCategory === cat.name && currentView === 'category' && !searchQuery ? 'text-[#e5c158] font-normal border-b-2 border-[#c5a059] pb-0.5' : 'text-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}

          {/* More Dropdown Hover Menu */}
          {remainingCategories.length > 0 && (
            <div 
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button 
                className={`flex items-center space-x-1 transition-colors py-1 cursor-pointer ${
                  isMoreOpen || (remainingCategories.some(c => c.name === selectedCategory && currentView === 'category') && !searchQuery)
                    ? 'text-[#e5c158] font-normal'
                    : 'text-gray-200 hover:text-[#e5c158]'
                }`}
              >
                <span>More</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-[#e5c158]' : ''}`} />
              </button>

              {/* Dropdown Menu Popup */}
              {isMoreOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-[#121212] border border-[#c5a059]/40 shadow-2xl rounded-xl py-2 px-1.5 z-50 animate-fadeIn">
                  <div className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium px-3 py-1 border-b border-gray-800 mb-1">
                    More Categories
                  </div>
                  {remainingCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full text-left px-3 py-2 text-xs md:text-sm font-light rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat.name && currentView === 'category' && !searchQuery
                          ? 'bg-[#c5a059]/20 text-[#e5c158] font-normal border-l-2 border-[#c5a059]'
                          : 'text-gray-300 hover:bg-[#1f1f1f] hover:text-[#e5c158]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Center Logo (Perfectly aligned under top announcement bar) */}
      <div 
        onClick={() => { setCurrentView('store'); setSelectedCategory('All'); setSearchQuery(''); }}
        className="cursor-pointer flex items-center justify-center bg-white/95 px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg border border-[#c5a059] shadow-md shadow-[#c5a059]/10 hover:scale-105 transition-transform mx-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10"
      >
        <img 
          src={siteConfig?.logoUrl || '/logo.png'} 
          alt="Wazum Logo" 
          className="h-7 md:h-9 w-auto object-contain max-w-[110px] md:max-w-[140px]"
        />
      </div>

      {/* Right Icons & Actions */}
      <div className="flex-1 flex items-center justify-end space-x-2 md:space-x-4">
        
        {/* Search Bar */}
        <div className="relative">
          {isSearchOpen ? (
            <div className="flex items-center bg-[#141414] rounded-full px-3 py-1.5 border border-[#c5a059] shadow-lg animate-fadeIn">
              <Search size={15} className="text-[#c5a059] mr-1.5 flex-shrink-0" />
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent text-white text-xs md:text-sm focus:outline-none w-28 sm:w-44 md:w-56 px-1 placeholder-gray-400"
                autoFocus
              />
              <button 
                type="button"
                onClick={() => { 
                  setIsSearchOpen(false); 
                  setSearchQuery(''); 
                }} 
                className="text-gray-400 hover:text-white ml-1 p-0.5 cursor-pointer"
                title="Clear Search"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setIsSearchOpen(true);
                if (searchQuery.trim() !== '') {
                  setSelectedCategory('All');
                  setCurrentView('category');
                }
              }}
              className="text-[#c5a059] hover:text-[#e5c158] transition-colors p-1.5 flex items-center space-x-1 cursor-pointer" 
              aria-label="Search"
              title="Search Products"
            >
              <Search size={20} strokeWidth={1.5} className="md:w-5 md:h-5" />
            </button>
          )}
        </div>

        {/* Track Order Trigger Button */}
        <button
          onClick={() => setIsTrackOrderOpen(true)}
          className="flex items-center space-x-1 text-xs text-gray-300 hover:text-[#e5c158] transition-colors p-1 cursor-pointer"
          title="Track Order Status"
        >
          <Truck size={18} className="text-[#c5a059]" />
          <span className="hidden sm:inline font-light uppercase tracking-wider text-[11px]">Track Order</span>
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-[#c5a059]/30 shadow-2xl py-4 px-5 flex flex-col space-y-3 z-50 animate-fadeIn">
          <div className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold mb-1">Navigation Menu</div>
          <button 
            onClick={() => handleCategoryClick('All')}
            className={`text-left text-sm py-1.5 border-b border-gray-800 ${selectedCategory === 'All' && currentView === 'store' ? 'text-[#e5c158] font-normal pl-2 border-l-2 border-[#c5a059]' : 'text-gray-300'}`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`text-left text-sm py-1.5 border-b border-gray-800 ${selectedCategory === cat.name && currentView === 'category' ? 'text-[#e5c158] font-normal pl-2 border-l-2 border-[#c5a059]' : 'text-gray-300'}`}
            >
              {cat.name}
            </button>
          ))}
          
          <div className="pt-2">
            <button 
              onClick={() => { setIsTrackOrderOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-[#181a2a] text-[#e5c158] border border-[#c5a059]/40 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md"
            >
              <Truck size={14} />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
