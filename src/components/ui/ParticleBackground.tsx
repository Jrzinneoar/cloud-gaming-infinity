
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
    
    // Set canvas to full window size and ensure it covers the entire viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    };
    
    // Initial resize
    resizeCanvas();
    
    // Handle resize and scroll events to ensure background covers entire page
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', () => {
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
      resizeCanvas();
    });
    
    const particles: Particle[] = [];
    // Reduced particle count for a cleaner look
    const particleCount = Math.min(40, window.innerWidth / 30);
    
    // Generate purple and dark blue colors with very low opacity
    const generateColor = () => {
      const colors = [
        // Various shades of purple
        'rgba(139, 92, 246',
        'rgba(124, 58, 237',
        'rgba(167, 139, 250',
        // Dark blues for contrast
        'rgba(30, 64, 175',
        'rgba(59, 130, 246',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Initialize particles with very slow movement - similar to apexgaming.cloud
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Smaller particle size for subtlety
        speedX: (Math.random() - 0.5) * 0.1, // Very slow horizontal movement
        speedY: (Math.random() - 0.5) * 0.1, // Very slow vertical movement
        color: generateColor(),
        alpha: Math.random() * 0.15 + 0.05, // Very low alpha for subtlety
        alphaSpeed: Math.random() * 0.002 + 0.0005 // Very slow pulsing
      });
    }
    
    // Very subtle background gradients inspired by apexgaming.cloud
    const createGradients = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Main top-right purple glow
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      gradient1.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      // Bottom left secondary glow
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.7, 0,
        canvas.width * 0.2, canvas.height * 0.7, canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      return [gradient1, gradient2];
    };
    
    // Very subtle grid pattern like apexgaming.cloud
    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const gridSize = 80; // Larger grid cells for minimalism
      const gridOpacity = 0.02; // Very low opacity for subtlety
      
      ctx.strokeStyle = `rgba(139, 92, 246, ${gridOpacity})`;
      ctx.lineWidth = 0.2; // Very thin lines
      
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
    
    // Animation function with very subtle movements
    const animate = () => {
      ctx.fillStyle = '#050510'; // Very dark blue-black background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply subtle gradients
      const gradients = createGradients(ctx, canvas);
      
      ctx.fillStyle = gradients[0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradients[1];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw very subtle grid
      drawGrid(ctx, canvas);
      
      // Draw and update particles with minimal movement
      particles.forEach(particle => {
        // Update alpha with very slow pulsing
        particle.alpha += particle.alphaSpeed;
        if (particle.alpha > 0.2 || particle.alpha < 0.05) {
          particle.alphaSpeed = -particle.alphaSpeed;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}, ${particle.alpha})`;
        ctx.fill();
        
        // Very subtle glow (almost imperceptible)
        ctx.shadowBlur = 5;
        ctx.shadowColor = `${particle.color}, 0.1)`;
        
        // Update position very slowly
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connecting lines between close particles with extremely reduced opacity
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.02)';
      ctx.lineWidth = 0.1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) { // Only connect particles that are relatively close
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Fade the line based on distance for an even more subtle effect
            const opacity = 0.02 * (1 - distance / 100);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            
            ctx.stroke();
          }
        }
      }
      
      // Add a few random floating dots for the apexgaming.cloud effect
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 0.5 + 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, 0.1)`;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1]"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        minHeight: '100vh'
      }}
    />
  );
};

export default ParticleBackground;
