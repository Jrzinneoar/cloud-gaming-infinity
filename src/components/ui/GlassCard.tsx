
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`glass-card p-6 ${
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
