interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
}

const GradientText = ({ 
  text, 
  className = '', 
  gradient = 'from-gold-400 via-gold-300 to-gold-500' 
}: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-gradient-x ${className}`}>
      {text}
    </span>
  );
};

export default GradientText;