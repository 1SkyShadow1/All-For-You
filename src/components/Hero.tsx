
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Lifestyle",
      subtitle: "Curated Collection",
      description: "Discover our exclusive range of custom designs and artisanal products",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
    },
    {
      title: "Custom Creations",
      subtitle: "Made Just for You",
      description: "Personalize shirts, mugs, caps and more with your unique style",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80"
    },
    {
      title: "Artisan Crafted",
      subtitle: "Premium Quality",
      description: "Hand-selected cutting boards and original artworks by local artisans",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
    }
  ];

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-premium-black via-premium-black/70 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up">
            <h2 className="text-gold-400 text-lg md:text-xl font-medium mb-4 animate-delay-1">
              {slides[currentSlide].subtitle}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight animate-delay-2">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-delay-3">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-delay-4">
              <a href="#shop" className="btn-gold">
                Explore Collection
              </a>
              <Link 
                to="/custom-design"
                className="border-2 border-gold-400 text-gold-400 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 hover:text-premium-black transition-all duration-300 text-center"
              >
                Custom Orders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-gold-400 w-8' : 'bg-gold-400/30'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Auto slide change */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(() => {
              const indicators = document.querySelectorAll('[data-slide]');
              let current = 0;
              setInterval(() => {
                current = (current + 1) % 3;
                if (indicators[current]) indicators[current].click();
              }, 5000);
            }, 1000);
          `,
        }}
      />
    </section>
  );
};

export default Hero;
