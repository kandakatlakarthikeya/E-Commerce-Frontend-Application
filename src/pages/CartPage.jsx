import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const { items, updateQuantity, removeItem, getCartTotal, clearCart } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 && subtotal < 100 ? 15.00 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            to="/products"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 w-full"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link to="/products" className="text-gray-500 hover:text-primary-600 flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-primary-600 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-primary-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white shadow-sm rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-xl font-bold text-primary-600">${total.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              <button
                className="mt-8 w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                onClick={() => alert('Proceeding to checkout...')}
              >
                Proceed to Checkout
              </button>
              
              {shipping > 0 && (
                <p className="mt-4 text-sm text-center text-gray-500">
                  Add <span className="font-semibold text-gray-900">${(100 - subtotal).toFixed(2)}</span> more to your cart to get free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
