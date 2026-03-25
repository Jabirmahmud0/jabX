import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';
import GlassCard from '../ui/GlassCard';

const testimonials = [
  {
    id: 1,
    quote: "Jabir completely transformed our frontend. The new design system he built increased our conversion rate by 40% in the first month.",
    author: "Sarah Jenkins",
    role: "Product Lead, TechFlow",
  },
  {
    id: 2,
    quote: "Working with Jabir was seamless. He doesn't just write code; he understands the business goals behind the product.",
    author: "Marcus Chen",
    role: "Founder, AI Solutions",
  },
  {
    id: 3,
    quote: "The AI dashboard he developed is lightning fast. Incredible attention to detail and performance optimization.",
    author: "Elena Rodriguez",
    role: "CTO, DataSync",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative z-10 bg-bg-primary border-t border-border-subtle">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <div className="mb-4 text-accent-cyan font-mono text-sm tracking-widest uppercase">
            &mdash; Client Feedback
          </div>
          <h2 className="text-[length:var(--text-h2)] font-display font-bold leading-tight">
            Don't just take my word for it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <GlassCard className="h-full flex flex-col justify-between p-8">
                <div className="text-accent-cyan text-4xl font-display leading-none mb-6">"</div>
                <p className="text-text-secondary mb-8 flex-grow italic">
                  {t.quote}
                </p>
                <div>
                  <div className="font-bold text-text-primary">{t.author}</div>
                  <div className="text-sm text-text-muted">{t.role}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
