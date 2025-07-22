
import { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Bell
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const AdminDashboard = () => {
  const { 
    products, 
    orders, 
    isAdminLoggedIn, 
    adminLogin, 
    adminLogout,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    getAnalytics 
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    image: '',
    category: '',
    description: '',
    stock: 0,
    isCustomizable: false
  });

  const analytics = getAnalytics();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminLogin(loginForm.username, loginForm.password)) {
      alert('Invalid credentials');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(productForm);
    setProductForm({
      name: '',
      price: 0,
      image: '',
      category: '',
      description: '',
      stock: 0,
      isCustomizable: false
    });
    setShowAddProduct(false);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <div className="glass-morphism p-8 rounded-2xl max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-center mb-8 gold-foil">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gold-300 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-gold-300 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="w-full btn-gold">
              Login to Dashboard
            </button>
          </form>
          <p className="text-gray-400 text-sm text-center mt-4">
            Demo credentials: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-black">
      {/* Header */}
      <header className="glass-morphism border-b border-gold-600/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gold-foil">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gold-300 hover:text-gold-400">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {analytics.pendingOrders}
                </span>
              </button>
              <button onClick={adminLogout} className="btn-gold">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-gold-500 text-premium-black' 
                  : 'bg-premium-black text-gold-300 hover:bg-gold-400/10'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Sales</p>
                    <p className="text-2xl font-bold text-gold-400">R{analytics.totalSales.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="text-green-400" size={24} />
                </div>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalOrders}</p>
                  </div>
                  <ShoppingCart className="text-blue-400" size={24} />
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Orders</p>
                    <p className="text-2xl font-bold text-orange-400">{analytics.pendingOrders}</p>
                  </div>
                  <Package className="text-orange-400" size={24} />
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Low Stock Items</p>
                    <p className="text-2xl font-bold text-red-400">{analytics.lowStockProducts.length}</p>
                  </div>
                  <AlertTriangle className="text-red-400" size={24} />
                </div>
              </div>
            </div>

            {/* Low Stock Alert */}
            {analytics.lowStockProducts.length > 0 && (
              <div className="glass-morphism p-6 rounded-xl border border-red-500/30">
                <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                  <AlertTriangle className="mr-2" size={20} />
                  Low Stock Alert
                </h3>
                <div className="space-y-2">
                  {analytics.lowStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="text-white">{product.name}</span>
                      <span className="text-red-400 font-semibold">{product.stock} left</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Product Management</h2>
              <button 
                onClick={() => setShowAddProduct(true)}
                className="btn-gold flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="glass-morphism p-6 rounded-xl max-w-md w-full max-h-screen overflow-y-auto">
                  <h3 className="text-xl font-bold text-white mb-4">Add New Product</h3>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={productForm.image}
                      onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                      <option value="home">Home & Living</option>
                      <option value="art">Art & Design</option>
                    </select>
                    <textarea
                      placeholder="Description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      rows={3}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Stock Quantity"
                      value={productForm.stock}
                      onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                      className="w-full p-3 bg-premium-black border border-gold-600/30 rounded-lg text-white"
                      required
                    />
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={productForm.isCustomizable}
                        onChange={(e) => setProductForm(prev => ({ ...prev, isCustomizable: e.target.checked }))}
                        className="rounded"
                      />
                      <span>Customizable Product</span>
                    </label>
                    <div className="flex space-x-3">
                      <button type="submit" className="btn-gold flex-1">Add Product</button>
                      <button 
                        type="button" 
                        onClick={() => setShowAddProduct(false)}
                        className="border border-gray-500 text-gray-300 px-4 py-2 rounded-lg flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="glass-morphism p-4 rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <p className="text-gold-400 font-bold mb-2">R{product.price}</p>
                  <p className="text-gray-400 text-sm mb-2">Stock: {product.stock}</p>
                  <p className="text-gray-400 text-sm mb-4">{product.category}</p>
                  {product.isCustomizable && (
                    <span className="bg-gold-500 text-premium-black px-2 py-1 text-xs rounded-full mb-4 inline-block">
                      Customizable
                    </span>
                  )}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Order Management</h2>
            
            <div className="glass-morphism rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-premium-black">
                    <tr>
                      <th className="text-left p-4 text-gold-300">Order ID</th>
                      <th className="text-left p-4 text-gold-300">Customer</th>
                      <th className="text-left p-4 text-gold-300">Total</th>
                      <th className="text-left p-4 text-gold-300">Status</th>
                      <th className="text-left p-4 text-gold-300">Date</th>
                      <th className="text-left p-4 text-gold-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-t border-gold-600/20">
                        <td className="p-4 text-white font-mono">{order.id}</td>
                        <td className="p-4 text-white">{order.customerName}</td>
                        <td className="p-4 text-gold-400 font-semibold">R{order.total.toFixed(2)}</td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'pending' ? 'bg-orange-500 text-white' :
                              order.status === 'processing' ? 'bg-blue-500 text-white' :
                              order.status === 'fulfilled' ? 'bg-green-500 text-white' :
                              order.status === 'shipped' ? 'bg-purple-500 text-white' :
                              'bg-red-500 text-white'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="fulfilled">Fulfilled</option>
                            <option value="shipped">Shipped</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-gray-400">{order.orderDate.toLocaleDateString()}</td>
                        <td className="p-4">
                          <button className="text-gold-400 hover:text-gold-300">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Sales Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Revenue</span>
                    <span className="text-gold-400 font-bold">R{analytics.totalSales.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Order Value</span>
                    <span className="text-white font-semibold">R{analytics.averageOrderValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Products</span>
                    <span className="text-white font-semibold">{products.length}</span>
                  </div>
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-gold flex items-center justify-center space-x-2">
                    <Download size={16} />
                    <span>Export Sales Report</span>
                  </button>
                  <button className="w-full border border-gold-400 text-gold-400 py-2 rounded-lg hover:bg-gold-400/10">
                    Generate Inventory Report
                  </button>
                  <button className="w-full border border-gold-400 text-gold-400 py-2 rounded-lg hover:bg-gold-400/10">
                    Customer Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
