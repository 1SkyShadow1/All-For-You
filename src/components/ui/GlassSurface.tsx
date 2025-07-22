interface GlassSurfaceProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

const GlassSurface = ({ 
  children, 
  className = '', 
  blur = 'md',
  opacity = 0.1 
}: GlassSurfaceProps) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <div 
      className={`${blurClasses[blur]} border border-white/20 ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
      }}
    >
      {children}
    </div>
  );
};

export default GlassSurface;