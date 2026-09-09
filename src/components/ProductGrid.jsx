import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { PackageX } from 'lucide-react';

const ProductGrid = () => {
  const { products, categories, selectedCategory, setSelectedCategory, searchQuery } = useStore();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || 
      (product.category && product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products-section" className="py-8 md:py-16 px-3 md:px-12 max-w-7xl mx-auto">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 pb-3 border-b border-gray-800 gap-3">
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#c5a059] font-medium">
            EXCLUSIVE APPAREL
          </span>
          <h2 className="text-xl md:text-3xl font-extralight uppercase tracking-widest text-white mt-0.5">
            {selectedCategory === 'All' ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
          </h2>
        </div>

        {/* Filter Pills Scrollable */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1 rounded-full text-[11px] font-light tracking-wider uppercase transition-all whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                : 'bg-[#141414] text-gray-300 hover:bg-[#202020] border border-gray-800'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat.name).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1 rounded-full text-[11px] font-light tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat.name
                    ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                    : 'bg-[#141414] text-gray-300 hover:bg-[#202020] border border-gray-800'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#141414] rounded-2xl p-8 text-center text-gray-400 border border-dashed border-[#c5a059]/30 max-w-md mx-auto my-6 shadow-xs">
          <PackageX size={40} className="mx-auto mb-2 text-[#c5a059]" />
          <h3 className="text-base font-medium text-white mb-1">No products found</h3>
          <p className="text-xs text-gray-400 font-light mb-4">
            {searchQuery ? `No items matching "${searchQuery}"` : 'There are no products in this category yet.'}
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="bg-[#c5a059] text-black text-[11px] uppercase tracking-widest px-5 py-2 rounded-full font-semibold hover:bg-[#b8952b] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
