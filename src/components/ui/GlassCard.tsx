
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
        return 'bg-black/20 backdrop-blur-sm border border-white/5';
      case 'heavy':
        return 'bg-black/60 backdrop-blur-xl border border-white/15';
      case 'medium':
      default:
        return 'bg-black/40 backdrop-blur-lg border border-white/10';
    }
  };

  return (
    <div 
      className={`glass-card ${getIntensityClass()} p-6 rounded-xl shadow-md ${
        hoverEffect 
          ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-black/50' 
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
