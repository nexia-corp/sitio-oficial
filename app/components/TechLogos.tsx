'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const techs = [
  { name: 'n8n', icon: 'n8n' },
  { name: 'OpenAI', icon: 'openai' },
  { name: 'WhatsApp', icon: 'whatsapp' },
  { name: 'Meta', icon: 'meta' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Stripe', icon: 'stripe' },
];

export function TechLogos() {
  const marqueeItems = [...techs, ...techs];

  return (
    <section className="w-full py-32 px-6 bg-white border-b border-nexia-blue border-opacity-15">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-wider text-nexia-muted font-semibold letter-spacing-wider mb-6">
            Construido con
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-nexia-blue to-nexia-cyan rounded-full" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden py-12">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex gap-20 px-4"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            {marqueeItems.map((tech, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-4 min-w-max"
                whileHover={{ scale: 1.15, filter: 'grayscale(0%)' }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 rounded-lg bg-white hover:bg-nexia-mid-bg"
                  style={{
                    backgroundImage: `url('https://cdn.simpleicons.org/${tech.icon}/0057FF')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
                <span className="text-xs text-nexia-muted whitespace-nowrap font-medium">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
