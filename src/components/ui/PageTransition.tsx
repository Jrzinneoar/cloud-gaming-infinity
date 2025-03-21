
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

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      document.body.classList.add('transition-active');
    } else {
      document.body.classList.remove('transition-active');
    }
  }, [transitionStage]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }
  };

  // Use faster, more subtle transitions
  const duration = isMobile ? '0.12s' : '0.2s';

  return (
    <div
      className={`${
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
