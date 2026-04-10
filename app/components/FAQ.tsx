'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    question: '¿Cuánto tiempo tarda la implementación?',
    answer:
      'Entre 5 y 7 días hábiles desde el primer pago. Incluimos todo: diseño, configuración, integraciones y capacitación.',
  },
  {
    question: '¿Necesito conocimientos técnicos?',
    answer:
      'No. Nosotros configuramos todo. Tú solo usas los resultados y ves cómo tu negocio se automatiza. Incluimos capacitación completa.',
  },
  {
    question: '¿Qué pasa si quiero cambios después?',
    answer:
      'Con mantenimiento mensual tienes ajustes ilimitados. Contacta al equipo y hacemos lo que necesites.',
  },
  {
    question: '¿Funciona para cualquier negocio?',
    answer:
      'Sí. Clínicas, inmobiliarias, restaurantes, e-commerce, servicios profesionales y más. La IA se adapta a tu modelo.',
  },
  {
    question: '¿Puedo ver un demo antes de contratar?',
    answer:
      'Sí, agenda una llamada gratuita y te mostramos en vivo cómo funciona con un caso similar al tuyo.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isInView: boolean;
}

function FAQItem({ question, answer, index, isInView }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-lg overflow-hidden border border-nexia-blue border-opacity-20 hover:border-opacity-50 transition-colors"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-nexia-blue hover:bg-opacity-5 transition-colors"
      >
        <span className="font-semibold text-left text-nexia-text text-sm">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 text-nexia-blue flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 border-t border-nexia-blue border-opacity-10 text-nexia-muted text-sm leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="faq"
      ref={ref}
      className="w-full py-32 px-6 bg-white border-t border-nexia-blue border-opacity-15"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-syne font-700 text-section-title-md text-white leading-tight">
            Preguntas frecuentes
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
