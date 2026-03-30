'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUp, lineReveal } from '../../lib/motion';

const stats = [
  { value: '30+', label: 'Projects Shipped' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '2×', label: 'Avg. Conversion Boost' },
  { value: '5★', label: 'on Fiverr' },
];

const skills = [
  'React', 'Next.js', 'Three.js', 'Figma', 'Framer', 'Python',
  'TailwindCSS', 'Node.js', 'AI/ML Tools', 'UI Systems',
  'Prompt Engineering', 'REST APIs', 'R3F'
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative z-10 bg-bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-4 text-accent-cyan font-mono text-sm tracking-widest uppercase"
            >
              &mdash; About Me
            </motion.div>
            
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineReveal}
              className="text-[length:var(--text-h2)] font-display font-bold mb-8 leading-tight"
            >
              Digital products engineered for measurable business growth.
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={1}
              className="space-y-6 text-text-secondary text-lg"
            >
              <p>
                We help ambitious founders, tech startups, and marketing teams who need their websites to perform aggressively better online. We specialize in custom web development that directly serves your business goals.
              </p>
              <p>
                As a performance-focused Web Development Agency, we deliver exceptional UI/UX, flawless React architectures, and advanced technical SEO out-of-the-box. We don't just write code; we construct digital assets.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={2}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border-subtle pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">{stat.value}</span>
                  <span className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={3}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden relative group perspective-[1000px]">
              <motion.div
                whileHover={{ rotateX: 8, rotateY: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full h-full relative"
              >
                <div className="w-full h-full md:grayscale md:hover:grayscale-0 transition-all duration-500 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/jabx.png"
                    alt="Jabir Mahmud — UI/UX designer and creative developer"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  {/* Fallback pattern if image is missing */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-accent-violet/20 flex flex-col items-center justify-center -z-10 bg-bg-card border border-border-subtle">
                    <span className="text-accent-cyan/50 font-display font-bold text-6xl">J/X</span>
                  </div>
                </div>
                <div className="absolute inset-0 border border-glass-border rounded-2xl pointer-events-none" />
              </motion.div>
              
              {/* Decorative brackets */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-accent-cyan pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent-cyan pointer-events-none" />
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full border border-border-subtle bg-glass-bg text-sm text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
