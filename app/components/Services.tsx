'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    title: 'Agente WhatsApp IA',
    description:
      'Atiende, califica y agenda clientes 24/7 sin intervención humana. Conectado a tu CRM.',
    price: 'Desde $499',
    tag: 'Más solicitado',
    icon: '💬',
  },
  {
    title: 'Landing de Alta Conversión',
    description:
      'Página construida para convertir. Integrada directamente con tu agente y sistema de captación.',
    price: 'Desde $399',
    icon: '⚡',
  },
  {
    title: 'Sistema de Captación Completo',
    description:
      'Meta Ads + Landing + Agente IA + CRM en un solo flujo automatizado. Tu máquina de ventas.',
    price: 'Desde $899',
    tag: 'Mayor ROI',
    icon: '🎯',
  },
];

export function Services() {
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
      id="servicios"
      ref={ref}
      className="w-full py-24 px-6 bg-nexia-dark-bg"
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
            Lo que construimos
          </p>
          <h2 className="font-syne font-700 text-section-title-md md:text-section-title text-white leading-tight">
            Sistemas que trabajan mientras tú descansas.
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group glass rounded-xl p-8 border-t border-nexia-blue border-opacity-30 hover:border-opacity-100 hover:shadow-glow-blue transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title & Tag */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-syne font-700 text-white text-lg leading-tight">
                  {service.title}
                </h3>
                {service.tag && (
                  <span className="px-2 py-1 bg-nexia-blue bg-opacity-20 border border-nexia-blue border-opacity-50 rounded text-xs font-semibold text-nexia-cyan whitespace-nowrap ml-2">
                    {service.tag}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-nexia-muted text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Price */}
              <p className="text-nexia-cyan font-syne font-600 text-lg mb-6">
                {service.price}
              </p>

              {/* CTA */}
              <motion.button
                whileHover={{ x: 5 }}
                className="text-nexia-cyan text-sm font-medium hover:text-white transition-colors"
              >
                Ver detalle →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
