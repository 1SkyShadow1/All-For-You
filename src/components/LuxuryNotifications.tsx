
import { useState, useEffect } from 'react';
import { Eye, ShoppingBag, Star, Users } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'purchase' | 'view' | 'review' | 'stock';
  timestamp: Date;
}

const LuxuryNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const sampleNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
    { message: "Sarah from Cape Town just purchased a Premium Custom T-Shirt", type: 'purchase' },
    { message: "12 people are viewing this product right now", type: 'view' },
    { message: "James left a 5-star review: 'Exceptional quality!'", type: 'review' },
    { message: "Only 3 items left in stock - Limited Edition Hoodie", type: 'stock' },
    { message: "Emma from Johannesburg just added this to wishlist", type: 'purchase' },
  ];

  useEffect(() => {
    const showRandomNotification = () => {
      const randomNotif = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      const notification: Notification = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...randomNotif
      };
      
      setCurrentNotification(notification);
      
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    };

    const interval = setInterval(showRandomNotification, 8000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'purchase': return <ShoppingBag size={16} />;
      case 'view': return <Eye size={16} />;
      case 'review': return <Star size={16} />;
      case 'stock': return <Users size={16} />;
      default: return <ShoppingBag size={16} />;
    }
  };

  if (!currentNotification) return null;

  return (
    <div className={`fixed bottom-6 left-6 z-50 transform transition-all duration-500 ${
      currentNotification ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="glass-morphism rounded-lg p-4 max-w-sm shadow-gold animate-slide-in-left">
        <div className="flex items-center space-x-3">
          <div className="text-gold-400 animate-pulse">
            {getIcon(currentNotification.type)}
          </div>
          <p className="text-white text-sm font-medium">
            {currentNotification.message}
          </p>
        </div>
        <div className="mt-2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gold-gradient animate-[shrink_4s_linear]" />
        </div>
      </div>
    </div>
  );
};

export default LuxuryNotifications;
