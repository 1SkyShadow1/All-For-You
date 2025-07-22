import { useEffect, useRef } from 'react';

interface CircularTextProps {
  text: string;
  radius?: number;
  className?: string;
  fontSize?: number;
}

const CircularText = ({ text, radius = 100, className = '', fontSize = 16 }: CircularTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    const angleStep = 360 / chars.length;

    textRef.current.innerHTML = chars
      .map((char, i) => {
        const angle = i * angleStep;
        return `<span style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px);
          font-size: ${fontSize}px;
        ">${char}</span>`;
      })
      .join('');
  }, [text, radius, fontSize]);

  return (
    <div
      ref={textRef}
      className={`relative inline-block animate-spin ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
    />
  );
};

export default CircularText;