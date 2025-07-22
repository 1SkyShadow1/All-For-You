import { useEffect, useRef } from 'react';

const SplashCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splashes = useRef<Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }>;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleClick = (e: MouseEvent) => {
      const particles = Array.from({ length: 12 }, () => ({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1,
      }));

      splashes.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 0,
        opacity: 1,
        particles,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      splashes.current = splashes.current.filter(splash => {
        splash.size += 2;
        splash.opacity -= 0.02;

        // Draw main splash
        ctx.globalAlpha = splash.opacity;
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(splash.x, splash.y, splash.size, 0, Math.PI * 2);
        ctx.fill();

        // Update and draw particles
        splash.particles = splash.particles.filter(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.1; // gravity
          particle.life -= 0.02;

          if (particle.life > 0) {
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = '#f4d03f';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fill();
            return true;
          }
          return false;
        });

        return splash.opacity > 0;
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener('click', handleClick);
    animate();

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SplashCursor;