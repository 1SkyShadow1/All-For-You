import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Filter, Grid, List, Search } from 'lucide-react';

const Shop = () => {
  const { products } = useAdmin();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'canvas', name: 'Canvas Art', count: products.filter(p => p.name.toLowerCase().includes('canvas')).length },
    { id: 'fashion', name: 'Fashion', count: products.filter(p => p.name.toLowerCase().includes('shirt') || p.name.toLowerCase().includes('hoodie')).length },
    { id: 'accessories', name: 'Accessories', count: products.filter(p => !p.name.toLowerCase().includes('canvas') && !p.name.toLowerCase().includes('shirt') && !p.name.toLowerCase().includes('hoodie')).length }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'newest', label: 'Newest' }
  ];

  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || (() => {
      if (selectedCategory === 'canvas') return product.name.toLowerCase().includes('canvas');
      if (selectedCategory === 'fashion') return product.name.toLowerCase().includes('shirt') || product.name.toLowerCase().includes('hoodie');
      if (selectedCategory === 'accessories') return !product.name.toLowerCase().includes('canvas') && !product.name.toLowerCase().includes('shirt') && !product.name.toLowerCase().includes('hoodie');
      return false;
    })();
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const ProductCard = ({ product }: { product: any }) => (
    <div className="group">
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

          {/* Sale Badge */}
          {product.salePrice && (
            <div className="absolute top-4 left-4 bg-gold-500 text-premium-black px-3 py-1 rounded-full text-sm font-semibold">
              Sale
            </div>
          )}
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
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-gold-400">
                    ${product.salePrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold gold-foil">
                  ${product.price}
                </span>
              )}
            </div>
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
  );

  return (
    <div className="min-h-screen bg-premium-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-premium-black via-rich-black to-black-marble">
        <div className="absolute inset-0 bg-gold-500/5"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold gold-foil mb-6">
              Shop
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our complete collection of premium lifestyle products. 
              Find the perfect piece to elevate your style and express your personality.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20 sticky top-24">
              <h2 className="text-xl font-semibold text-gold-400 mb-6 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 bg-premium-black border border-gold-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Categories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                          : 'text-gray-300 hover:bg-gold-500/10 hover:text-gold-400'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Price Range</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 bg-premium-black border border-gold-600/30 rounded text-white text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-20 px-2 py-1 bg-premium-black border border-gold-600/30 rounded text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <div className="text-sm text-gray-400">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="text-gray-300">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-rich-black border border-gold-600/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-400 transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex items-center gap-1 bg-rich-black border border-gold-600/30 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-gold-500 text-premium-black' : 'text-gold-400 hover:bg-gold-500/20'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-gold-500 text-premium-black' : 'text-gold-400 hover:bg-gold-500/20'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                : "space-y-6"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 1000]);
                  }}
                  className="mt-4 bg-gold-500 text-premium-black px-6 py-2 rounded-lg font-semibold hover:bg-gold-400 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
