
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import GradientText from './animations/GradientText';
import MagnetButton from './animations/MagnetButton';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', href: '/#shop' },
    { label: 'Collections', href: '#collections' },
    { label: 'Custom Orders', href: '/custom-design' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-morphism py-3 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl md:text-3xl font-bold gold-foil">
              <GradientText text="All for you" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link text-sm font-medium tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <MagnetButton className="p-2 text-gold-300 hover:text-gold-400 transition-colors">
                <Search size={20} />
              </MagnetButton>

              {/* Profile */}
              <MagnetButton className="p-2 text-gold-300 hover:text-gold-400 transition-colors">
                <Link 
                to="/profile"
              >
                  <User size={20} />
                </Link>
              </MagnetButton>

              {/* Cart */}
              <MagnetButton 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gold-300 hover:text-gold-400 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-premium-black text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </MagnetButton>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-gold-300 hover:text-gold-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden mt-4 transition-all duration-300 ${
              isMobileMenuOpen
                ? 'opacity-100 max-h-64'
                : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            <div className="glass-morphism rounded-lg p-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block nav-link text-sm font-medium tracking-wide py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
