
import { useEffect, useRef } from 'react';

const ParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      sectionRef.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden flex items-center">
      {/* Parallax Background */}
      <div
        ref={sectionRef}
        className="absolute inset-0 w-full h-120 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80")',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-premium-black/70" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 gold-foil animate-float">
            Crafted with Passion
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Every piece in our collection tells a story. From custom designs to artisan crafts, 
            we bring you products that reflect your unique style and values.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gold-foil mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gold-foil mb-2">500+</div>
              <div className="text-gray-300">Custom Designs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gold-foil mb-2">5★</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold-400 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ParallaxSection;
