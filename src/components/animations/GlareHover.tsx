import { useRef } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
}

const GlareHover = ({ children, className = '' }: GlareHoverProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {children}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
    </div>
  );
};

export default GlareHover;