interface DotGridProps {
  className?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

const DotGrid = ({ 
  className = '', 
  dotSize = 1, 
  spacing = 20, 
  opacity = 0.3 
}: DotGridProps) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, ${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
};

export default DotGrid;