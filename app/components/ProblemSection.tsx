'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const problems = [
  {
    icon: '💬',
    title: 'Pierdes clientes',
    desc: 'porque nadie responde WhatsApp a las 11pm.',
    number: '01',
  },
  {
    icon: '👁️',
    title: 'Tu landing recibe visitas',
    desc: 'Pero casi nadie convierte.',
    number: '02',
  },
  {
    icon: '⚙️',
    title: 'Sigues haciendo seguimiento manual',
    desc: 'Todos los días.',
    number: '03',
  },
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="problemas"
      ref={ref}
      className="w-full py-32 px-6 bg-gradient-to-br from-white via-white to-nexia-mid-bg text-nexia-dark-bg border-t border-nexia-blue border-opacity-15 relative overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-nexia-blue opacity-5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-nexia-violet opacity-5 blur-3xl" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            variants={itemVariants}
            className="text-sm uppercase tracking-widest text-nexia-blue font-bold mb-4"
          >
            ¿Cuál es tu problema?
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-syne font-800 text-4xl md:text-5xl text-nexia-text mb-6 leading-tight"
          >
            Los 3 problemas que frenan tu negocio
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-nexia-blue to-nexia-cyan mx-auto"
          />
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full p-8 rounded-2xl glass border-2 border-nexia-blue border-opacity-10 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-nexia-blue to-nexia-violet text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {problem.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {problem.icon}
                </div>

                {/* Content */}
                <h3 className="font-syne font-700 text-xl text-nexia-text mb-3 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-nexia-muted leading-relaxed mb-6">
                  {problem.desc}
                </p>

                {/* Accent line */}
                <div className="h-1 w-8 bg-gradient-to-r from-nexia-blue to-nexia-cyan rounded-full" />
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-nexia-blue to-nexia-cyan pointer-events-none" style={{ filter: 'blur(12px)', zIndex: -1 }} />
            </motion.div>
          ))}
        </div>

        {/* Solution CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-12 border-t-2 border-nexia-blue border-opacity-20"
        >
          <p className="text-sm uppercase tracking-widest text-nexia-muted font-bold mb-4">
            Solución
          </p>
          <h3 className="font-syne font-700 text-3xl md:text-4xl text-nexia-text mb-4">
            Los tres tienen la misma solución
          </h3>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-nexia-blue font-bold text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
