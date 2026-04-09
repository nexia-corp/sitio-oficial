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
    <section className="w-full py-16 px-6 bg-nexia-mid-bg border-y border-nexia-blue border-opacity-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-nexia-muted font-semibold mb-3">
            Construido con
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-nexia-mid-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-nexia-mid-bg to-transparent z-10" />

          <motion.div
            className="flex gap-12"
            animate={{ x: [0, -1600] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {marqueeItems.map((tech, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-3 min-w-max"
                whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                  style={{
                    backgroundImage: `url('https://cdn.simpleicons.org/${tech.icon}/000000')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
                <span className="text-xs text-nexia-muted whitespace-nowrap">
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
