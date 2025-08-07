
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
      '/products/hero-1.jpg',
      '/products/hero-2.jpg',
      '/products/hero-3.jpg'
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
