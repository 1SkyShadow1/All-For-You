import { useState, useRef } from 'react';

interface TextPressureProps {
  text: string;
  className?: string;
}

const TextPressure = ({ text, className = '' }: TextPressureProps) => {
  const [pressure, setPressure] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
    const newPressure = Math.max(0, 1 - distance / maxDistance);
    
    setPressure(newPressure);
  };

  return (
    <span
      ref={textRef}
      className={`inline-block transition-all duration-200 cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPressure(0)}
      style={{
        fontWeight: 400 + pressure * 500,
        transform: `scale(${1 + pressure * 0.2})`,
        color: `hsl(${45 + pressure * 30}, 70%, ${50 + pressure * 30}%)`,
      }}
    >
      {text}
    </span>
  );
};

export default TextPressure;