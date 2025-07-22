import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const InfiniteScroll = ({ 
  items, 
  speed = 50, 
  direction = 'left', 
  className = '' 
}: InfiniteScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const animation = element.animate(
      [
        { transform: `translateX(${direction === 'left' ? '0%' : '-100%'})` },
        { transform: `translateX(${direction === 'left' ? '-100%' : '0%'})` }
      ],
      {
        duration: speed * 1000,
        iterations: Infinity,
      }
    );

    if (isPaused) {
      animation.pause();
    } else {
      animation.play();
    }

    return () => animation.cancel();
  }, [speed, direction, isPaused]);

  return (
    <div 
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={scrollRef} className="flex whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;