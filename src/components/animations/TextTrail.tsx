import { useState, useRef, useEffect } from 'react';

interface TextTrailProps {
  text: string;
  className?: string;
  trailLength?: number;
}

const TextTrail = ({ text, className = '', trailLength = 5 }: TextTrailProps) => {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTrails(prev => [
      { x, y, id: idRef.current++ },
      ...prev.slice(0, trailLength - 1)
    ]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTrails(prev => prev.slice(0, -1));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTrails([])}
    >
      <span className="relative z-10">{text}</span>
      {trails.map((trail, index) => (
        <span
          key={trail.id}
          className="absolute pointer-events-none text-gold-400"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (trailLength - index) / trailLength,
            transform: `scale(${(trailLength - index) / trailLength})`,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default TextTrail;