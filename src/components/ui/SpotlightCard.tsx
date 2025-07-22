import { useRef } from 'react';
import GlareHover from '../animations/GlareHover';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(212, 175, 55, 0.1)' 
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 300px at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 40%)`,
        }}
      />
      <GlareHover className="relative z-10">
        {children}
      </GlareHover>
    </div>
  );
};

export default SpotlightCard;