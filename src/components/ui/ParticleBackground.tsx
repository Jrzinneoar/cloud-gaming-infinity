
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  alphaSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: Particle[] = [];
    const particleCount = Math.min(80, window.innerWidth / 20); // Reduce particle count slightly
    
    // Generate a color in the purple/blue spectrum
    const generateColor = () => {
      const r = Math.floor(Math.random() * 100) + 80;
      const g = Math.floor(Math.random() * 50);
      const b = Math.floor(Math.random() * 155) + 100;
      return `rgba(${r}, ${g}, ${b}`;
    };
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.3, // Slower movement
        speedY: (Math.random() - 0.5) * 0.3,
        color: generateColor(),
        alpha: Math.random() * 0.4 + 0.1, // Lower opacity
        alphaSpeed: Math.random() * 0.005 + 0.002
      });
    }
    
    // Create glowing background gradients
    const createGradients = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Purple glow in the bottom left
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.8, 0,
        canvas.width * 0.2, canvas.height * 0.8, canvas.width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      gradient1.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      // Blue glow in the top right
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.2, 0,
        canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      return [gradient1, gradient2];
    };
    
    // Animation function
    const animate = () => {
      ctx.fillStyle = '#000000'; // Set black background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradients
      const gradients = createGradients(ctx, canvas);
      
      ctx.fillStyle = gradients[0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradients[1];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        // Update alpha with pulsing effect
        particle.alpha += particle.alphaSpeed;
        if (particle.alpha > 0.5 || particle.alpha < 0.1) {
          particle.alphaSpeed = -particle.alphaSpeed;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}, ${particle.alpha})`;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${particle.color}, 0.3)`;
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connecting lines between close particles
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Reduce connection distance
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] bg-black"
    />
  );
};

export default ParticleBackground;
