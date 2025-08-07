import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const Collections = () => {
  const { products } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'canvas', name: 'Canvas Art' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => {
        if (selectedCategory === 'canvas') {
          return product.name.toLowerCase().includes('canvas');
        }
        if (selectedCategory === 'fashion') {
          return product.name.toLowerCase().includes('shirt') || product.name.toLowerCase().includes('hoodie');
        }
        if (selectedCategory === 'accessories') {
          return !product.name.toLowerCase().includes('canvas') && 
                 !product.name.toLowerCase().includes('shirt') && 
                 !product.name.toLowerCase().includes('hoodie');
        }
        return false;
      });

  return (
    <div className="min-h-screen bg-premium-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-premium-black via-rich-black to-black-marble">
        <div className="absolute inset-0 bg-gold-500/5"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold gold-foil mb-6">
              Collections
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our curated collections of premium lifestyle products, 
              each piece crafted with passion and attention to detail.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gold-500 text-premium-black shadow-lg shadow-gold-500/30'
                  : 'bg-rich-black border border-gold-600/30 text-gold-400 hover:border-gold-400 hover:bg-gold-400/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-rich-black rounded-xl overflow-hidden border border-gold-600/20 hover:border-gold-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-premium-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button className="w-10 h-10 bg-rich-black/80 backdrop-blur-sm border border-gold-600/30 rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-premium-black transition-all duration-300">
                      <Heart size={18} />
                    </button>
                    <button className="w-10 h-10 bg-rich-black/80 backdrop-blur-sm border border-gold-600/30 rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-premium-black transition-all duration-300">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gold-foil">
                      ${product.price}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-gold-500 text-premium-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-400 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No products found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Collections;
