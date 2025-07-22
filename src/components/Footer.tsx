
const Footer = () => {
  const footerLinks = {
    'Shop': ['All Products', 'Clothing', 'Accessories', 'Home & Living', 'Custom Orders'],
    'Support': ['Contact Us', 'Size Guide', 'Shipping Info', 'Returns', 'FAQ'],
    'Company': ['About Us', 'Careers', 'Press', 'Wholesale', 'Sustainability']
  };

  return (
    <footer className="bg-black-marble border-t border-gold-600/20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold gold-foil mb-4">
              All for you
            </div>
            <p className="text-gray-300 mb-6">
              Premium lifestyle products crafted with passion and attention to detail. 
              Elevate your style with our exclusive collection.
            </p>
            
            {/* Newsletter */}
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
              />
              <button className="absolute right-2 top-2 bg-gold-500 text-premium-black px-4 py-1 rounded-md font-semibold hover:bg-gold-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-gold-400 font-semibold mb-4 text-lg">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-gold-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gold-600/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Icons */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {['Facebook', 'Instagram', 'Mail'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 bg-rich-black border border-gold-600/30 rounded-full flex items-center justify-center text-gold-400 hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300 hover:scale-110"
                  title={social}
                >
                  {social === 'Facebook' && '📘'}
                  {social === 'Instagram' && '📷'}
                  {social === 'Mail' && '📧'}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 All for you. All rights reserved.</p>
              <div className="flex space-x-4 mt-2 justify-center md:justify-end">
                <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gold-400 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Notice */}
      <div className="bg-premium-black py-4 text-center">
        <p className="text-gray-500 text-sm">
          This website is designed to be accessible to all users. 
          <button className="text-gold-400 hover:text-gold-300 ml-2">
            Accessibility Settings
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
