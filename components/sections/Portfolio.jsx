'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '../../lib/motion';
import { PROJECTS } from '../../constants/portfolio';
import { useAnalytics } from '../../hooks/useAnalytics';
import Image from 'next/image';

const categories = ['All', 'Design', 'Development', 'AI Tools'];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');
  const { trackEvent } = useAnalytics();

  const filteredProjects = PROJECTS.filter(
    (p) => activeTab === 'All' || p.category === activeTab
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 relative z-10 bg-bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-4 text-accent-cyan font-mono text-sm tracking-widest uppercase"
            >
              &mdash; Selected Work
            </motion.div>
            
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={1}
              className="text-[length:var(--text-h2)] font-display font-bold leading-tight"
            >
              Projects that moved the needle.
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="flex flex-wrap gap-2"
            role="tablist"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-accent-cyan text-black'
                    : 'bg-glass-bg text-text-secondary hover:text-text-primary border border-border-subtle hover:border-accent-cyan/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => trackEvent('portfolio_click', { project: project.title, category: project.category })}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer perspective-[1200px] ${
                  project.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''
                } ${project.size === 'tall' ? 'md:row-span-2' : ''}`}
              >
                <motion.div
                  whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full h-full aspect-[4/3] md:aspect-auto md:h-full min-h-[300px] relative"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md border border-white/10 text-white">
                        {project.category}
                      </span>
                      {project.metrics && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${
                          project.metrics.highlight 
                            ? 'bg-accent-cyan/20 border-accent-cyan/30 text-accent-cyan' 
                            : 'bg-white/10 border-white/10 text-white/80'
                        }`}>
                          {project.metrics.label}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs text-white/60">
                          {tech}{i < project.techStack.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-accent-cyan font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                      View Project &rarr;
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
