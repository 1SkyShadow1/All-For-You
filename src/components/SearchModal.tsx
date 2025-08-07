import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { products } = useAdmin();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery, products]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-rich-black rounded-xl max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gold-600/20">
            <h2 className="text-2xl font-bold text-white">Search Products</h2>
            <button
              onClick={onClose}
              className="p-2 text-gold-400 hover:text-gold-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-premium-black border border-gold-600/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gold-400 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto px-6 pb-6">
            {searchQuery.trim() === '' ? (
              <div className="text-center py-8">
                <Search className="mx-auto mb-4 text-gold-400" size={48} />
                <p className="text-gray-400">Start typing to search products...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No products found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gold-400 font-semibold">
                  Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                </p>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-4 bg-premium-black rounded-lg hover:bg-gold-400/5 transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold group-hover:text-gold-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{product.category}</p>
                      <p className="text-gold-400 font-bold">R{product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
