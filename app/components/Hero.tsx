'use client';

import { motion } from 'framer-motion';

export function Hero() {
  const marqueeText =
    'WHATSAPP IA · LANDINGS IA · META ADS · CRM AUTOMATIZADO · N8N · OPENAI · AGENTES IA · NEXIA CORP · ';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-nexia-blue opacity-[0.08] blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-nexia-violet opacity-[0.08] blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-nexia-cyan opacity-[0.05] blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-8 px-4 py-2 rounded-full border border-nexia-blue border-opacity-50 bg-nexia-blue bg-opacity-5 flex items-center gap-2"
        >
          <span className="text-2xl">⚡</span>
          <span className="text-sm text-nexia-muted">
            Automatización con IA · Ecuador → LATAM
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <h1 className="font-syne font-800 text-5xl sm:text-6xl md:text-hero-lg leading-tight tracking-tighter">
            <span className="text-white">Tu negocio,</span>
            <br />
            <span className="bg-gradient-to-r from-nexia-cyan via-nexia-cyan to-nexia-blue bg-clip-text text-transparent">
              en piloto automático.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-nexia-muted leading-relaxed mb-12"
        >
          Construimos sistemas de IA que atienden, califican y convierten clientes — las 24 horas, sin intervención humana.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-nexia-blue text-white font-medium rounded-lg hover:shadow-glow-blue transition-all duration-300"
          >
            Ver nuestros sistemas →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-white border-opacity-20 text-white font-medium rounded-lg hover:border-opacity-100 transition-all duration-300"
          >
            Demo en vivo
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-nexia-blue to-nexia-violet flex items-center justify-center text-white text-xs font-bold border-2 border-nexia-dark-bg"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-nexia-muted">
            10+ negocios ya automatizan con Nexia
          </p>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-nexia-dark-bg via-nexia-dark-bg to-transparent py-8 overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-xs uppercase text-nexia-muted font-medium tracking-widest">
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
