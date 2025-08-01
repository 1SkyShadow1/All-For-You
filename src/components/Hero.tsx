
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SplitText from './animations/SplitText';
import BlurText from './animations/BlurText';
import ShinyText from './animations/ShinyText';
import GradientText from './animations/GradientText';
import CircularText from './animations/CircularText';
import TextPressure from './animations/TextPressure';
import FuzzyText from './animations/FuzzyText';
import DecryptedText from './animations/DecryptedText';
import MagnetButton from './animations/MagnetButton';
import Aurora from './backgrounds/Aurora';
import DotGrid from './backgrounds/DotGrid';
import Beams from './backgrounds/Beams';
import RippleGrid from './backgrounds/RippleGrid';

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
      <Aurora />
      <DotGrid className="opacity-20" />
      <Beams />
      <RippleGrid />
      
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
          {/* Floating Circular Text */}
          <div className="absolute -top-20 -right-20 opacity-30">
            <CircularText 
              text="PREMIUM • QUALITY • LUXURY • STYLE • " 
              radius={80}
              className="text-gold-400"
            />
          </div>
          
          <div className="animate-fade-in-up">
            <h2 className="text-gold-400 text-lg md:text-xl font-medium mb-4 animate-delay-1">
              <FuzzyText text={slides[currentSlide].subtitle} />
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-delay-2">
              <TextPressure text={slides[currentSlide].title} className="text-white" />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-delay-3">
              <DecryptedText text={slides[currentSlide].description} />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-delay-4">
              <MagnetButton className="btn-gold">
                <a href="#shop">
                  <ShinyText text="Explore Collection" />
                </a>
              </MagnetButton>
              <MagnetButton className="border-2 border-gold-400 text-gold-400 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 hover:text-premium-black transition-all duration-300 text-center">
                <Link 
                to="/custom-design"
              >
                  <GradientText text="Custom Orders" />
                </Link>
              </MagnetButton>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`relative overflow-hidden rounded-full transition-all duration-500 hover:scale-110 ${
              index === currentSlide ? 'bg-gold-400 w-12 h-3' : 'bg-gold-400/30 w-3 h-3'
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gold-gradient animate-pulse" />
            )}
          </button>
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
