'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const plans = [
  {
    name: 'Landing IA',
    price: '$399',
    features: [
      'Landing profesional',
      'Formulario inteligente',
      'Conexión WhatsApp',
      'SSL',
      'Hosting 1 año',
    ],
  },
  {
    name: 'Agente WhatsApp',
    price: '$499',
    badge: 'RECOMENDADO',
    features: [
      'Bot IA calificador',
      'Integración CRM',
      'Respuestas 24/7',
      'Configuración completa',
      '30 días soporte',
    ],
    highlighted: true,
  },
  {
    name: 'Sistema Completo',
    price: '$899',
    features: [
      'Todo lo anterior',
      'Setup Meta Ads',
      'CRM configurado',
      'Dashboard de métricas',
      '60 días soporte',
    ],
  },
];

export function Pricing() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="precios"
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
            Planes
          </p>
          <h2 className="font-syne font-700 text-section-title-md md:text-section-title text-nexia-dark-bg leading-tight">
            Invierte en automatización, no en empleados.
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={
                plan.highlighted
                  ? { scale: 1.05, y: -20 }
                  : { scale: 1.02, y: -5 }
              }
              className={`rounded-xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'glass-light border-2 border-nexia-blue shadow-glow-blue'
                  : 'glass-light border border-nexia-blue border-opacity-20'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="mb-4 inline-block px-3 py-1 bg-nexia-blue text-white text-xs font-bold rounded-full">
                  {plan.badge}
                </div>
              )}

              {/* Name & Price */}
              <h3 className="font-syne font-700 text-2xl text-nexia-dark-bg mb-2">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="font-syne font-800 text-4xl text-nexia-blue">
                  {plan.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-nexia-cyan font-bold">✓</span>
                    <span className="text-nexia-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-nexia-blue text-white hover:shadow-glow-blue'
                    : 'border border-nexia-blue text-nexia-blue hover:bg-nexia-blue hover:text-white'
                }`}
              >
                Comenzar →
              </motion.button>

              {/* Footer text */}
              <p className="text-xs text-nexia-muted text-center mt-4">
                Implementación en 7 días · Soporte incluido
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Maintenance Info */}
        <motion.div
          className="text-center p-6 glass-light rounded-lg border border-nexia-blue border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-nexia-dark-bg">
            <span className="font-semibold">Mantenimiento mensual desde $99/mes</span> —
            ajustes ilimitados + soporte continuo
          </p>
        </motion.div>
      </div>
    </section>
  );
}
