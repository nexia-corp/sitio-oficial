'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

function generateAnalysis(businessDescription: string): AnalysisResult {
  const businessType = detectBusinessType(businessDescription);
  const lower = businessDescription.toLowerCase();

  const problems = [];
  const metrics = {
    hoursWasted: 0,
    leadsLost: 0,
    costPerMonth: 0,
  };

  if (lower.includes('whatsapp') || lower.includes('responde') || lower.includes('consultas')) {
    problems.push({
      title: 'Respuestas Lentas',
      impact: 'Pierdes 30-40% de leads por falta de respuesta inmediata',
      icon: '💬',
    });
    metrics.leadsLost += 30;
  }

  if (lower.includes('landing') || lower.includes('convert') || lower.includes('visitas')) {
    problems.push({
      title: 'Baja Conversión',
      impact: 'Landing recibe tráfico pero convierte <5%',
      icon: '📊',
    });
    metrics.hoursWasted += 20;
  }

  if (lower.includes('seguimiento') || lower.includes('manual') || lower.includes('llamadas')) {
    problems.push({
      title: 'Trabajo Manual',
      impact: 'Gastas 40-80 horas/mes en seguimiento manual',
      icon: '⚙️',
    });
    metrics.hoursWasted += 60;
    metrics.costPerMonth += 3000;
  }

  if (lower.includes('24/7') || lower.includes('noche') || lower.includes('disponible')) {
    problems.push({
      title: 'Disponibilidad Limitada',
      impact: 'No estás disponible fuera de horario - pierdes clientes',
      icon: '⏰',
    });
    metrics.leadsLost += 40;
  }

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

export function AIAnalyzerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [businessDesc, setBusinessDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!businessDesc.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = generateAnalysis(businessDesc);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const closeModal = () => {
    setIsOpen(false);
    setResult(null);
    setBusinessDesc('');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-8 z-40"
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-nexia-blue opacity-20"
          />
          <div className="relative w-14 h-14 bg-nexia-blue rounded-full flex items-center justify-center shadow-glow-blue hover:shadow-glow-blue-lg transition-all">
            <span className="text-xl">🤖</span>
          </div>
        </div>
      </motion.button>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-nexia-blue to-nexia-violet p-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h2 className="font-syne font-700 text-2xl text-white">Análisis IA</h2>
                  <p className="text-nexia-cyan text-sm mt-1">Descubre tus problemas empresariales</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!result ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-nexia-text mb-3">
                        Cuéntanos sobre tu negocio:
                      </label>
                      <textarea
                        value={businessDesc}
                        onChange={(e) => setBusinessDesc(e.target.value)}
                        disabled={isAnalyzing}
                        placeholder="Ej: Tengo una clínica dental, recibo pacientes pero pierdo muchos por falta de respuesta en WhatsApp..."
                        className="w-full h-24 p-3 bg-white border-2 border-nexia-blue border-opacity-20 rounded-lg text-nexia-text placeholder-nexia-muted focus:outline-none focus:border-opacity-100 focus:ring-2 focus:ring-nexia-blue focus:ring-opacity-20 transition-all resize-none text-sm"
                      />
                    </div>

                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !businessDesc.trim()}
                      className="w-full py-3 bg-gradient-to-r from-nexia-blue to-nexia-violet text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Analizando...
                        </>
                      ) : (
                        <>🤖 Analizar</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Business Type */}
                    <div className="text-center pb-4 border-b border-nexia-blue border-opacity-20">
                      <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-nexia-blue to-nexia-violet text-white font-bold text-sm">
                        📊 {result.businessType}
                      </div>
                    </div>

                    {/* Problems Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.problems.map((problem, idx) => (
                        <div
                          key={idx}
                          className="glass rounded-lg p-4 border-2 border-nexia-blue border-opacity-20"
                        >
                          <div className="text-3xl mb-2">{problem.icon}</div>
                          <h4 className="font-bold text-sm text-nexia-text mb-1">
                            {problem.title}
                          </h4>
                          <p className="text-xs text-nexia-muted">
                            {problem.impact}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 bg-nexia-mid-bg p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-nexia-muted mb-1">Horas/mes</p>
                        <p className="font-bold text-nexia-cyan text-lg">
                          {result.metrics.hoursWasted}h
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-nexia-muted mb-1">Leads perdidos</p>
                        <p className="font-bold text-nexia-cyan text-lg">
                          {result.metrics.leadsLost}+
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-nexia-muted mb-1">Costo/mes</p>
                        <p className="font-bold text-nexia-cyan text-lg">
                          ${result.metrics.costPerMonth.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Recommendation & ROI */}
                    <div className="bg-gradient-to-r from-nexia-blue from-0% via-nexia-blue via-50% to-nexia-violet to-100% bg-opacity-5 rounded-lg p-4 border-2 border-nexia-blue border-opacity-30">
                      <h4 className="font-bold text-nexia-text mb-2">✨ Recomendación</h4>
                      <p className="text-sm text-nexia-text mb-4 leading-relaxed">
                        {result.recommendation}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-nexia-muted mb-1">ROI/mes</p>
                          <p className="font-bold text-nexia-cyan">
                            ${result.roi.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-nexia-muted mb-1">Recuperación</p>
                          <p className="font-bold text-nexia-cyan">
                            ~{Math.round(1299 / (result.roi / 30))} días
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="https://wa.me/593XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-nexia-blue text-white font-bold rounded-lg text-center hover:shadow-lg transition-all text-sm"
                    >
                      Agendar Consulta →
                    </a>

                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setResult(null);
                        setBusinessDesc('');
                      }}
                      className="w-full py-2 border-2 border-nexia-blue border-opacity-30 text-nexia-blue font-bold rounded-lg hover:border-opacity-100 transition-all text-sm"
                    >
                      Analizar otro negocio
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
