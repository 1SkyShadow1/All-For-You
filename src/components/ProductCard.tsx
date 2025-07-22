
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
    <div className="product-card group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        {isNew && (
          <span className="absolute top-3 left-3 bg-gold-500 text-premium-black px-2 py-1 text-xs font-semibold rounded-full z-10">
            NEW
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            data-product-id={id}
            onClick={handleAddToCart}
            className="w-full btn-gold text-sm py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <p className="text-gold-400 text-sm font-medium mb-1 uppercase tracking-wide">
          {category}
        </p>
        <h3 className="text-white font-semibold mb-2 group-hover:text-gold-300 transition-colors">
          {name}
        </h3>
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
      </div>
    </div>
  );
};

export default ProductCard;
