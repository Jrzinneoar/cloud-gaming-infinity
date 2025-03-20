
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const hasMouseMoved = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.08), 150);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const purpleShade = Math.floor(Math.random() * 50) + 205; // More vibrant purple shades
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgb(${purpleShade / 2.5}, ${purpleShade / 8}, ${purpleShade})`,
          opacity: Math.random() * 0.5 + 0.2,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
      hasMouseMoved.current = true;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        // Update pulse
        particle.pulse += particle.pulseSpeed;
        if (particle.pulse > 1 || particle.pulse < 0) {
          particle.pulseSpeed = -particle.pulseSpeed;
        }
        
        // Pulse effect on size and opacity
        const pulseFactor = Math.abs(Math.sin(particle.pulse));
        const currentSize = particle.size * (1 + pulseFactor * 0.2);
        const currentOpacity = particle.opacity * (0.8 + pulseFactor * 0.2);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        
        // Mouse interaction effect
        if (hasMouseMoved.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.03;
            particle.x -= dx * force;
            particle.y -= dy * force;
          }
        }
        
        // Move the particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around the edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connections between close particles
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.globalAlpha = 0.08 * (1 - distance / 120);
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    createParticles();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
    />
  );
};

export default ParticleBackground;
