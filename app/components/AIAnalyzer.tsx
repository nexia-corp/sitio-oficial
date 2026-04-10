'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnalysisResult {
  businessType: string;
  problems: Array<{
    title: string;
    impact: string;
    icon: string;
  }>;
  metrics: {
    hoursWasted: number;
    leadsLost: number;
    costPerMonth: number;
  };
  recommendation: string;
  roi: number;
}

// Detectar tipo de negocio
function detectBusinessType(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('clinic') || lower.includes('dental') || lower.includes('médico')) return 'Clínica Dental';
  if (lower.includes('inmobil') || lower.includes('propiedad')) return 'Inmobiliaria';
  if (lower.includes('tienda') || lower.includes('ecommerce') || lower.includes('vendo')) return 'E-commerce';
  if (lower.includes('restaurante') || lower.includes('comida')) return 'Restaurante';
  if (lower.includes('salon') || lower.includes('barberia') || lower.includes('peluquería')) return 'Salón de Belleza';
  if (lower.includes('gym') || lower.includes('fitness')) return 'Gym/Fitness';
  if (lower.includes('consultor') || lower.includes('agencia') || lower.includes('service')) return 'Servicios Profesionales';

  return 'Negocio';
}

// Generar análisis personalizado
function generateAnalysis(businessDescription: string): AnalysisResult {
  const businessType = detectBusinessType(businessDescription);
  const lower = businessDescription.toLowerCase();

  // Detectar problemas específicos
  const problems = [];
  const metrics = {
    hoursWasted: 0,
    leadsLost: 0,
    costPerMonth: 0,
  };

  // Análisis de WhatsApp/Respuestas
  if (lower.includes('whatsapp') || lower.includes('responde') || lower.includes('consultas')) {
    problems.push({
      title: 'Respuestas Lentas',
      impact: 'Pierdes 30-40% de leads por falta de respuesta inmediata',
      icon: '💬',
    });
    metrics.leadsLost += 30;
  }

  // Análisis de Conversión
  if (lower.includes('landing') || lower.includes('convert') || lower.includes('visitas')) {
    problems.push({
      title: 'Baja Conversión',
      impact: 'Landing recibe tráfico pero convierte <5%',
      icon: '📊',
    });
    metrics.hoursWasted += 20;
  }

  // Análisis de Seguimiento Manual
  if (lower.includes('seguimiento') || lower.includes('manual') || lower.includes('llamadas')) {
    problems.push({
      title: 'Trabajo Manual',
      impact: 'Gastas 40-80 horas/mes en seguimiento manual',
      icon: '⚙️',
    });
    metrics.hoursWasted += 60;
    metrics.costPerMonth += 3000;
  }

  // Análisis de Disponibilidad
  if (lower.includes('24/7') || lower.includes('noche') || lower.includes('disponible')) {
    problems.push({
      title: 'Disponibilidad Limitada',
      impact: 'No estás disponible fuera de horario - pierdes clientes',
      icon: '⏰',
    });
    metrics.leadsLost += 40;
  }

  // Si no hay problemas detectados, agregar genéricos
  if (problems.length === 0) {
    problems.push(
      {
        title: 'Atención Lenta',
        impact: 'Respuestas lentas a consultas de clientes',
        icon: '💬',
      },
      {
        title: 'Conversión Baja',
        impact: 'No todos tus visitantes se convierten en clientes',
        icon: '📊',
      },
      {
        title: 'Gestión Manual',
        impact: 'Dedicas mucho tiempo a tareas repetitivas',
        icon: '⚙️',
      }
    );
    metrics.hoursWasted = 50;
    metrics.leadsLost = 25;
    metrics.costPerMonth = 2500;
  }

  // Calcular ROI basado en tipo de negocio
  let roi = 0;
  if (businessType.includes('Clínica')) roi = 8500;
  else if (businessType.includes('Inmobiliaria')) roi = 12000;
  else if (businessType.includes('E-commerce')) roi = 6500;
  else if (businessType.includes('Restaurante')) roi = 4500;
  else roi = 7000;

  return {
    businessType,
    problems,
    metrics: {
      hoursWasted: metrics.hoursWasted || 50,
      leadsLost: metrics.leadsLost || 25,
      costPerMonth: metrics.costPerMonth || 2500,
    },
    recommendation: `Para ${businessType}, la solución es: Agente IA WhatsApp + Landing de conversión + CRM automatizado. Implementación en 7 días.`,
    roi,
  };
}

export function AIAnalyzer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [businessDesc, setBusinessDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!businessDesc.trim()) return;

    setIsAnalyzing(true);

    // Simular análisis con delay
    setTimeout(() => {
      const analysis = generateAnalysis(businessDesc);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="ai-analyzer"
      ref={ref}
      className="w-full py-32 px-6 bg-gradient-to-br from-nexia-mid-bg via-white to-white border-t border-nexia-blue border-opacity-15"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-nexia-blue font-bold mb-4">
            Análisis Inteligente
          </p>
          <h2 className="font-syne font-800 text-4xl md:text-5xl text-nexia-text mb-6">
            Descubre tus problemas con IA
          </h2>
          <p className="text-nexia-muted text-lg mb-6 max-w-2xl mx-auto">
            Describe tu negocio y déjanos que IA identifique exactamente qué está frenando tu crecimiento
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-nexia-blue to-nexia-cyan mx-auto" />
        </motion.div>

        {/* Input Section */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-8 border-2 border-nexia-blue border-opacity-20 mb-12 backdrop-blur-xl"
        >
          <label className="block text-sm font-bold text-nexia-text mb-4">
            Cuéntanos sobre tu negocio:
          </label>
          <textarea
            value={businessDesc}
            onChange={(e) => setBusinessDesc(e.target.value)}
            disabled={isAnalyzing}
            placeholder="Ej: Tengo una clínica dental en Quito, recibo 30 pacientes/mes pero pierdo muchos por falta de respuesta en WhatsApp. Hago seguimiento manual y es muy cansador..."
            className="w-full h-32 p-4 bg-white border-2 border-nexia-blue border-opacity-20 rounded-lg text-nexia-text placeholder-nexia-muted focus:outline-none focus:border-opacity-100 focus:ring-2 focus:ring-nexia-blue focus:ring-opacity-20 transition-all resize-none"
          />

          <div className="flex gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !businessDesc.trim()}
              className="flex-1 py-4 bg-gradient-to-r from-nexia-blue to-nexia-violet text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Analizando...
                </>
              ) : (
                <>
                  🤖 Analizar Ahora
                </>
              )}
            </motion.button>
            {result && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setResult(null);
                  setBusinessDesc('');
                }}
                className="px-6 py-4 border-2 border-nexia-blue border-opacity-50 text-nexia-blue font-bold rounded-lg hover:border-opacity-100 transition-all"
              >
                Limpiar
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Business Type Badge */}
              <motion.div
                variants={itemVariants}
                className="text-center mb-8"
              >
                <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-nexia-blue to-nexia-violet text-white font-bold">
                  📊 {result.businessType} Identificado
                </div>
              </motion.div>

              {/* Problems Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {result.problems.map((problem, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="glass rounded-xl p-6 border-2 border-nexia-blue border-opacity-20 hover:border-opacity-50 transition-all"
                  >
                    <div className="text-4xl mb-4">{problem.icon}</div>
                    <h3 className="font-syne font-700 text-lg text-nexia-text mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-nexia-muted">
                      {problem.impact}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  variants={itemVariants}
                  className="glass rounded-xl p-6 border-2 border-nexia-cyan border-opacity-30"
                >
                  <p className="text-sm text-nexia-muted mb-2">Horas desperdiciadas/mes</p>
                  <p className="font-syne font-800 text-3xl text-nexia-cyan">
                    {result.metrics.hoursWasted}h
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="glass rounded-xl p-6 border-2 border-nexia-cyan border-opacity-30"
                >
                  <p className="text-sm text-nexia-muted mb-2">Leads perdidos/mes</p>
                  <p className="font-syne font-800 text-3xl text-nexia-cyan">
                    {result.metrics.leadsLost}+
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="glass rounded-xl p-6 border-2 border-nexia-cyan border-opacity-30"
                >
                  <p className="text-sm text-nexia-muted mb-2">Costo mensual</p>
                  <p className="font-syne font-800 text-3xl text-nexia-cyan">
                    ${result.metrics.costPerMonth.toLocaleString()}
                  </p>
                </motion.div>
              </div>

              {/* Recommendation */}
              <motion.div
                variants={itemVariants}
                className="glass rounded-2xl p-8 border-2 border-nexia-blue border-opacity-30 bg-gradient-to-r from-nexia-blue from-0% via-nexia-blue via-50% to-nexia-violet to-100% bg-opacity-5"
              >
                <h3 className="font-syne font-700 text-2xl text-nexia-text mb-4">
                  ✨ Nuestra Recomendación
                </h3>
                <p className="text-lg text-nexia-text mb-6 leading-relaxed">
                  {result.recommendation}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-sm text-nexia-muted mb-2">ROI Proyectado/mes</p>
                    <p className="font-syne font-800 text-3xl text-nexia-cyan">
                      ${result.roi.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-nexia-muted mb-2">Recuperación de inversión</p>
                    <p className="font-syne font-800 text-3xl text-nexia-cyan">
                      ~{Math.round(1299 / (result.roi / 30))} días
                    </p>
                  </div>
                </div>

                <motion.a
                  href="https://wa.me/593XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="block w-full py-4 bg-nexia-blue text-white font-bold rounded-lg text-center hover:shadow-lg transition-all"
                >
                  Agendar Consulta Gratuita →
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Text */}
        {!result && (
          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-nexia-muted"
          >
            💡 Nuestro sistema IA analizará tu descripción e identificará problemas específicos de tu negocio
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
