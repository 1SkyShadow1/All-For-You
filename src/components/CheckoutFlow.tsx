import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Lock, Truck, Gift } from 'lucide-react';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
}

const CheckoutFlow = ({ isOpen, onClose, cartItems, total }: CheckoutFlowProps) => {
  const { isLoggedIn, login, register } = useAuth();
  const [checkoutStep, setCheckoutStep] = useState(isLoggedIn ? 'shipping' : 'auth');
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'guest'>('login');
  const [loading, setLoading] = useState(false);
  
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (authMode === 'login') {
        const success = await login(authForm.email, authForm.password);
        if (success) {
          setCheckoutStep('shipping');
        } else {
          alert('Invalid credentials');
        }
      } else if (authMode === 'register') {
        const success = await register(authForm.name, authForm.email, authForm.password);
        if (success) {
          setCheckoutStep('shipping');
        }
      } else {
        // Guest checkout
        setCheckoutStep('shipping');
      }
    } catch (error) {
      alert('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment
    alert('Order placed successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="glass-morphism rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gold-600/20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold gold-foil">Secure Checkout</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Order Summary */}
          <div className="lg:w-1/3 p-6 bg-premium-black/50">
            <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gold-400 font-semibold">R{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gold-600/20 pt-4">
              <div className="flex justify-between text-white text-lg font-bold">
                <span>Total</span>
                <span className="text-gold-400">R{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Forms */}
          <div className="lg:w-2/3 p-6">
            {/* Progress Bar */}
            <div className="flex items-center mb-8">
              <div className={`flex-1 h-2 rounded-full ${checkoutStep !== 'auth' ? 'bg-gold-400' : 'bg-gray-600'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${checkoutStep !== 'auth' ? 'bg-gold-400 text-premium-black' : 'bg-gray-600 text-white'}`}>
                1
              </div>
              <div className={`flex-1 h-2 rounded-full ${checkoutStep === 'payment' ? 'bg-gold-400' : 'bg-gray-600'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${checkoutStep === 'payment' ? 'bg-gold-400 text-premium-black' : 'bg-gray-600 text-white'}`}>
                2
              </div>
              <div className="flex-1 h-2 rounded-full bg-gray-600" />
            </div>

            {/* Authentication Step */}
            {checkoutStep === 'auth' && (
              <div>
                <div className="flex space-x-4 mb-6">
                  {['login', 'register', 'guest'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setAuthMode(mode as any)}
                      className={`px-4 py-2 rounded-lg capitalize ${
                        authMode === mode ? 'bg-gold-500 text-premium-black' : 'border border-gold-400 text-gold-400'
                      }`}
                    >
                      {mode === 'guest' ? 'Guest Checkout' : mode}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  {authMode === 'register' && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={authForm.name}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                  )}
                  
                  {authMode !== 'guest' && (
                    <>
                      <input
                        type="email"
                        placeholder="Email"
                        value={authForm.email}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={authForm.password}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                        required
                      />
                    </>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full btn-gold"
                  >
                    {loading ? 'Processing...' : 'Continue to Shipping'}
                  </button>
                </form>

                {authMode === 'login' && (
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Demo: demo@example.com / demo123
                  </p>
                )}
              </div>
            )}

            {/* Shipping Step */}
            {checkoutStep === 'shipping' && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Truck className="mr-2" size={20} />
                  Shipping Information
                </h3>
                
                <form onSubmit={handleShipping} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, lastName: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                  </div>
                  
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                    required
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, city: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <select
                      value={shippingForm.province}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, province: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    >
                      <option value="">Province</option>
                      <option value="WC">Western Cape</option>
                      <option value="GP">Gauteng</option>
                      <option value="KZN">KwaZulu-Natal</option>
                      <option value="EC">Eastern Cape</option>
                      <option value="FS">Free State</option>
                      <option value="LP">Limpopo</option>
                      <option value="MP">Mpumalanga</option>
                      <option value="NC">Northern Cape</option>
                      <option value="NW">North West</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={shippingForm.postalCode}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, postalCode: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                  </div>

                  <button type="submit" className="w-full btn-gold">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Payment Step */}
            {checkoutStep === 'payment' && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Payment Information
                </h3>
                
                <form onSubmit={handlePayment} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentForm.expiryDate}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, cvv: e.target.value }))}
                      className="p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={paymentForm.nameOnCard}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, nameOnCard: e.target.value }))}
                    className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                    required
                  />

                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <Lock size={16} />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  <button type="submit" className="w-full btn-gold text-lg py-4">
                    Complete Order - R{total.toFixed(2)}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
