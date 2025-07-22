import { useState } from 'react';
import { Home, Search, ShoppingCart, User, Heart, Settings } from 'lucide-react';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items?: DockItem[];
  className?: string;
}

const Dock = ({ items, className = '' }: DockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultItems: DockItem[] = [
    { icon: <Home size={20} />, label: 'Home', onClick: () => {} },
    { icon: <Search size={20} />, label: 'Search', onClick: () => {} },
    { icon: <ShoppingCart size={20} />, label: 'Cart', onClick: () => {} },
    { icon: <Heart size={20} />, label: 'Wishlist', onClick: () => {} },
    { icon: <User size={20} />, label: 'Profile', onClick: () => {} },
    { icon: <Settings size={20} />, label: 'Settings', onClick: () => {} },
  ];

  const dockItems = items || defaultItems;

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="glass-morphism rounded-2xl p-2 border border-gold-400/20">
        <div className="flex items-end space-x-2">
          {dockItems.map((item, index) => (
            <button
              key={index}
              className="relative group p-3 rounded-xl transition-all duration-300 hover:bg-gold-400/10"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={item.onClick}
              style={{
                transform: hoveredIndex === index ? 'scale(1.2) translateY(-8px)' : 'scale(1)',
              }}
            >
              <div className="text-gold-400 group-hover:text-gold-300 transition-colors">
                {item.icon}
              </div>
              
              {/* Tooltip */}
              <div
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-premium-black text-gold-400 text-xs rounded whitespace-nowrap transition-all duration-200 ${
                  hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dock;