import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number;
}

const GlitchText = ({ text, className = '', intensity = 1 }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isGlitching) return;

    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isGlitching]);

  return (
    <span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      style={{
        animation: isGlitching ? `glitch ${0.3 / intensity}s infinite` : 'none',
      }}
    >
      {text}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-red-500 opacity-80"
            style={{
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
              clipPath: 'inset(0 0 50% 0)',
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-blue-500 opacity-80"
            style={{
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
              clipPath: 'inset(50% 0 0 0)',
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;