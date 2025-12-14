'use client';

import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{ x: number; y: number; size: number; opacity: number; pulseSpeed: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 3000);
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random(),
          pulseSpeed: 0.01 + Math.random() * 0.03
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw constellations line (optional simple connectivity)
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      // Only connect close stars for performance
      
      stars.forEach((star) => {
        // Pulse
        star.opacity += star.pulseSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.pulseSpeed *= -1;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Behind content
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at bottom, #1e1b4b 0%, #020617 100%)'
      }}
    />
  );
}
