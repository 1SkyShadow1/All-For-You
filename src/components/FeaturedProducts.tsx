
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProductImages } from '../hooks/useProductImages';
import SpotlightCard from './ui/SpotlightCard';
import MagicBento from './ui/MagicBento';
import AnimatedList from './ui/AnimatedList';
import InfiniteScroll from './ui/InfiniteScroll';
import CircularGallery from './ui/CircularGallery';
import CountUp from './animations/CountUp';
import GradientText from './animations/GradientText';
import TextTrail from './animations/TextTrail';
import GlitchText from './animations/GlitchText';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products: imageProducts } = useProductImages();

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'home', label: 'Home & Living' },
    { id: 'art', label: 'Art & Design' }
  ];

  // Use the actual product images from the hook
  const products = imageProducts.slice(0, 12).map(product => ({
    ...product,
    originalPrice: Math.random() > 0.5 ? product.price * 1.3 : undefined,
    isNew: Math.random() > 0.7
  }));

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Get featured images for circular gallery
  const featuredImages = products.slice(0, 8).map(p => p.image);
  const handleAddToCart = (productId: number) => {
    console.log('Added product to cart:', productId);
    // Here you would typically dispatch to a cart context or state management
  };

  return (
    <section id="shop" className="py-20 bg-rich-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gold-foil">
            <TextTrail text="Featured Collection" className="gold-foil" />
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            <GlitchText text="Discover our handpicked selection of premium products, each crafted with attention to detail and designed to elevate your lifestyle." />
          </p>
          
          {/* Circular Gallery Preview */}
          <div className="flex justify-center my-12">
            <CircularGallery 
              images={featuredImages}
              radius={120}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">
                <CountUp end={products.length} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">
                <CountUp end={10000} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">
                <CountUp end={99} suffix="%" />
              </div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <InfiniteScroll
            items={categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`mx-2 px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-gold-500 text-premium-black shadow-gold'
                    : 'bg-transparent border border-gold-400/30 text-gold-400 hover:border-gold-400 hover:bg-gold-400/10'
                }`}
              >
                {category.label}
              </button>
            ))}
            speed={30}
            className="py-4"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.slice(0, 16).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SpotlightCard className="h-full">
                <Link to={`/product/${product.id}`} className="block h-full">
                  <ProductCard
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                </Link>
              </SpotlightCard>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="btn-gold">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
