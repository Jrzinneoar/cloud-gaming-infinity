
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
    const particleCount = Math.min(60, window.innerWidth / 20); // Reduced particle count
    
    // Generate more Azure-themed colors with reduced opacity
    const generateColor = () => {
      const colors = [
        // Azure blues
        'rgba(0, 127, 255',
        'rgba(47, 141, 255',
        'rgba(72, 153, 255',
        // RIVE purples
        'rgba(139, 92, 246',
        'rgba(124, 58, 237',
        'rgba(167, 139, 250',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Initialize particles with slower movement
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // Smaller particle size
        speedX: (Math.random() - 0.5) * 0.2, // Slower movement
        speedY: (Math.random() - 0.5) * 0.2,
        color: generateColor(),
        alpha: Math.random() * 0.3 + 0.1, // Reduced alpha
        alphaSpeed: Math.random() * 0.003 + 0.001 // Slower pulsing
      });
    }
    
    // Create more subtle background gradients
    const createGradients = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Azure glow in the bottom right
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.8, 0,
        canvas.width * 0.8, canvas.height * 0.8, canvas.width * 0.6
      );
      gradient1.addColorStop(0, 'rgba(0, 127, 255, 0.08)'); // Reduced opacity
      gradient1.addColorStop(1, 'rgba(0, 127, 255, 0)');
      
      // Purple glow in the top left
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.2, 0,
        canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.6
      );
      gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.06)'); // Reduced opacity
      gradient2.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      // Add a third central gradient for more depth
      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.3
      );
      gradient3.addColorStop(0, 'rgba(72, 153, 255, 0.03)'); // Reduced opacity
      gradient3.addColorStop(1, 'rgba(72, 153, 255, 0)');
      
      return [gradient1, gradient2, gradient3];
    };
    
    // Digital grid pattern with reduced opacity
    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const gridSize = 60; // Larger grid cells
      const gridOpacity = 0.03; // Reduced opacity
      
      ctx.strokeStyle = `rgba(100, 180, 255, ${gridOpacity})`;
      ctx.lineWidth = 0.3; // Thinner lines
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    // Animation function
    const animate = () => {
      ctx.fillStyle = '#050510'; // Slightly blue-tinted dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradients
      const gradients = createGradients(ctx, canvas);
      
      ctx.fillStyle = gradients[0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradients[1];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradients[2];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw digital grid
      drawGrid(ctx, canvas);
      
      // Draw and update particles
      particles.forEach(particle => {
        // Update alpha with pulsing effect
        particle.alpha += particle.alphaSpeed;
        if (particle.alpha > 0.4 || particle.alpha < 0.1) {
          particle.alphaSpeed = -particle.alphaSpeed;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}, ${particle.alpha})`;
        ctx.fill();
        
        // Add subtle glow effect
        ctx.shadowBlur = 8; // Reduced glow
        ctx.shadowColor = `${particle.color}, 0.3)`; // Reduced glow opacity
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connecting lines between close particles with reduced opacity
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.05)';
      ctx.lineWidth = 0.2;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Reduced connection distance
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Fade the line based on distance
            const opacity = 0.05 * (1 - distance / 80);
            ctx.strokeStyle = `rgba(100, 180, 255, ${opacity})`;
            
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
