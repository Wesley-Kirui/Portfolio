import React, { useEffect, useRef } from 'react';

interface CanvasBackgroundProps {
  isDarkMode: boolean;
}

export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Particles list for molecular background mesh
    const particlesCount = Math.min(60, Math.floor((width * height) / 20000));
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    // DNA Helix state
    let dnaAngle = 0;
    const dnaSpeed = 0.004;
    const dnaNodes = 32;
    const dnaWidth = Math.min(180, width * 0.25);
    const dnaSpacing = height / (dnaNodes + 4);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Color configs depending on mode
      const primaryColor = isDarkMode ? '6, 182, 212' : '11, 19, 41'; // teal vs deep blue
      const secondaryColor = isDarkMode ? '20, 184, 166' : '13, 148, 136'; // medium teal
      const dnaColor1 = isDarkMode ? 'rgba(6, 182, 212, 0.75)' : 'rgba(11, 19, 41, 0.6)';
      const dnaColor2 = isDarkMode ? 'rgba(14, 165, 233, 0.75)' : 'rgba(13, 148, 136, 0.6)';
      const bondColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';

      // 1. Draw Background Molecular Mesh
      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Influence of Mouse (attraction)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += dx * 0.01;
            p.y += dy * 0.01;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, ${isDarkMode ? 0.35 : 0.15})`;
        ctx.fill();

        // Draw lines to neighboring particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${primaryColor}, ${(1 - dist / 100) * (isDarkMode ? 0.12 : 0.05)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw line to mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(${secondaryColor}, ${(1 - dist / 150) * (isDarkMode ? 0.2 : 0.08)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // 2. Draw 3D-Rotating DNA Helix in the right side background
      dnaAngle += dnaSpeed;
      const dnaXCenter = width * 0.82; // Position on the right side of the screen

      for (let i = 0; i < dnaNodes; i++) {
        const y = dnaSpacing * 2 + i * dnaSpacing;
        // Adjust width slightly in the middle for perspective
        const currentDnaWidth = dnaWidth * (0.8 + 0.2 * Math.sin(y / height * Math.PI));
        
        // Helix A node
        const angleA = dnaAngle + (i * 0.22);
        const cosA = Math.cos(angleA);
        const sinA = Math.sin(angleA);
        const xA = dnaXCenter + cosA * currentDnaWidth;
        const zIndexA = sinA; // z-axis representation (-1 to 1)

        // Helix B node (complementary, phase shifted by PI)
        const angleB = dnaAngle + (i * 0.22) + Math.PI;
        const cosB = Math.cos(angleB);
        const sinB = Math.sin(angleB);
        const xB = dnaXCenter + cosB * currentDnaWidth;
        const zIndexB = sinB;

        // Draw ladder rungs (hydrogen base bonds)
        ctx.beginPath();
        ctx.moveTo(xA, y);
        ctx.lineTo(xB, y);
        ctx.strokeStyle = bondColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Base pairs colored indicators in the middle
        const midX = (xA + xB) / 2;
        ctx.beginPath();
        ctx.arc(midX, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
        ctx.fill();

        // Node sizes depending on depth (z-index projection)
        const radiusA = (xA > xB ? 4 : 2.5) * (1.2 + 0.3 * zIndexA);
        const radiusB = (xB > xA ? 4 : 2.5) * (1.2 + 0.3 * zIndexB);

        // Draw Node A (Strand 1)
        ctx.beginPath();
        ctx.arc(xA, y, radiusA, 0, Math.PI * 2);
        ctx.fillStyle = dnaColor1;
        ctx.shadowColor = isDarkMode ? 'rgba(6, 182, 212, 0.4)' : 'rgba(0,0,0,0)';
        ctx.shadowBlur = isDarkMode ? 6 : 0;
        ctx.fill();

        // Draw Node B (Strand 2)
        ctx.beginPath();
        ctx.arc(xB, y, radiusB, 0, Math.PI * 2);
        ctx.fillStyle = dnaColor2;
        ctx.shadowBlur = 0; // reset
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: isDarkMode ? 0.3 : 0.15 }}
    />
  );
};
