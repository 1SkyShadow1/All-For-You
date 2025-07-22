
import { useState, useEffect } from 'react';
import GradientText from './animations/GradientText';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [showLogo, setShowLogo] = useState(false);
  const [logoEffect, setLogoEffect] = useState(false);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    // Show logo after particles animation
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1500);

    // Apply gold foil effect
    const effectTimer = setTimeout(() => {
      setLogoEffect(true);
    }, 2000);

    // Complete loading
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(effectTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-premium-black flex items-center justify-center overflow-hidden">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Converging Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Logo */}
          <div
            className={`text-6xl md:text-8xl font-bold transition-all duration-1000 ${
              showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            {logoEffect ? (
              <GradientText text="All for you" className="text-shadow-gold" />
            ) : (
              <span className="text-gold-400">All for you</span>
            )}
          </div>
          
          {/* Subtitle */}
          <div
            className={`text-center mt-4 text-gold-300 text-lg md:text-xl transition-all duration-1000 delay-300 ${
              showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Premium Lifestyle Collection
          </div>

          {/* Loading dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 bg-gold-400 rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gold particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full opacity-0 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
