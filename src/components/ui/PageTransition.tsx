
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }
  };

  // Use very subtle transitions similar to apexgaming.cloud
  const duration = isMobile ? '0.15s' : '0.25s';

  return (
    <div
      className={`min-h-screen ${
        transitionStage === 'fadeIn' 
          ? `animate-[fade-in_${duration}_ease-out] motion-reduce:animate-none` 
          : `animate-[fade-out_${duration}_ease-out] motion-reduce:animate-none`
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default PageTransition;
