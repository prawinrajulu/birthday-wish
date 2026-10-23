import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  color: string;
  type: 'star' | 'petal' | 'bokeh';
  rotation: number;
  rotationSpeed: number;
}

export const SceneBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 185, 213, ', // blush pink
      'rgba(244, 127, 175, ', // rose pink
      'rgba(201, 184, 255, ', // lavender
      'rgba(244, 212, 154, ', // champagne gold
      'rgba(255, 247, 248, '  // warm white
    ];

    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'star' | 'petal' | 'bokeh' =
        typeRand < 0.65 ? 'star' : typeRand < 0.85 ? 'petal' : 'bokeh';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'bokeh' ? Math.random() * 26 + 10 : Math.random() * 2.8 + 1.0,
        speedX: (Math.random() - 0.5) * 0.35 + (type === 'petal' ? 0.25 : 0),
        speedY: type === 'petal' ? Math.random() * 0.6 + 0.35 : (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Deep ocean blue to midnight navy radial gradient
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        80,
        width * 0.5,
        height * 0.55,
        Math.max(width, height) * 0.85
      );
      grad.addColorStop(0, 'rgba(18, 40, 71, 0.55)');
      grad.addColorStop(0.55, 'rgba(8, 20, 38, 0.9)');
      grad.addColorStop(1, '#081426');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Soft blush-rose atmospheric glow
      const pinkNebula = ctx.createRadialGradient(
        width * 0.25,
        height * 0.25,
        20,
        width * 0.28,
        height * 0.3,
        width * 0.45
      );
      pinkNebula.addColorStop(0, 'rgba(244, 127, 175, 0.09)');
      pinkNebula.addColorStop(1, 'rgba(8, 20, 38, 0)');
      ctx.fillStyle = pinkNebula;
      ctx.fillRect(0, 0, width, height);

      // Soft champagne-gold atmospheric glow
      const goldNebula = ctx.createRadialGradient(
        width * 0.78,
        height * 0.65,
        20,
        width * 0.75,
        height * 0.62,
        width * 0.4
      );
      goldNebula.addColorStop(0, 'rgba(244, 212, 154, 0.07)');
      goldNebula.addColorStop(1, 'rgba(8, 20, 38, 0)');
      ctx.fillStyle = goldNebula;
      ctx.fillRect(0, 0, width, height);

      // Render particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        const currentOpacity =
          p.opacity * (0.6 + 0.4 * Math.sin(time + p.x * 0.01 + p.y * 0.01));

        if (p.type === 'star') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentOpacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FFD98E';
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.type === 'petal') {
          // Curved rose petal drawing
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2.2, p.size * 1.2, Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 91, 154, ${currentOpacity * 0.75})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(255, 182, 213, 0.5)';
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'bokeh') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentOpacity * 0.25})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.95 }}
    />
  );
};
