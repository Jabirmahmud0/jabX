import { motion } from 'framer-motion';
import { cardHover } from '../../lib/motion';
import { cn } from './MagneticButton';

export default function GlassCard({ children, className, ...props }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(
        'relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-accent-cyan/5',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
