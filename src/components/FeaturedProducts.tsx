
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'home', label: 'Home & Living' },
    { id: 'art', label: 'Art & Design' }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Custom T-Shirt",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      category: "clothing",
      isNew: true
    },
    {
      id: 2,
      name: "Artisan Coffee Mug",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&q=80",
      category: "accessories"
    },
    {
      id: 3,
      name: "Handcrafted Cutting Board",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1594736797933-d0d96b3dd2b3?w=500&q=80",
      category: "home"
    },
    {
      id: 4,
      name: "Custom Baseball Cap",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&q=80",
      category: "accessories",
      isNew: true
    },
    {
      id: 5,
      name: "Original Abstract Art",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80",
      category: "art"
    },
    {
      id: 6,
      name: "Designer Hoodie",
      price: 599.99,
      originalPrice: 699.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
      category: "clothing"
    }
  ];

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
            Featured Collection
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, each crafted with attention to detail and designed to elevate your lifestyle.
          </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="animate-fade-in-up block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                {...product}
                onAddToCart={handleAddToCart}
              />
            </Link>
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
