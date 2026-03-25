'use client';

import { motion } from 'framer-motion';
import { fadeUp, STAGGER } from '../../lib/motion';
import { SERVICES } from '../../constants/services';
import GlassCard from '../ui/GlassCard';
import { useAnalytics } from '../../hooks/useAnalytics';
import * as Icons from 'react-icons/ri';

export default function Services() {
  const { trackEvent } = useAnalytics();

  return (
    <section id="services" className="py-24 md:py-32 relative z-10 bg-bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-4 text-accent-cyan font-mono text-sm tracking-widest uppercase"
          >
            &mdash; What I Do
          </motion.div>
          
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="text-[length:var(--text-h2)] font-display font-bold mb-6 leading-tight"
          >
            Services built for results, not portfolios.
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={2}
            className="text-text-secondary text-lg"
          >
            Every engagement is outcome-focused. Here's how I can move the needle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = Icons[service.icon];
            
            return (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={index}
                onClick={() => trackEvent('service_card_click', { service: service.title })}
                className="h-full cursor-pointer"
              >
                <GlassCard className="h-full flex flex-col group">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-black transition-colors duration-300">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    {service.tag && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-text-secondary mb-8 flex-grow">{service.description}</p>

                  <div className="pt-6 border-t border-border-subtle mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.deliverables.map((item, i) => (
                        <span key={i} className="text-xs text-text-muted flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-accent-cyan" /> {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm text-text-primary">{service.price}</span>
                      <span className="text-accent-cyan opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 text-center"
        >
          <p className="text-text-secondary mb-6">Not sure what you need? &rarr; Free 30-min audit. No pitch, no strings.</p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-accent-cyan hover:text-white transition-colors border-b border-accent-cyan/30 hover:border-white pb-1"
          >
            Book Free Call &rarr;
          </button>
        </motion.div>

      </div>
    </section>
  );
}
