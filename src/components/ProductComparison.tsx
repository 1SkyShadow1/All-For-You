
import { useState } from 'react';
import { X, Plus, Check, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  features: string[];
}

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const ProductComparison = ({ isOpen, onClose, products }: ProductComparisonProps) => {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    if (compareProducts.length < 3 && !compareProducts.find(p => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareProducts(compareProducts.filter(p => p.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-4 bg-rich-black border border-gold-400/20 rounded-xl z-50 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold gold-foil">Product Comparison</h2>
            <button onClick={onClose} className="text-gold-400 hover:text-gold-300">
              <X size={24} />
            </button>
          </div>

          {compareProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-gold-400/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="text-gold-400" size={32} />
                </div>
                <p className="text-gray-300 text-lg">Select products to compare</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.slice(0, 6).map(product => (
                  <div key={product.id} className="product-card p-4">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h3 className="text-white font-medium mb-2">{product.name}</h3>
                    <button
                      onClick={() => addToCompare(product)}
                      className="btn-gold w-full text-sm py-2"
                    >
                      Add to Compare
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="p-4"></td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                          <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                          <h3 className="text-white font-semibold">{product.name}</h3>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gold-400/20">
                    <td className="p-4 font-semibold text-gold-400">Price</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="p-4 text-center text-gold-400 font-bold">
                        R{product.price.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gold-400/20">
                    <td className="p-4 font-semibold text-gold-400">Rating</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex justify-center items-center space-x-1">
                          <Star className="text-gold-400 fill-current" size={16} />
                          <span>{product.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gold-400/20">
                    <td className="p-4 font-semibold text-gold-400">Features</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="p-4">
                        <ul className="space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-center space-x-2">
                              <Check className="text-green-400" size={16} />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductComparison;
