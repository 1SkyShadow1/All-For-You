import { useState } from 'react';
import { User, Heart, Package, Star, Award, Gift, Settings, Crown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';

const Profile = () => {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Use user's actual orders or fallback to demo data
  const userOrders = user?.orders || [];
  const purchaseHistory = userOrders.length > 0 ? userOrders.map(order => ({
    id: order.id,
    date: order.date,
    total: order.total,
    status: order.status,
    items: order.items
  })) : [
    {
      id: "ORD-001",
      date: new Date('2024-01-15'),
      total: 599.98,
      status: "Delivered",
      items: [
        { name: "Custom Embroidered Hoodie", quantity: 1, price: 599.99 }
      ]
    },
    {
      id: "ORD-002", 
      date: new Date('2024-01-10'),
      total: 199.99,
      status: "Processing",
      items: [
        { name: "Personalized Phone Case", quantity: 1, price: 199.99 }
      ]
    }
  ];

  // Use wishlistItems from context, or fallback to demo data
  const demoWishlistItems = [
    {
      id: 1,
      name: "Custom Travel Mug",
      price: 149.99,
      image: "/products/mug-1.jpg",
      category: "accessories"
    },
    {
      id: 2,
      name: "Artisan Cutting Board",
      price: 299.99,
      image: "/products/cutting-board-1.jpg",
      category: "home"
    }
  ];

  const displayWishlistItems = isLoggedIn && wishlistItems.length > 0 ? wishlistItems : demoWishlistItems;

  const achievements = [
    { name: "First Purchase", description: "Made your first order", unlocked: true, icon: "🛍️" },
    { name: "Design Master", description: "Created 10 custom designs", unlocked: false, icon: "🎨" },
    { name: "VIP Member", description: "Spent over R5000", unlocked: true, icon: "👑" },
    { name: "Trendsetter", description: "First to buy new releases", unlocked: false, icon: "⭐" }
  ];

  // Create profile data from user context or fallback
  const profileData = user ? {
    name: user.name,
    email: user.email,
    tier: user.loyaltyTier,
    loyaltyPoints: user.loyaltyPoints,
    nextTierPoints: user.loyaltyTier === 'gold' ? 5000 : user.loyaltyTier === 'silver' ? 3000 : 1000,
    totalSpent: user.orders.reduce((sum, order) => sum + order.total, 0),
    ordersCount: user.orders.length,
    memberSince: "January 2024"
  } : {
    name: "Alex Johnson",
    email: "alex@example.com",
    tier: "Gold",
    loyaltyPoints: 2850,
    nextTierPoints: 5000,
    totalSpent: 4299.97,
    ordersCount: 12,
    memberSince: "January 2024"
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'achievements', name: 'Achievements', icon: Award }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(loginForm.email, loginForm.password);
      if (!success) {
        alert('Invalid credentials. Try demo@example.com / demo123');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-rich-black pt-24">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto glass-morphism p-8 rounded-2xl">
            <div className="text-center mb-8">
              <User className="mx-auto text-gold-400 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to access your profile</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full bg-rich-black border border-gold-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              <button type="submit" className="w-full btn-gold">
                Sign In
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-black pt-24">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gold-gradient rounded-full flex items-center justify-center mx-auto">
              <User className="text-premium-black" size={48} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gold-400 rounded-full p-2">
              <Crown className="text-premium-black" size={16} />
            </div>
          </div>
          <h1 className="text-4xl font-bold gold-foil">Welcome back, {profileData.name}</h1>
          <p className="text-gray-400 text-lg mt-2">{profileData.tier} Member</p>
          <p className="text-gray-400 text-sm">Member since {profileData.memberSince}</p>
          <button onClick={handleLogout} className="btn-gold mt-4">
            Sign Out
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-morphism p-6 rounded-2xl text-center">
            <Package className="mx-auto text-gold-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-gold-400">{profileData.ordersCount}</p>
            <p className="text-gray-400 text-sm">Total Orders</p>
          </div>
          
          <div className="glass-morphism p-6 rounded-2xl text-center">
            <Star className="mx-auto text-gold-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-gold-400">{profileData.loyaltyPoints}</p>
            <p className="text-gray-400 text-sm">Loyalty Points</p>
          </div>
          
          <div className="glass-morphism p-6 rounded-2xl text-center">
            <Gift className="mx-auto text-gold-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-gold-400">R{profileData.totalSpent.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">Total Spent</p>
          </div>
          
          <div className="glass-morphism p-6 rounded-2xl text-center">
            <Crown className="mx-auto text-gold-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-gold-400">{profileData.tier}</p>
            <p className="text-gray-400 text-sm">Current Tier</p>
          </div>
        </div>

        {/* Loyalty Progress */}
        <div className="glass-morphism p-6 rounded-2xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Loyalty Progress</h3>
            <div className="flex items-center text-gold-400">
              <Crown size={16} className="mr-1" />
              <span className="font-semibold">{profileData.tier}</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gold-gradient h-3 rounded-full transition-all duration-300"
              style={{ width: `${(profileData.loyaltyPoints / profileData.nextTierPoints) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{profileData.loyaltyPoints} points</span>
            <span className="text-gray-400">{profileData.nextTierPoints} points</span>
          </div>
          <p className="text-gray-400 text-sm">
            {profileData.nextTierPoints - profileData.loyaltyPoints} points to reach Platinum tier
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-gradient text-premium-black'
                  : 'bg-premium-black text-gray-300 hover:text-white border border-gold-600/30'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-morphism rounded-2xl p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {purchaseHistory.slice(0, 3).map((order) => (
                      <div key={order.id} className="p-4 bg-premium-black rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white font-medium">Order {order.id}</p>
                          <p className="text-gold-400 font-semibold">R{order.total.toFixed(2)}</p>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{order.date.toDateString()}</p>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, itemIndex) => (
                            <p key={itemIndex} className="text-gray-300 text-sm">
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-gray-400 text-xs">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-premium-black rounded-lg hover:bg-gold-600/10 transition-colors">
                      <span className="text-white">View All Orders</span>
                      <Package className="text-gold-400" size={20} />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-premium-black rounded-lg hover:bg-gold-600/10 transition-colors">
                      <span className="text-white">Account Settings</span>
                      <Settings className="text-gold-400" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
              <div className="space-y-4">
                {purchaseHistory.map((order) => (
                  <div key={order.id} className="p-6 bg-premium-black rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold">Order {order.id}</h3>
                        <p className="text-gray-400">{order.date.toDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold-400 font-semibold">R{order.total.toFixed(2)}</p>
                        <p className="text-green-400 text-sm">{order.status}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gold-600/20 rounded-lg flex items-center justify-center">
                              <span className="text-gold-400 text-sm font-semibold">{item.quantity}</span>
                            </div>
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">R{item.price.toFixed(2)} each</p>
                            </div>
                          </div>
                          <p className="text-gold-400 font-semibold">
                            R{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayWishlistItems.map((item) => (
                  <div key={item.id} className="bg-premium-black rounded-lg p-4">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                    <p className="text-gold-400 font-semibold">R{item.price.toFixed(2)}</p>
                    <button className="w-full mt-4 btn-gold">
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-gold-gradient/10 border-gold-400'
                        : 'bg-gray-800/50 border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`text-3xl ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${achievement.unlocked ? 'text-gold-400' : 'text-gray-400'}`}>
                          {achievement.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="text-gold-400">
                          <Award size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
