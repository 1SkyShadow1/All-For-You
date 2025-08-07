
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
      image: "/products/tshirt-1.jpg",
      images: ["/products/tshirt-detail-1.jpg", "/products/tshirt-detail-2.jpg", "/products/tshirt-detail-3.jpg"],
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
      name: "Custom Travel Mug",
      price: 149.99,
      image: "/products/mug-1.jpg",
      category: "accessories",
      description: "Handcrafted ceramic mug perfect for your morning ritual.",
      stock: 25,
      isCustomizable: true
    },
    {
      id: 3,
      name: "Personalized Baseball Cap",
      price: 199.99,
      image: "/products/cap-1.jpg",
      category: "clothing",
      description: "Premium baseball cap with custom embroidery options.",
      stock: 18,
      isCustomizable: true,
      features: ["Adjustable Strap", "Custom Logo", "UV Protection"],
      colors: ["black", "white", "navy", "red"]
    },
    {
      id: 4,
      name: "Custom Embroidered Hoodie",
      price: 599.99,
      image: "/products/hoodie-1.jpg",
      category: "clothing",
      description: "Luxurious hoodie with premium embroidery and gold accents.",
      stock: 12,
      isCustomizable: true,
      features: ["Cotton Blend", "Lined Hood", "Custom Embroidery"],
      colors: ["black", "grey", "navy"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 5,
      name: "Artisan Cutting Board",
      price: 299.99,
      image: "/products/cutting-board-1.jpg",
      category: "home",
      description: "Handcrafted wooden cutting board, perfect for custom engraving.",
      stock: 8,
      isCustomizable: true,
      features: ["Solid Wood", "Food Safe Finish", "Custom Engraving"]
    },
    {
      id: 6,
      name: "Personalized Phone Case",
      price: 99.99,
      image: "/products/phone-case-1.jpg",
      category: "accessories",
      description: "Protective phone case with custom design options.",
      stock: 30,
      isCustomizable: true,
      features: ["Drop Protection", "Custom Graphics", "Multiple Models"]
    },
    {
      id: 7,
      name: "Custom Canvas Art",
      price: 0.00, // You'll provide the price
      image: "/products/canvas-1.jpg",
      images: ["/products/canvas-1.jpg", "/products/canvas-2.jpg", "/products/canvas-3.jpg", "/products/canvas-4.jpg"],
      category: "art",
      description: "Beautiful custom canvas artwork available in multiple designs and sizes.",
      stock: 15,
      isCustomizable: true,
      features: ["High Quality Canvas", "Custom Design", "Multiple Sizes", "Gallery Wrap"],
      sizes: ["Small (12x16)", "Medium (16x20)", "Large (20x24)", "Extra Large (24x36)"]
    },
    {
      id: 8,
      name: "Designer Tote Bag",
      price: 0.00, // You'll provide the price
      image: "/products/bag-1.jpg",
      category: "accessories",
      description: "Stylish and functional tote bag for everyday use.",
      stock: 22,
      isCustomizable: true,
      features: ["Durable Material", "Custom Print", "Large Capacity"],
      colors: ["black", "white", "navy", "brown"]
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
