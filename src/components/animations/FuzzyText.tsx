import { useState, useEffect } from 'react';

interface FuzzyTextProps {
  text: string;
  className?: string;
  intensity?: number;
}

const FuzzyText = ({ text, className = '', intensity = 0.5 }: FuzzyTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`inline-block transition-all duration-300 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isHovered ? 'blur(0px)' : `blur(${intensity}px)`,
        textShadow: isHovered 
          ? '0 0 10px rgba(212, 175, 55, 0.8)' 
          : `0 0 ${intensity * 10}px rgba(212, 175, 55, 0.3)`,
      }}
    >
      {text}
    </span>
  );
};

export default FuzzyText;