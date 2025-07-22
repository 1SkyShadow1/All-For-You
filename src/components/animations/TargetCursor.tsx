import { useEffect, useRef } from 'react';

const TargetCursor = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dx = target.current.x - position.current.x;
      const dy = target.current.y - position.current.y;
      
      position.current.x += dx * 0.1;
      position.current.y += dy * 0.1;

      if (targetRef.current) {
        targetRef.current.style.transform = `translate(${position.current.x - 20}px, ${position.current.y - 20}px)`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={targetRef}
      className="fixed w-10 h-10 pointer-events-none z-50 mix-blend-difference"
      style={{
        border: '2px solid #d4af37',
        borderRadius: '50%',
        background: 'transparent',
      }}
    >
      <div className="absolute inset-2 border border-gold-400 rounded-full" />
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default TargetCursor;