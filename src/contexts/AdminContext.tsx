
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  stock: number;
  isCustomizable: boolean;
  isNew?: boolean;
  features?: string[];
  colors?: string[];
  sizes?: string[];
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    customization?: any;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'fulfilled' | 'shipped' | 'cancelled';
  orderDate: Date;
  shippingAddress: string;
  trackingNumber?: string;
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  isAdminLoggedIn: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string) => void;
  getAnalytics: () => any;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Custom T-Shirt",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"],
      category: "clothing",
      description: "Experience luxury with our premium custom t-shirt.",
      stock: 15,
      isCustomizable: true,
      isNew: true,
      features: ["100% Organic Cotton", "Gold Thread Accents", "Custom Design Ready"],
      colors: ["black", "white", "gold"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    {
      id: 2,
      name: "Artisan Coffee Mug",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&q=80",
      category: "accessories",
      description: "Handcrafted ceramic mug perfect for your morning ritual.",
      stock: 25,
      isCustomizable: true
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      items: [
        { productId: 1, productName: 'Premium Custom T-Shirt', quantity: 2, price: 299.99 }
      ],
      total: 599.98,
      status: 'pending',
      orderDate: new Date('2024-01-15'),
      shippingAddress: '123 Main St, Cape Town, South Africa'
    }
  ]);

  const adminLogin = (username: string, password: string): boolean => {
    // Simple admin authentication (in production, use proper authentication)
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id)) + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, productUpdate: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productUpdate } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, ...(trackingNumber && { trackingNumber }) }
        : order
    ));
  };

  const getAnalytics = () => {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const lowStockProducts = products.filter(p => p.stock < 5);
    
    return {
      totalSales,
      totalOrders,
      pendingOrders,
      lowStockProducts,
      averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0
    };
  };

  return (
    <AdminContext.Provider value={{
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
    }}>
      {children}
    </AdminContext.Provider>
  );
};
