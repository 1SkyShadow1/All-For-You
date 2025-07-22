import { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const DecryptedText = ({ text, className = '', speed = 50 }: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  const decrypt = () => {
    setIsDecrypting(true);
    let iterations = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setIsDecrypting(false);
      }

      iterations += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
  }, [text]);

  return (
    <span
      className={`font-mono cursor-pointer ${className}`}
      onMouseEnter={decrypt}
      style={{
        color: isDecrypting ? '#d4af37' : '#666',
        transition: 'color 0.3s ease',
      }}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;