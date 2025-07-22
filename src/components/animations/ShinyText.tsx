import { useEffect, useRef } from 'react';

interface ShinyTextProps {
  text: string;
  className?: string;
}

const ShinyText = ({ text, className = '' }: ShinyTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      element.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)';
      element.style.backgroundSize = '200% 100%';
      element.style.animation = 'shine 0.8s ease-in-out';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    return () => element.removeEventListener('mouseenter', handleMouseEnter);
  }, []);

  return (
    <span
      ref={textRef}
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 hover:from-white hover:via-gold-200 hover:to-white transition-all duration-300 ${className}`}
      style={{
        backgroundSize: '200% 100%',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;