'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function MagneticButton({ children, className, onClick, variant = 'primary', ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const capability = useDeviceCapability();

  const handleMouse = (e) => {
    if (capability === 'low') return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-accent-cyan text-black hover:bg-accent-cyan/90 border border-transparent',
    secondary: 'bg-transparent text-text-primary border border-border-subtle hover:border-accent-cyan/50 hover:bg-glass-bg',
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative px-8 py-4 rounded-full font-medium tracking-wide overflow-hidden transition-colors duration-300 cursor-pointer select-none',
        variants[variant],
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">{children}</span>
    </motion.div>
  );
}
