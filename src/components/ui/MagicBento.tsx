import { ReactNode } from 'react';
import SpotlightCard from './SpotlightCard';

interface BentoItem {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  className?: string;
  span?: 'col-span-1' | 'col-span-2' | 'row-span-2';
}

interface MagicBentoProps {
  items: BentoItem[];
  className?: string;
}

const MagicBento = ({ items, className = '' }: MagicBentoProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, index) => (
        <SpotlightCard
          key={item.id}
          className={`glass-morphism p-6 rounded-xl border border-gold-600/20 hover:border-gold-400/40 transition-all duration-300 ${item.span || ''} ${item.className || ''}`}
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            {item.description && (
              <p className="text-gray-300 text-sm">{item.description}</p>
            )}
            <div className="relative z-10">
              {item.content}
            </div>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
};

export default MagicBento;