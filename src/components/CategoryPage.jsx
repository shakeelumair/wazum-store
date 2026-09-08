import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { ArrowLeft, SlidersHorizontal, PackageX } from 'lucide-react';

const CategoryPage = () => {
  const {
    categories,
    products,
    selectedCategory,
    setCurrentView,
    openCategoryPage,
    searchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState('featured');

  const categoryData = selectedCategory === 'All'
    ? {
        name: searchQuery ? `Search Results` : 'All Products',
        description: searchQuery 
          ? `Showing luxury items matching "${searchQuery}"` 
          : 'Explore our complete collection of luxury products.',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
      }
    : (categories.find(c => c.name === selectedCategory) || {
        name: selectedCategory,
        description: `Explore our premium collection of ${selectedCategory}.`,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
      });

  let categoryProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    categoryProducts = categoryProducts.filter(p =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'price-low') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20 animate-fadeIn">
      
      {/* Category Hero Header Banner */}
      <div className="relative w-full h-[35vh] min-h-[260px] max-h-[400px] bg-black overflow-hidden flex items-center justify-center border-b border-[#c5a059]/30">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105"
          style={{ 
            backgroundImage: `url('${categoryData.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'}')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          
          <button 
            onClick={() => setCurrentView('store')}
            className="inline-flex items-center space-x-1.5 bg-[#c5a059]/20 hover:bg-[#c5a059]/40 border border-[#c5a059]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-light tracking-widest text-[#e5c158] mb-4 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>BACK TO HOME</span>
          </button>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-widest uppercase mb-2 text-white">
            {categoryData.name}
          </h1>

          <p className="text-gray-300 font-extralight text-xs sm:text-sm max-w-lg tracking-wide line-clamp-2 px-2">
            {categoryData.description}
          </p>

          <span className="mt-3 inline-block bg-[#c5a059] text-black text-[10px] md:text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full shadow">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'} Available
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 md:px-12 pt-8">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-800">
          
          <div className="flex items-center space-x-2 text-xs text-gray-400 font-light">
            <button onClick={() => setCurrentView('store')} className="hover:text-[#e5c158] transition-colors">Home</button>
            <span>/</span>
            <span className="text-gray-500">Categories</span>
            <span>/</span>
            <span className="text-[#e5c158] font-medium">{categoryData.name}</span>
          </div>

          <div className="flex items-center space-x-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <div className="flex items-center space-x-1.5 text-xs text-gray-300 bg-[#141414] border border-[#c5a059]/30 px-3 py-1.5 rounded-full">
              <SlidersHorizontal size={14} className="text-[#c5a059]" />
              <span className="font-light">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#e5c158] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-black text-white">Featured</option>
                <option value="price-low" className="bg-black text-white">Price: Low to High</option>
                <option value="price-high" className="bg-black text-white">Price: High to Low</option>
                <option value="name" className="bg-black text-white">Name (A-Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-[#141414] rounded-2xl p-10 md:p-16 text-center text-gray-400 border border-dashed border-[#c5a059]/30 max-w-md mx-auto my-8 shadow-xs">
            <PackageX size={48} className="mx-auto mb-3 text-[#c5a059]" />
            <h3 className="text-lg font-medium text-white mb-1">No products in "{categoryData.name}"</h3>
            <p className="text-xs text-gray-400 font-light mb-6">
              You haven't added any products to this category yet. Go to Admin Panel to add products!
            </p>
            <button
              onClick={() => setCurrentView('store')}
              className="bg-[#c5a059] text-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-full font-semibold hover:bg-[#b8952b] transition-colors shadow"
            >
              Explore Other Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Other Categories Bar */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <h3 className="text-center text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-6">
            EXPLORE OTHER CATEGORIES
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => openCategoryPage(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-light tracking-wider uppercase transition-all ${
                  cat.name === selectedCategory
                    ? 'bg-[#c5a059] text-black font-semibold shadow'
                    : 'bg-[#141414] text-gray-300 hover:bg-[#202020] border border-gray-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
