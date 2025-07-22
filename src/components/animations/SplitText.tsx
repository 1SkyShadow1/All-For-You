import { useEffect, useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const SplitText = ({ text, className = '', delay = 0, stagger = 0.05 }: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    chars.forEach((char, index) => {
      const element = char as HTMLElement;
      element.style.animationDelay = `${delay + index * stagger}s`;
      element.classList.add('animate-fade-in-up');
    });
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default SplitText;