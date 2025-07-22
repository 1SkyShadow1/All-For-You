
import { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';

interface InventoryCountdownProps {
  stock: number;
  threshold?: number;
}

const InventoryCountdown = ({ stock, threshold = 10 }: InventoryCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (stock > threshold) return null;

  const urgencyLevel = stock <= 3 ? 'critical' : stock <= 7 ? 'high' : 'medium';
  
  const getBgColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'bg-red-500/20 border-red-500/50';
      case 'high': return 'bg-orange-500/20 border-orange-500/50';
      default: return 'bg-gold-500/20 border-gold-500/50';
    }
  };

  const getTextColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      default: return 'text-gold-400';
    }
  };

  return (
    <div className={`rounded-lg border p-4 mb-6 ${getBgColor()} animate-pulse`}>
      <div className="flex items-center space-x-2 mb-3">
        <Flame className={`${getTextColor()} animate-bounce`} size={20} />
        <span className={`font-bold ${getTextColor()}`}>
          {urgencyLevel === 'critical' ? 'ALMOST SOLD OUT!' : 'LIMITED STOCK!'}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-white">
          <p className="text-sm">Only <span className={`font-bold ${getTextColor()}`}>{stock} left</span> in stock</p>
          <p className="text-xs text-gray-400">Don't miss out on this exclusive item</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="text-gold-400" size={16} />
          <div className="text-gold-400 font-mono text-sm">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
      
      <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            urgencyLevel === 'critical' ? 'bg-red-500' : 
            urgencyLevel === 'high' ? 'bg-orange-500' : 'bg-gold-500'
          }`}
          style={{ width: `${(stock / threshold) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryCountdown;
