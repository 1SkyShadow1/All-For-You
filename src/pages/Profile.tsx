import { useState } from 'react';
import { User, Heart, Package, Star, Award, Gift, Settings, Crown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, isLoggedIn, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm.email, loginForm.password);
    if (!success) {
      alert('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-rich-black pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto glass-morphism p-8 rounded-2xl">
            <h1 className="text-3xl font-bold text-center mb-8 gold-foil">Welcome Back</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gold-300 mb-2">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gold-300 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-gold">
                Sign In
              </button>
            </form>
            <p className="text-gray-400 text-sm text-center mt-4">
              Demo: demo@example.com / demo123
            </p>
          </div>
        </div>
      </div>
    );
  }

  const profileData = {
    name: "Alexandra Johnson",
    email: "alexandra@example.com",
    memberSince: "January 2023",
    totalSpent: 2450.00,
    totalOrders: 12,
    loyaltyTier: "Gold",
    loyaltyPoints: 2450,
    nextTierPoints: 3000
  };

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 299.99,
      status: "Delivered",
      items: 2
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      total: 149.99,
      status: "Processing",
      items: 1
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Designer Hoodie",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80"
    },
    {
      id: 2,
      name: "Original Abstract Art",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80"
    }
  ];

  const achievements = [
    { name: "First Purchase", description: "Made your first order", unlocked: true, icon: "🛍️" },
    { name: "Loyal Customer", description: "5+ orders completed", unlocked: true, icon: "❤️" },
    { name: "Gold Member", description: "Reached Gold tier", unlocked: true, icon: "👑" },
    { name: "Custom Creator", description: "Created custom design", unlocked: false, icon: "🎨" }
  ];

  const loyaltyProgress = (profileData.loyaltyPoints / profileData.nextTierPoints) * 100;

  return (
    <div className="min-h-screen bg-rich-black pt-24">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold gold-foil">Welcome back, {user?.name}</h1>
          <button onClick={logout} className="btn-gold">
            Sign Out
          </button>
        </div>

        <div className="bg-rich-black rounded-xl p-8 border border-gold-600/20 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center">
              <User size={40} className="text-premium-black" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                <div className="flex items-center bg-gold-500 text-premium-black px-3 py-1 rounded-full text-sm font-semibold">
                  <Crown size={16} className="mr-1" />
                  {profileData.loyaltyTier}
                </div>
              </div>
              <p className="text-gray-300 mb-4">{profileData.email}</p>
              <p className="text-gray-400 text-sm">Member since {profileData.memberSince}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-gold-400">R{profileData.totalSpent.toFixed(2)}</p>
                <p className="text-gray-400 text-sm">Total Spent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gold-400">{profileData.totalOrders}</p>
                <p className="text-gray-400 text-sm">Orders</p>
              </div>
            </div>
          </div>

          {/* Loyalty Progress */}
          <div className="mt-8 p-6 bg-premium-black rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center">
                <Award className="mr-2 text-gold-400" size={20} />
                Loyalty Progress
              </h3>
              <span className="text-gold-400 font-semibold">{profileData.loyaltyPoints} / {profileData.nextTierPoints} points</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-gold-gradient h-3 rounded-full transition-all duration-300"
                style={{ width: `${loyaltyProgress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm">
              {profileData.nextTierPoints - profileData.loyaltyPoints} points to reach Platinum tier
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-gold-400 border-b-2 border-gold-400'
                  : 'text-gray-400 hover:text-gold-300'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Package className="mr-2 text-gold-400" size={20} />
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-premium-black rounded-lg">
                      <div>
                        <p className="text-white font-medium">{order.id}</p>
                        <p className="text-gray-400 text-sm">{order.date} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold-400 font-semibold">R{order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
                <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-4 bg-premium-black rounded-lg hover:bg-gold-400/10 transition-colors">
                    <Gift className="text-gold-400" size={20} />
                    <span className="text-white">Redeem Points</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-4 bg-premium-black rounded-lg hover:bg-gold-400/10 transition-colors">
                    <Star className="text-gold-400" size={20} />
                    <span className="text-white">Leave Review</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-4 bg-premium-black rounded-lg hover:bg-gold-400/10 transition-colors">
                    <Package className="text-gold-400" size={20} />
                    <span className="text-white">Track Order</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                  <p className="text-gold-400 font-bold text-lg mb-4">R{item.price}</p>
                  <button className="w-full btn-gold">Add to Cart</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-6 rounded-xl border ${
                  achievement.unlocked 
                    ? 'bg-rich-black border-gold-600/20' 
                    : 'bg-gray-900 border-gray-700'
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <h3 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                  </div>
                  <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 bg-gold-500 text-premium-black px-2 py-1 text-xs rounded-full">
                      Unlocked
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
