import { useEffect } from 'react';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import { ShoppingCart, Search, Filter } from 'lucide-react';

const ProductsPage = () => {
  const { 
    products, 
    filteredProducts, 
    categories, 
    isLoading, 
    error,
    fetchProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useProductStore();

  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-500">Find exactly what you're looking for</p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
              <select
                className="block w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm appearance-none bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="none">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Name: A to Z</option>
                <option value="title-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {error ? (
          <div className="text-center py-20 text-red-500">
            <p>Error loading products: {error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-80 animate-pulse p-4">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-xl shadow-sm">
             <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
             <p className="text-gray-500">Try adjusting your search or filters.</p>
             <button 
               onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSortBy('none'); }}
               className="mt-4 text-primary-600 font-medium hover:underline"
             >
               Clear all filters
             </button>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
                <div className="relative h-64 p-6 bg-white overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
                  <div className="text-xs text-primary-600 font-semibold uppercase tracking-wider mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={product.title}>{product.title}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addItem(product)}
                      className="bg-gray-900 text-white p-2 rounded-full hover:bg-primary-600 transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
