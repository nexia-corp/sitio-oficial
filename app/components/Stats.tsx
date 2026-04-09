'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10, label: 'Negocios automatizados', suffix: '+' },
  { value: 7, label: 'Días de implementación', suffix: '' },
  { value: 24, label: 'Horas de atención', suffix: '/7' },
  { value: 0, label: 'Conocimientos técnicos requeridos', suffix: '' },
];

interface CounterProps {
  target: number;
  suffix: string;
  isInView: boolean;
}

function Counter({ target, suffix, isInView }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.floor(stepValue * currentStep));

      if (currentStep >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      id="stats"
      ref={ref}
      className="w-full py-24 px-6 bg-nexia-dark-bg relative overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0, 87, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="font-syne font-700 text-4xl md:text-5xl text-nexia-cyan mb-2">
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={inView}
                />
              </div>
              <p className="text-sm md:text-base text-nexia-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
