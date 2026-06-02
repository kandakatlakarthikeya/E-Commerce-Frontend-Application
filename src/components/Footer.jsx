const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary text-transparent bg-clip-text">AuraShop</h3>
            <p className="text-gray-400">
              Discover the best products with incredible quality. Your ultimate destination for modern shopping.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md transition-colors font-medium">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AuraShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
