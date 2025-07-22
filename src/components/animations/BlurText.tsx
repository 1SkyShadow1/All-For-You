import { useState, useEffect } from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const BlurText = ({ text, className = '', delay = 0 }: BlurTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? 'blur-0 opacity-100' : 'blur-sm opacity-0'
      } ${className}`}
    >
      {text}
    </div>
  );
};

export default BlurText;