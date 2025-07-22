import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import CheckoutFlow from './CheckoutFlow';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Custom T-Shirt",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
      quantity: 2,
      size: "M",
      color: "black"
    },
    {
      id: 2,
      name: "Artisan Coffee Mug",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=200&q=80",
      quantity: 1
    }
  ]);

  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-rich-black z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold-600/20">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-gold-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
            <span className="bg-gold-500 text-premium-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-6 border-b border-gold-600/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">
              {subtotal >= 500 ? 'You qualify for free shipping!' : `Spend R${(500 - subtotal).toFixed(2)} more for free shipping`}
            </span>
            <Truck className={`${subtotal >= 500 ? 'text-gold-400' : 'text-gray-500'}`} size={16} />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gold-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="text-gray-500 mx-auto mb-4" size={48} />
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 p-4 bg-premium-black rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm">{item.name}</h3>
                    {item.size && (
                      <p className="text-gray-400 text-xs">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-gray-400 text-xs">Color: {item.color}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gold-400 hover:text-premium-black transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gold-400 hover:text-premium-black transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      <span className="text-gold-400 font-semibold">
                        R{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gold-600/20 p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-white font-semibold text-lg border-t border-gold-600/20 pt-2">
                <span>Total</span>
                <span className="text-gold-400">R{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full btn-gold text-lg py-4 animate-glow"
            >
              Secure Checkout
            </button>
            
            <button 
              onClick={onClose}
              className="w-full border-2 border-gold-400 text-gold-400 py-3 rounded-lg font-semibold hover:bg-gold-400 hover:text-premium-black transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Checkout Flow */}
      <CheckoutFlow
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))}
        total={total}
      />
    </>
  );
};

export default Cart;
