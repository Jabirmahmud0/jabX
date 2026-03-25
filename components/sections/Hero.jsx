'use client';

import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowRight, FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MagneticButton from '../ui/MagneticButton';
import { useAnalytics } from '../../hooks/useAnalytics';

const HeroScene = dynamic(() => import('../../three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

const FEATURED_PROJECTS = [
  {
    title: 'Aura AI Platform',
    category: 'SaaS • AI Architecture',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    color: '#00F5D4',
    accent: 'rgba(0, 245, 212, 0.15)',
  },
  {
    title: 'Nexus Dashboard',
    category: 'Web App • Data Viz',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    color: '#7B61FF',
    accent: 'rgba(123, 97, 255, 0.15)',
  },
  {
    title: 'Vortex Protocol',
    category: 'Web3 • Blockchain',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    color: '#FF61D2',
    accent: 'rgba(255, 97, 210, 0.15)',
  },
];


// ─── Custom hook: mouse parallax tilt ───────────────────────────────────────
function useCardTilt() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 160, mass: 0.5 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { springX, springY, onMouseMove, onMouseLeave };
}

// ─── Slide direction tracker ─────────────────────────────────────────────────
let slideDirection = 1; // 1 = forward (right→left), -1 = backward

// ─── Card variants ────────────────────────────────────────────────────────────
const cardVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    rotateY: dir > 0 ? 15 : -15,
    skewY: dir > 0 ? 3 : -3,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    rotateY: 0,
    skewY: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      rotateY: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      skewY: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.4 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-110%' : '110%',
    rotateY: dir > 0 ? -18 : 18,
    skewY: dir > 0 ? -4 : 4,
    opacity: 0,
    scale: 0.88,
    filter: 'blur(10px)',
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      rotateY: { duration: 0.45, ease: [0.4, 0, 1, 1] },
      skewY: { duration: 0.35, ease: [0.4, 0, 1, 1] },
      opacity: { duration: 0.25 },
      filter: { duration: 0.3 },
    },
  }),
};

// ─── Peek card depths ─────────────────────────────────────────────────────────
const PEEK_CONFIGS = [
  { x: 18, y: -12, rotate: -6, scale: 0.88, opacity: 0.45, z: -1 },
  { x: 34, y: -22, rotate: -11, scale: 0.77, opacity: 0.25, z: -2 },
];

export default function Hero() {
  const { trackEvent } = useAnalytics();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [currentProject, setCurrentProject] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const { springX, springY, onMouseMove, onMouseLeave } = useCardTilt();
  const INTERVAL = 4000;

  const advance = useCallback((delta) => {
    slideDirection = delta;
    setDir(delta);
    setCurrentProject((prev) => (prev + FEATURED_PROJECTS.length + delta) % FEATURED_PROJECTS.length);
    setProgress(0);
  }, []);

  // Auto-advance with progress tracking
  useEffect(() => {
    const start = Date.now();
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        advance(1);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [currentProject, advance]);

  const title = "Engaging experiences, built with precision.";
  const words = title.split(" ");

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const project = FEATURED_PROJECTS[currentProject];
  const prev = FEATURED_PROJECTS[(currentProject - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];
  const prev2 = FEATURED_PROJECTS[(currentProject - 2 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];
  const peekProjects = [prev, prev2];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-12 overflow-hidden transition-colors duration-500"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-bg-primary -z-20 transition-colors duration-500" />
      
      <Suspense fallback={null}>
        <div className="absolute inset-0 pointer-events-none -z-10">
          <HeroScene />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--bg-primary)_100%)] opacity-30 transition-colors duration-500" />
        </div>
      </Suspense>

      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="flex flex-col items-start text-left"
        >
          {/* Eyebrow — slide in from left + fade */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-12 h-[1px] bg-accent-cyan origin-left block"
              />
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent-cyan">
                Available for new projects
              </span>
            </motion.div>
          </div>

          {/* Title — per-word clip reveal */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8 pointer-events-none text-text-primary tracking-tight">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.2em] whitespace-nowrap align-bottom">
                <motion.span
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subhead — clip reveal */}
          <div className="overflow-hidden mb-12 max-w-lg">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-text-secondary font-body leading-relaxed opacity-80"
            >
              I'm Jabir — a creative developer who builds performant, secure, 
              and visually stunning digital products. From AI-powered SaaS 
              to interactive Web3 experiences.
            </motion.p>
          </div>

          {/* CTAs — clip reveal */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.85, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <MagneticButton 
                onClick={() => {
                  trackEvent('cta_click', { type: 'primary', label: 'Start Project' });
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-pill-button hero-pill-button--primary group"
              >
                See My Work
                <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <button 
                onClick={() => {
                  trackEvent('cta_click', { type: 'secondary', label: 'Contact' });
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-3 text-text-primary font-medium hover:text-accent-cyan transition-colors"
              >
                Let's talk
                <span className="w-8 h-[1px] bg-text-muted group-hover:w-12 group-hover:bg-accent-cyan transition-all" />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ───────────── Right Column: Kinetic 3D Card ───────────── */}
        <div className="relative h-[540px] md:h-[620px] w-full flex items-center justify-center lg:justify-end select-none">
          
          {/* Dynamic accent glow that morphs with project color */}
          <motion.div
            animate={{ background: `radial-gradient(ellipse at 50% 60%, ${project.accent} 0%, transparent 70%)` }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            style={{ filter: 'blur(40px)', transform: 'scale(1.3)' }}
          />

          {/* Card Stage */}
          <div className="relative w-full max-w-[400px]" style={{ perspective: '1200px' }}>
            
            {/* ── Peek cards (stacked behind, no animation logic needed) ── */}
            {peekProjects.map((peekProject, i) => (
              <div
                key={`peek-${i}-${peekProject.title}`}
                className="absolute inset-0 rounded-[28px] overflow-hidden border border-border-subtle"
                style={{
                  transform: `translateX(${PEEK_CONFIGS[i].x}px) translateY(${PEEK_CONFIGS[i].y}px) rotate(${PEEK_CONFIGS[i].rotate}deg) scale(${PEEK_CONFIGS[i].scale})`,
                  opacity: PEEK_CONFIGS[i].opacity,
                  zIndex: PEEK_CONFIGS[i].z,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  aspectRatio: '4 / 5.5',
                }}
              >
                <img
                  src={peekProject.image}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(60%)' }}
                />
                <div className="absolute inset-0 bg-bg-primary/50" />
              </div>
            ))}

            {/* ── Active card wrapper: perspective tilt on hover ── */}
            <motion.div
              style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: 'preserve-3d',
                aspectRatio: '4 / 5.5',
                position: 'relative',
                zIndex: 10,
              }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <AnimatePresence custom={dir} mode="popLayout" initial={false}>
                <motion.div
                  key={project.title}
                  custom={dir}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 rounded-[28px] overflow-hidden border border-border-subtle bg-bg-card shadow-2xl cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => trackEvent('project_card_click', { project: project.title })}
                  whileHover={{ boxShadow: `0 30px 60px -10px rgba(0,0,0,0.5), 0 0 40px -5px ${project.color}33` }}
                >
                  {/* Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                      key={project.image}
                      src={project.image}
                      alt={project.title}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                      style={{ willChange: 'transform' }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
                    {/* Subtle color tint at top */}
                    <motion.div
                      animate={{ backgroundColor: project.accent }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 mix-blend-color opacity-30"
                    />
                  </div>

                  {/* Shimmer line at top */}
                  <motion.div
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                  />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col gap-3" style={{ translateZ: 40 }}>
                    {/* Category pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: project.color, boxShadow: `0 0 8px ${project.color}` }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: project.color }}>
                        {project.category}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 }}
                      className="text-[1.85rem] font-display font-bold text-text-primary tracking-tight leading-none"
                    >
                      {project.title}
                    </motion.h3>

                    {/* Actions row */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between mt-1"
                    >
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/15 transition-all backdrop-blur-sm">
                          <FiGithub className="w-4 h-4 text-text-primary" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/15 transition-all backdrop-blur-sm">
                          <FiExternalLink className="w-4 h-4 text-text-primary" />
                        </button>
                      </div>
                      {/* Index display */}
                      <span className="text-xs font-mono text-text-muted">
                        {String(currentProject + 1).padStart(2, '0')} / {String(FEATURED_PROJECTS.length).padStart(2, '0')}
                      </span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="mt-3 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          width: `${progress * 100}%`,
                          background: `linear-gradient(90deg, ${project.color}99, ${project.color})`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ── Navigation Arrows ── */}
            <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-between px-2">
              <button
                onClick={() => advance(-1)}
                className="group flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-border-subtle group-hover:border-accent-cyan group-hover:text-accent-cyan transition-all">
                  <FiChevronLeft className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase tracking-widest">Prev</span>
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {FEATURED_PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDir(i > currentProject ? 1 : -1); setCurrentProject(i); setProgress(0); }}
                    className="relative w-6 h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{ backgroundColor: i === currentProject ? project.color + '55' : 'rgba(255,255,255,0.15)' }}
                  >
                    {i === currentProject && (
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: project.color, width: `${progress * 100}%` }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => advance(1)}
                className="group flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <span className="text-xs uppercase tracking-widest">Next</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-border-subtle group-hover:border-accent-cyan group-hover:text-accent-cyan transition-all">
                  <FiChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
