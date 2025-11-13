// src/utils/responsiveUtils.js
import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < BREAKPOINTS.tablet,
    isTablet: windowSize.width >= BREAKPOINTS.tablet && windowSize.width < BREAKPOINTS.desktop,
    isDesktop: windowSize.width >= BREAKPOINTS.desktop,
    isSmallMobile: windowSize.width < BREAKPOINTS.mobile
  };
}

export const responsiveStyles = {
  // Container padding
  containerPadding: (isMobile) => ({
    padding: isMobile ? '1rem' : 'clamp(1.5rem, 3vw, 2.5rem)'
  }),

  // Modal styles
  modalWidth: (isMobile) => ({
    maxWidth: isMobile ? '95vw' : '900px',
    width: '100%',
    padding: isMobile ? '1.5rem' : '2.5rem'
  }),

  // Card padding
  cardPadding: (isMobile) => ({
    padding: isMobile ? '1.25rem' : 'clamp(1.5rem, 2.5vw, 2rem)'
  }),

  // Font sizes
  headingLarge: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    lineHeight: '1.2'
  },

  headingMedium: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    lineHeight: '1.3'
  },

  headingSmall: {
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    lineHeight: '1.4'
  },

  bodyText: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    lineHeight: '1.6'
  },

  // Grid layouts
  autoGrid: (minWidth = '300px') => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`,
    gap: 'clamp(1rem, 2vw, 2rem)'
  }),

  // Flex utilities
  stack: (gap = '1rem') => ({
    display: 'flex',
    flexDirection: 'column',
    gap
  }),

  // Touch target
  touchTarget: {
    minHeight: '44px',
    minWidth: '44px',
    padding: '0.75rem'
  }
};