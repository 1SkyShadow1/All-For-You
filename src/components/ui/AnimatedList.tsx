import { useState, useEffect } from 'react';

interface AnimatedListItem {
  id: string;
  content: React.ReactNode;
}

interface AnimatedListProps {
  items: AnimatedListItem[];
  className?: string;
  stagger?: number;
}

const AnimatedList = ({ items, className = '', stagger = 0.1 }: AnimatedListProps) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, item.id]));
      }, index * stagger * 1000);
    });
  }, [items, stagger]);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`transform transition-all duration-500 ${
            visibleItems.has(item.id)
              ? 'translate-x-0 opacity-100'
              : 'translate-x-8 opacity-0'
          }`}
          style={{ transitionDelay: `${index * stagger}s` }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default AnimatedList;