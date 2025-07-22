
import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import ParallaxSection from '../components/ParallaxSection';
import Footer from '../components/Footer';
import BlobCursor from '../components/animations/BlobCursor';
import SplashCursor from '../components/animations/SplashCursor';
import TargetCursor from '../components/animations/TargetCursor';
import ClickSpark from '../components/animations/ClickSpark';
import Dock from '../components/ui/Dock';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Preload critical images
  useEffect(() => {
    const imagesToPreload = [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80'
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-premium-black">
      <BlobCursor />
      <SplashCursor />
      <ClickSpark />
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <ParallaxSection />
      <Dock />
      <Footer />
    </div>
  );
};

export default Index;
