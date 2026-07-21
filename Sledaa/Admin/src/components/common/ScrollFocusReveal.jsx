import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';

const ScrollFocusReveal = ({ children, sx, delay = '0s' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);

  return (
    <Box 
      ref={domRef} 
      className={isVisible ? 'focus-in-animate' : 'focus-in-hidden'} 
      sx={{ ...sx, animationDelay: delay, animationFillMode: 'both' }}
    >
      {children}
    </Box>
  );
};

export default ScrollFocusReveal;
