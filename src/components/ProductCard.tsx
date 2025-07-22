import GlareHover from './animations/GlareHover';
import MagnetButton from './animations/MagnetButton';
import { useState } from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  onAddToCart: (id: number) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  isNew, 
  onAddToCart 
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleAddToCart = () => {
    onAddToCart(id);
    
    // Add visual feedback
    const button = document.querySelector(`[data-product-id="${id}"]`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 600);
    }
  };

  return (
    <GlareHover className="product-card group cursor-pointer h-full bg-rich-black rounded-xl overflow-hidden border border-gold-600/10 hover:border-gold-400/30 transition-all duration-500">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        {isNew && (
          <span className="absolute top-3 left-3 bg-gold-gradient text-premium-black px-3 py-1 text-xs font-bold rounded-full z-10 animate-pulse">
            NEW
          </span>
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex space-x-2">
            <MagnetButton
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </MagnetButton>
            
            <MagnetButton
              className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300"
            >
              <Eye size={16} />
            </MagnetButton>
            
            <MagnetButton
              onClick={handleAddToCart}
              className="p-3 rounded-full bg-gold-500 text-premium-black hover:bg-gold-400 backdrop-blur-md transition-all duration-300"
            >
              <ShoppingCart size={16} />
            </MagnetButton>
          </div>
        </div>
        
        {/* Price Badge */}
        {originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider bg-gold-400/10 px-2 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  i < 4 ? 'bg-gold-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        <h3 className="text-white font-semibold mb-3 group-hover:text-gold-300 transition-colors line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-gold-400 font-bold text-lg">
              R{price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                R{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <MagnetButton
            onClick={handleAddToCart}
            className="btn-gold text-xs px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            Add to Cart
          </MagnetButton>
        </div>
      </div>
    </GlareHover>
  );
};

export default ProductCard;