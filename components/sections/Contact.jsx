'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';
import MagneticButton from '../ui/MagneticButton';
import { useAnalytics } from '../../hooks/useAnalytics';
import emailjs from '@emailjs/browser';
import { FiGithub, FiTwitter, FiLinkedin, FiCheck } from 'react-icons/fi';

export default function Contact() {
  const formRef = useRef();
  const { trackEvent } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'UI/UX',
    budget: '<$300',
    message: '',
    website: '', // honeypot
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});
  const [cooldown, setCooldown] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website !== '') return;

    // Cooldown check
    if (cooldown) return;

    // Validation
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.message.trim().length < 20) newErrors.message = 'Please write at least 20 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    const cleanData = {
      // Standard EmailJS variables
      from_name: formData.name.replace(/<[^>]*>/g, '').trim(),
      from_email: formData.email.trim().toLowerCase(),
      reply_to: formData.email.trim().toLowerCase(),
      
      // Custom template variables (matching exact names or snake_case)
      name: formData.name.replace(/<[^>]*>/g, '').trim(),
      email: formData.email.trim().toLowerCase(),
      projectType: formData.projectType,
      project_type: formData.projectType,
      budget: formData.budget,
      message: formData.message.replace(/<[^>]*>/g, '').trim(),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        cleanData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      trackEvent('contact_form_submit', { method: 'emailjs' });
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000);
      setFormData({ name: '', email: '', projectType: 'UI/UX', budget: '<$300', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      trackEvent('contact_form_error', { error: err.text || err.message || 'Unknown error' });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative z-10 bg-bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-4 text-accent-cyan font-mono text-sm tracking-widest uppercase"
            >
              &mdash; Contact
            </motion.div>
            
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={1}
              className="text-[length:var(--text-h2)] font-display font-bold mb-6 leading-tight"
            >
              Let's build something worth shipping.
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={2}
              className="text-text-secondary text-lg mb-12"
            >
              Have a project in mind? I respond within 24 hours.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={3}
              className="mb-12 space-y-6"
            >
              {/* Testimonials */}
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-glass-bg border border-border-subtle relative">
                  <div className="text-accent-cyan text-2xl font-display leading-none absolute top-4 left-4">"</div>
                  <p className="text-text-secondary text-sm italic pl-6 mb-3">Jabir completely transformed our frontend... increased conversion rate by 40%.</p>
                  <p className="text-sm font-bold pl-6 text-text-primary">Sarah Jenkins <span className="font-normal text-text-muted">— TechFlow</span></p>
                </div>
                <div className="p-6 rounded-xl bg-glass-bg border border-border-subtle relative">
                  <div className="text-accent-cyan text-2xl font-display leading-none absolute top-4 left-4">"</div>
                  <p className="text-text-secondary text-sm italic pl-6 mb-3">The AI dashboard he developed is lightning fast. Incredible attention to detail.</p>
                  <p className="text-sm font-bold pl-6 text-text-primary">Elena Rodriguez <span className="font-normal text-text-muted">— DataSync</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={4}
              className="p-8 rounded-2xl bg-bg-primary border border-border-subtle"
            >
              <h3 className="font-display font-bold mb-4">Direct Contact</h3>
              
              <div className="space-y-3 mb-8 text-sm text-text-secondary">
                <p className="flex items-center gap-2"><FiCheck className="w-4 h-4 text-accent-cyan" /> Response within 24 hours</p>
                <p className="flex items-center gap-2"><FiCheck className="w-4 h-4 text-accent-cyan" /> Free 30-min discovery call</p>
                <p className="flex items-center gap-2"><FiCheck className="w-4 h-4 text-accent-cyan" /> No agency markup — direct with Jabir</p>
              </div>

              <p className="text-text-secondary mb-6">Email: <a href="mailto:jaabirmahmud01@gmail.com" className="text-accent-cyan hover:underline">jaabirmahmud01@gmail.com</a></p>
              
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/jabxfx" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="LinkedIn">
                  <FiLinkedin className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/jabx_fx" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="Twitter">
                  <FiTwitter className="w-6 h-6" />
                </a>
                <a href="https://github.com/jabxfx" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="GitHub">
                  <FiGithub className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={2}
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-glass-bg border border-accent-cyan/30">
                <div className="w-16 h-16 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan text-3xl mb-6">
                  &#10003;
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Message sent!</h3>
                <p className="text-text-secondary">I'll respond within 24h.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-accent-cyan hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border-subtle py-4 focus:outline-none focus:border-accent-cyan transition-colors peer placeholder-transparent"
                    placeholder="Full Name *"
                  />
                  <label htmlFor="name" className="absolute left-0 top-4 text-text-secondary transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Full Name *
                  </label>
                  {errors.name && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.name}</span>}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border-subtle py-4 focus:outline-none focus:border-accent-cyan transition-colors peer placeholder-transparent"
                    placeholder="Email Address *"
                    suppressHydrationWarning
                  />
                  <label htmlFor="email" className="absolute left-0 top-4 text-text-secondary transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Email Address *
                  </label>
                  {errors.email && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.email}</span>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border-subtle py-4 focus:outline-none focus:border-accent-cyan transition-colors text-text-primary appearance-none"
                    >
                      <option value="UI/UX" className="bg-bg-primary">UI/UX</option>
                      <option value="Frontend" className="bg-bg-primary">Frontend</option>
                      <option value="AI Tool" className="bg-bg-primary">AI Tool</option>
                      <option value="Full Build" className="bg-bg-primary">Full Build</option>
                      <option value="Other" className="bg-bg-primary">Other</option>
                    </select>
                    <label className="absolute left-0 -top-2 text-xs text-text-secondary">Project Type</label>
                  </div>

                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border-subtle py-4 focus:outline-none focus:border-accent-cyan transition-colors text-text-primary appearance-none"
                    >
                      <option value="<$300" className="bg-bg-primary">&lt;$300</option>
                      <option value="$300–$800" className="bg-bg-primary">$300–$800</option>
                      <option value="$800–$2k" className="bg-bg-primary">$800–$2k</option>
                      <option value="$2k+" className="bg-bg-primary">$2k+</option>
                    </select>
                    <label className="absolute left-0 -top-2 text-xs text-text-secondary">Budget Range</label>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-transparent border-b border-border-subtle py-4 focus:outline-none focus:border-accent-cyan transition-colors peer placeholder-transparent resize-none"
                    placeholder="Message *"
                  />
                  <label htmlFor="message" className="absolute left-0 top-4 text-text-secondary transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Message *
                  </label>
                  {errors.message && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-sm">
                    Couldn't send — try emailing jaabirmahmud01@gmail.com directly.
                  </div>
                )}

                <div className="pt-4">
                  <MagneticButton 
                    type="submit" 
                    variant="primary" 
                    className="w-full md:w-auto"
                    disabled={status === 'loading' || cooldown}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message \u2192'}
                  </MagneticButton>
                  <p className="text-xs text-text-muted mt-4">No contracts. No retainers. Just results.</p>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
