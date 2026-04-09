'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    quote:
      'El agente agenda el 70% de las citas solo, sin que nadie intervenga.',
    author: 'Dr. Carlos M.',
    business: 'Clínica Dental',
    initials: 'CM',
  },
  {
    quote:
      'Ahora nuestros leads reciben respuesta en segundos. Las ventas subieron.',
    author: 'Ana R.',
    business: 'Inmobiliaria',
    initials: 'AR',
  },
  {
    quote:
      'La landing convierte el doble que la que teníamos antes.',
    author: 'Pedro V.',
    business: 'E-commerce',
    initials: 'PV',
  },
];

export function Testimonials() {
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
      id="testimonios"
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
            Clientes
          </p>
          <h2 className="font-syne font-700 text-section-title-md md:text-section-title text-white leading-tight">
            Lo que dicen los negocios que ya automatizan.
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass rounded-xl p-8 flex flex-col justify-between"
            >
              {/* Quote Mark */}
              <div className="text-6xl text-nexia-blue opacity-30 mb-4">
                "
              </div>

              {/* Quote */}
              <p className="text-white font-medium leading-relaxed mb-8 flex-grow">
                {testimonial.quote}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-nexia-cyan">
                    ★
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nexia-blue to-nexia-cyan flex items-center justify-center text-nexia-dark-bg text-sm font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-nexia-muted">
                    {testimonial.business}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
