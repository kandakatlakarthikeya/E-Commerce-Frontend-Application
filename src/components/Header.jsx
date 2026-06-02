import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { useState } from 'react';
import MiniCart from './MiniCart';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary text-transparent bg-clip-text">
              AuraShop
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                className="text-gray-700 hover:text-primary-600 transition-colors p-2 relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              {isMiniCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-4">
                  <MiniCart closeCart={() => setIsMiniCartOpen(false)} />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
