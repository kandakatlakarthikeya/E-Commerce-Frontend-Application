import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { X } from 'lucide-react';

const MiniCart = ({ closeCart }) => {
  const { items, removeItem, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button
          onClick={closeCart}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors w-full"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Cart ({items.length})</h3>
        <button onClick={closeCart} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="overflow-y-auto flex-grow mb-4 space-y-4 pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-md p-1 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</h4>
              <div className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</div>
              <div className="text-sm font-semibold text-primary-600 mt-1">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-secondary self-start"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 mt-auto">
        <div className="flex justify-between items-center mb-4 font-semibold text-gray-800">
          <span>Subtotal</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <Link
            to="/cart"
            onClick={closeCart}
            className="block w-full text-center border border-primary-600 text-primary-600 px-4 py-2 rounded-md hover:bg-primary-50 transition-colors font-medium"
          >
            View Cart
          </Link>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
