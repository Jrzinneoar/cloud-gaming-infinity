
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  intensity = 'medium'
}) => {
  const getIntensityClass = () => {
    switch (intensity) {
      case 'light':
        return 'bg-black/10 backdrop-blur-sm border border-white/5';
      case 'heavy':
        return 'bg-black/40 backdrop-blur-lg border border-rive-purple/20';
      case 'medium':
      default:
        return 'bg-black/20 backdrop-blur-md border border-rive-purple/10';
    }
  };

  return (
    <div 
      className={`rounded-xl shadow-sm ${getIntensityClass()} ${
        hoverEffect 
          ? 'transition-all duration-300 hover:border-rive-purple/30 hover:shadow-rive-purple/10' 
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
