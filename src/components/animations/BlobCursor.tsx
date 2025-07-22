import { useEffect, useRef } from 'react';

const BlobCursor = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dx = targetRef.current.x - positionRef.current.x;
      const dy = targetRef.current.y - positionRef.current.y;
      
      positionRef.current.x += dx * 0.1;
      positionRef.current.y += dy * 0.1;

      blob.style.transform = `translate(${positionRef.current.x - 20}px, ${positionRef.current.y - 20}px)`;
      
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
      ref={blobRef}
      className="fixed w-10 h-10 bg-gold-400/20 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        filter: 'blur(8px)',
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

export default BlobCursor;