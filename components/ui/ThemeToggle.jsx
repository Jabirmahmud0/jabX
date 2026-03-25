import { useTheme } from '../../context/ThemeContext';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useAnalytics } from '../../hooks/useAnalytics';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { trackEvent } = useAnalytics();

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    trackEvent('theme_toggle', { theme: newTheme });
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-glass-bg backdrop-blur-md transition-colors hover:border-accent-cyan/50 hover:bg-glass-bg/80"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <RiMoonLine className="h-5 w-5 text-text-primary" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <RiSunLine className="h-5 w-5 text-text-primary" />
      </motion.div>
    </button>
  );
}
