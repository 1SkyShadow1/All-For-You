
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  loyaltyPoints: number;
  orders: Array<{
    id: string;
    date: Date;
    total: number;
    status: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  }>;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user
    if (email === 'demo@example.com' && password === 'demo123') {
      const demoUser: User = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        loyaltyTier: 'gold',
        loyaltyPoints: 2450,
        orders: [
          {
            id: 'ORD-001',
            date: new Date('2024-01-15'),
            total: 599.98,
            status: 'Delivered',
            items: [
              { name: 'Premium Custom T-Shirt', quantity: 2, price: 299.99 }
            ]
          }
        ]
      };
      setUser(demoUser);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      loyaltyTier: 'bronze',
      loyaltyPoints: 0,
      orders: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
