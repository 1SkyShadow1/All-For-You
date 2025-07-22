import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw, Camera, Zap, Eye, GitCompare } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import InventoryCountdown from '../components/InventoryCountdown';
import LuxuryNotifications from '../components/LuxuryNotifications';
import ProductComparison from '../components/ProductComparison';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [viewerCount, setViewerCount] = useState(8);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: 1,
    name: "Premium Custom T-Shirt",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80"
    ],
    colors: ['black', 'white', 'gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    description: "Experience luxury with our premium custom t-shirt. Made from 100% organic cotton with gold thread accents, this shirt represents the pinnacle of comfort and style.",
    features: [
      "100% Organic Cotton",
      "Gold Thread Accents", 
      "Custom Design Ready",
      "Pre-shrunk Fabric",
      "Reinforced Seams"
    ]
  };

  // Mock comparison products
  const comparisonProducts = [
    { id: 1, name: "Premium Custom T-Shirt", price: 299.99, image: product.images[0], rating: 4.8, features: product.features },
    { id: 2, name: "Designer Hoodie", price: 599.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80", rating: 4.6, features: ["Cotton Blend", "Lined Hood", "Kangaroo Pocket"] },
    { id: 3, name: "Custom Baseball Cap", price: 199.99, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&q=80", rating: 4.7, features: ["Adjustable Strap", "Embroidered Logo", "UV Protection"] }
  ];

  useEffect(() => {
    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Animate button
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      button.classList.add('animate-bounce');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Added to cart:', { product, size: selectedSize, color: selectedColor, quantity });
    
    setIsAddingToCart(false);
    if (button) {
      button.classList.remove('animate-bounce');
    }
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: 'clothing'
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handle360View = () => {
    setRotation(rotation + 90);
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-premium-black">
      <Navigation />
      <LuxuryNotifications />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb & Live Viewers */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Shop</span>
          </button>
          
          <div className="flex items-center space-x-2 text-gold-400">
            <Eye size={16} className="animate-pulse" />
            <span className="text-sm">{viewerCount} people viewing</span>
          </div>
        </div>

        {/* Inventory Alert */}
        <InventoryCountdown stock={product.stock} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              className="relative cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageMouseMove}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-96 lg:h-[500px] object-cover transition-all duration-700 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={{ 
                    transform: `rotateY(${rotation}deg) ${isZoomed ? `scale(2)` : 'scale(1)'}`,
                    transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
                  }}
                />
              </div>
              
              {/* AR Preview Button */}
              <button className="absolute top-4 right-4 bg-gold-500 text-premium-black p-3 rounded-full hover:bg-gold-400 transition-all duration-300 hover:scale-110 shadow-gold">
                <Camera size={20} />
              </button>

              {/* 360° View Button */}
              <button 
                onClick={handle360View}
                className="absolute bottom-4 right-4 glass-morphism text-gold-400 p-3 rounded-full hover:bg-gold-400/20 transition-all duration-300 hover:scale-110"
              >
                <RotateCcw size={20} />
              </button>

              {/* Zoom indicator */}
              {isZoomed && (
                <div className="absolute top-4 left-4 glass-morphism px-3 py-1 rounded-full text-gold-400 text-sm">
                  Zoom active
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    selectedImage === index ? 'border-gold-400 shadow-gold' : 'border-transparent hover:border-gold-400/50'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-gray-300">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-3xl font-bold text-gold-400">R{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">R{product.originalPrice}</span>
                )}
                <span className="bg-gold-500 text-premium-black px-2 py-1 text-sm font-semibold rounded animate-pulse">
                  25% OFF
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                      selectedColor === color ? 'border-gold-400 shadow-gold' : 'border-gray-600 hover:border-gold-400/50'
                    }`}
                    style={{ backgroundColor: color === 'gold' ? '#fbbf24' : color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-all duration-300 hover:scale-105 ${
                      selectedSize === size
                        ? 'border-gold-400 bg-gold-400 text-premium-black shadow-gold'
                        : 'border-gray-600 text-gray-300 hover:border-gold-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-600 rounded-lg text-white hover:border-gold-400 hover:scale-110 transition-all duration-300"
                >
                  -
                </button>
                <span className="text-white font-semibold min-w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-600 rounded-lg text-white hover:border-gold-400 hover:scale-110 transition-all duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`add-to-cart-btn w-full text-lg py-4 relative overflow-hidden ${
                  isAddingToCart 
                    ? 'bg-green-500 text-white' 
                    : 'btn-gold hover:shadow-gold-lg'
                } transition-all duration-500`}
              >
                {isAddingToCart ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding to Cart...</span>
                  </div>
                ) : (
                  `Add to Cart - R${(product.price * quantity).toFixed(2)}`
                )}
              </button>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleWishlistToggle}
                  className={`flex-1 border-2 border-gold-400 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isInWishlist(product.id)
                      ? 'bg-gold-400 text-premium-black shadow-gold' 
                      : 'text-gold-400 hover:bg-gold-400 hover:text-premium-black'
                  }`}
                >
                  <Heart size={20} className={`inline mr-2 transition-all duration-300 ${
                    isInWishlist(product.id) ? 'fill-current animate-pulse' : ''
                  }`} />
                  {isInWishlist(product.id) ? 'Wishlisted' : 'Wishlist'}
                </button>
                
                <button 
                  onClick={() => setShowComparison(true)}
                  className="flex-1 border-2 border-gold-400 text-gold-400 py-3 rounded-lg font-semibold hover:bg-gold-400 hover:text-premium-black transition-all duration-300 hover:scale-105"
                >
                  <GitCompare size={20} className="inline mr-2" />
                  Compare
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center group">
                <Truck className="text-gold-400 mx-auto mb-2 group-hover:animate-bounce" size={24} />
                <p className="text-sm text-gray-300">Free Shipping</p>
              </div>
              <div className="text-center group">
                <Shield className="text-gold-400 mx-auto mb-2 group-hover:animate-pulse" size={24} />
                <p className="text-sm text-gray-300">2 Year Warranty</p>
              </div>
              <div className="text-center group">
                <RotateCcw className="text-gold-400 mx-auto mb-2 group-hover:animate-spin" size={24} />
                <p className="text-sm text-gray-300">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-gray-700">
            {['description', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize transition-all duration-300 hover:scale-105 ${
                  activeTab === tab
                    ? 'text-gold-400 border-b-2 border-gold-400'
                    : 'text-gray-400 hover:text-gold-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gold-400/5 transition-colors">
                    <Zap className="text-gold-400" size={20} />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-gray-300">
                <p>Customer reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        products={comparisonProducts}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
