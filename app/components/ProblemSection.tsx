'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const problems = [
  'Pierdes clientes porque nadie responde WhatsApp a las 11pm.',
  'Tu landing recibe visitas. Pero casi nadie convierte.',
  'Sigues haciendo seguimiento manual. Todos los días.',
];

export function ProblemSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="problemas"
      ref={ref}
      className="w-full py-24 px-6 bg-nexia-light-bg text-nexia-dark-bg"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Problems */}
        <div className="space-y-8 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6 items-start"
            >
              <div className="h-full w-1 bg-gradient-to-b from-nexia-blue to-nexia-cyan rounded-full flex-shrink-0" />
              <p className="text-3xl md:text-4xl font-syne font-700 leading-tight pt-2">
                {problem}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Solution hint */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-8 border-t border-nexia-blue border-opacity-20"
        >
          <p className="text-xl font-syne font-600 text-nexia-blue">
            Los tres tienen la misma solución. →
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
