import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  autoStart?: boolean;
  delay?: number;
}

const DecryptedText = ({ 
  text, 
  className = '', 
  speed = 30, 
  autoStart = true, 
  delay = 0 
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  const generateRandomString = (length: number) => {
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const decrypt = () => {
    if (isDecrypting || isComplete) return;
    
    setIsDecrypting(true);
    let iterations = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            // If this character position has been revealed, show the actual character
            if (index < iterations) {
              return text[index];
            }
            // Otherwise show a random character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      // Smoothly increment iterations to reveal one character at a time
      iterations += 0.5;

      // Check if we've revealed all characters
      if (iterations >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplayText(text); // Ensure final text is exactly correct
        setIsDecrypting(false);
        setIsComplete(true);
      }
    }, speed);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsDecrypting(false);
    setIsComplete(false);
    setDisplayText(generateRandomString(text.length));
  };

  useEffect(() => {
    // Initialize with random characters
    setDisplayText(generateRandomString(text.length));
    
    if (autoStart) {
      // Auto-start decryption after delay
      const timer = setTimeout(() => {
        decrypt();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [text, autoStart, delay]);

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      className={`font-mono cursor-pointer ${className}`}
      onMouseEnter={!autoStart ? decrypt : undefined}
      onClick={reset}
      style={{
        color: isComplete ? '#d4af37' : isDecrypting ? '#fbbf24' : '#666',
        transition: 'color 0.3s ease',
      }}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;