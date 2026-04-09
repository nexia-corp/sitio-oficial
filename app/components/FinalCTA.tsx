'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function FinalCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center px-6 bg-nexia-dark-bg overflow-hidden"
    >
      {/* Glowing orb background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-96 h-96 rounded-full bg-nexia-blue opacity-10 blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        {/* Headline */}
        <motion.h2
          className="font-syne font-800 text-hero-lg md:text-hero leading-tight text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          ¿Empezamos?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-xl text-nexia-muted mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          30 minutos. Sin compromiso. Solo resultados.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="https://wa.me/593XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-block px-10 py-4 bg-nexia-blue text-white font-semibold rounded-lg shadow-glow-blue hover:shadow-glow-blue-lg transition-all duration-300 mb-8"
        >
          Agenda tu llamada gratuita →
        </motion.a>

        {/* Benefits */}
        <motion.p
          className="text-sm text-nexia-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sin tarjeta de crédito · Sin contratos largos · Implementación en 7 días
        </motion.p>
      </motion.div>
    </section>
  );
}
