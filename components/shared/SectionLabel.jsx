import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

export default function SectionLabel({ text, custom = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      custom={custom}
      className="mb-4 text-accent-cyan font-mono text-sm tracking-widest uppercase"
    >
      &mdash; {text}
    </motion.div>
  );
}
