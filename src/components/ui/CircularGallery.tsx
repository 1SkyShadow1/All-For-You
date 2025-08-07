import { useState } from 'react';

interface CircularGalleryProps {
  images: string[];
  radius?: number;
  className?: string;
}

const CircularGallery = ({ images, radius = 200, className = '' }: CircularGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={`relative ${className}`} style={{ width: radius * 2, height: radius * 2 }}>
      <div className="absolute inset-0 animate-spin-slow">
        {images.map((image, index) => {
          const angle = (360 / images.length) * index;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={index}
              className="absolute w-16 h-16 cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x - 32}px, ${y - 32}px)`,
              }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Gallery ${index}`}
                className={`w-full h-full object-cover rounded-lg border-2 transition-all duration-300 ${
                  selectedIndex === index ? 'border-gold-400 shadow-gold' : 'border-transparent'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Center image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={images[selectedIndex]}
          alt="Selected"
          className="w-24 h-24 object-cover rounded-full border-4 border-gold-400 shadow-gold"
        />
      </div>
    </div>
  );
};

export default CircularGallery;