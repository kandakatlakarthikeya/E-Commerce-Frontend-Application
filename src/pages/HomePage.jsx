import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const HomePage = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary">Style</span> Today
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Discover our curated collection of premium products. From cutting-edge electronics to the latest fashion trends, find exactly what you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 hover:shadow-lg transition-all flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square group">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" 
                alt="Shopping Experience" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-500">On all orders over $100</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-500">100% secure checkout</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-500">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-500">Handpicked just for you</p>
            </div>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm h-80 animate-pulse p-4">
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
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
      </section>
    </div>
  );
};

export default HomePage;
