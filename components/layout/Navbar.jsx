'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';
import ThemeToggle from '../ui/ThemeToggle';
import MagneticButton from '../ui/MagneticButton';
import { NAV_LINKS } from '../../constants/nav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Simple intersection observer logic for active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-[20px] border-b border-border-subtle py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="text-2xl font-display font-bold text-accent-cyan tracking-tighter">
          jabx_fx
        </a>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-cyan ${
                activeSection === link.href.substring(1) ? 'text-accent-cyan' : 'text-text-secondary'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <MagneticButton variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Hire Me &rarr;
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            className="text-text-primary p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <RiMenu4Line className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-bg-primary flex flex-col p-6"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold text-accent-cyan tracking-tighter">
                jabx_fx
              </span>
              <button
                className="text-text-primary p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>
            
            <nav role="navigation" aria-label="Mobile navigation" className="flex flex-col gap-6 text-2xl font-display">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-primary hover:text-accent-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto pb-8">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-accent-cyan text-black rounded-full font-medium"
              >
                Hire Me &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
