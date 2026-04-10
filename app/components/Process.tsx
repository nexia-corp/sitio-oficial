'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: '30 minutos para entender tu negocio y procesos actuales.',
  },
  {
    number: '02',
    title: 'Diseño',
    description: 'Construimos el sistema exacto para tu caso.',
  },
  {
    number: '03',
    title: 'Activación',
    description: 'En vivo en menos de 7 días hábiles.',
  },
  {
    number: '04',
    title: 'Resultados',
    description: 'Mides todo en tiempo real desde el primer día.',
  },
];

export function Process() {
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
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="proceso"
      ref={ref}
      className="w-full py-32 px-6 bg-nexia-light-bg text-nexia-dark-bg border-t border-nexia-blue border-opacity-15"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-nexia-muted font-semibold mb-3">
            El Proceso
          </p>
          <h2 className="font-syne font-700 text-section-title-md md:text-section-title text-nexia-dark-bg leading-tight">
            De cero a automatizado en 7 días.
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col"
            >
              {/* Circle Number */}
              <div className="mb-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-nexia-blue flex items-center justify-center flex-shrink-0">
                  <span className="font-syne font-700 text-white text-xl">
                    {step.number}
                  </span>
                </div>

                {/* Connecting Line (hidden on mobile, shown on md+) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block flex-1 h-1 bg-gradient-to-r from-nexia-blue to-nexia-cyan"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    style={{ originX: 0 }}
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-syne font-600 text-lg text-nexia-dark-bg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-nexia-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
