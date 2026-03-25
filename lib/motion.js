export const EASING = {
  smooth:  [0.43, 0.13, 0.23, 0.96],
  spring:  { type: 'spring', stiffness: 300, damping: 30 },
  snappy:  [0.77, 0, 0.175, 1],
  gentle:  [0.25, 0.46, 0.45, 0.94],
  bounce:  { type: 'spring', stiffness: 400, damping: 20, mass: 0.8 },
};

export const DURATION = {
  instant:  0.15,
  fast:     0.3,
  normal:   0.5,
  slow:     0.8,
  cinematic:1.2,
};

export const STAGGER = {
  tight:  0.05,
  normal: 0.1,
  loose:  0.18,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * STAGGER.normal, duration: DURATION.slow, ease: EASING.smooth },
  }),
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASING.gentle } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.normal, ease: EASING.snappy } },
};

export const letterReveal = {
  hidden:  { opacity: 0, y: 60, rotateX: -20 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.04, duration: DURATION.slow, ease: EASING.smooth },
  }),
};

export const cardHover = {
  rest:  { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -6, transition: EASING.spring },
};

export const lineReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: (i = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { delay: i * 0.15, duration: 0.9, ease: EASING.snappy },
  }),
};

// Hero redesign variants
export const wordReveal = {
  hidden: { opacity: 0, y: 80, rotateX: -40, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { delay: 0.3 + i * 0.12, duration: 0.9, ease: EASING.smooth },
  }),
};

export const floatIn = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 1.0 + i * 0.15, duration: 0.8, ease: EASING.smooth },
  }),
};

export const slideInRight = {
  hidden: { opacity: 0, x: 100, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1, x: 0, scale: 1,
    transition: { delay: 0.8 + i * 0.12, duration: 0.9, ease: EASING.smooth },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};
