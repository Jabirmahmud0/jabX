'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('jabx_visited');
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('jabx_visited', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
        >
          <svg width="120" height="120" viewBox="0 0 100 100" className="mb-8">
            <motion.path
              d="M 20 50 L 50 20 L 80 50 L 50 80 Z"
              fill="transparent"
              strokeWidth="2"
              stroke="var(--accent-cyan)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 35 50 L 50 35 L 65 50 L 50 65 Z"
              fill="transparent"
              strokeWidth="2"
              stroke="var(--accent-violet)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet tracking-tighter"
          >
            jabx_fx
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
