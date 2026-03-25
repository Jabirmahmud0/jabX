'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export default function LiquidCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const capability = useDeviceCapability();

  useEffect(() => {
    setIsMounted(true);
    // Only apply the 'no cursor' class on desktop (devices with a fine pointer)
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (capability !== 'low' && isDesktop) {
      document.documentElement.classList.add('has-custom-cursor');
      return () => document.documentElement.classList.remove('has-custom-cursor');
    }
  }, [capability]);

  useEffect(() => {
    if (!isMounted) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMounted]);

  // We render the custom cursor if mounted, but the native cursor 
  // hiding (CSS class) only applies if capability is not 'low'.
  if (!isMounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-accent-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(0, 245, 212, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}
