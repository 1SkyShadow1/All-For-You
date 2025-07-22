
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProductImages } from '../hooks/useProductImages';
import SpotlightCard from './ui/SpotlightCard';
import MagicBento from './ui/MagicBento';
import AnimatedList from './ui/AnimatedList';
import CountUp from './animations/CountUp';
import GradientText from './animations/GradientText';

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
            <GradientText text="Featured Collection" />
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, each crafted with attention to detail and designed to elevate your lifestyle.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400">
                <CountUp end={500} suffix="+" />
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gold-500 text-premium-black shadow-gold'
                  : 'bg-transparent border border-gold-400/30 text-gold-400 hover:border-gold-400 hover:bg-gold-400/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatedList
          items={filteredProducts.map((product, index) => ({
            id: product.id.toString(),
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.slice(index, index + 4).map((prod) => (
                  <SpotlightCard key={prod.id} className="h-full">
                    <Link to={`/product/${prod.id}`} className="block h-full">
                      <ProductCard
                        {...prod}
                        onAddToCart={handleAddToCart}
                      />
                    </Link>
                  </SpotlightCard>
                ))}
              </div>
            )
          }))}
          stagger={0.2}
        />

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
