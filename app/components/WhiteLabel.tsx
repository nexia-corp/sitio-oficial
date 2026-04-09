'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Detectar tipo de negocio por keywords
function detectBusinessType(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('clinic') || lower.includes('dental') || lower.includes('médic') || lower.includes('doctor')) return 'clinica';
  if (lower.includes('inmobil') || lower.includes('propiedad') || lower.includes('casa') || lower.includes('apartamento')) return 'inmobiliaria';
  if (lower.includes('tienda') || lower.includes('ecommerce') || lower.includes('shop') || lower.includes('vendo')) return 'ecommerce';
  if (lower.includes('restaurant') || lower.includes('restaurante') || lower.includes('comida') || lower.includes('café')) return 'restaurante';
  if (lower.includes('service') || lower.includes('consultor') || lower.includes('agencia')) return 'servicios';
  if (lower.includes('gym') || lower.includes('fitness') || lower.includes('entrena')) return 'gym';
  if (lower.includes('salón') || lower.includes('barbería') || lower.includes('peluquería')) return 'belleza';

  return 'general';
}

// Respuestas dinámicas según tipo de negocio
function getBusinessResponses(type: string) {
  const responses: Record<string, Record<string, string>> = {
    clinica: {
      'agendar': '📅 Perfecto. Tenemos disponibilidad mañana a las 10am, 2pm y 4pm. ¿Cuál prefieres?',
      'precio': '💰 Nuestros servicios varían. Consulta básica: $50. Tratamientos especializados: $100-$300.',
      'dolor': '😟 Es importante atenderlo pronto. ¿Puedes venir hoy? Tenemos disponibilidad.',
      'horario': '⏰ Atendemos de lunes a viernes 9am-7pm, sábados 9am-2pm.',
      'emergencia': '🚨 Aceptamos emergencias. Llamanos al 9XX-XXXX.',
      'doctor': '👨‍⚕️ Contamos con especialistas certificados. ¿Cuál necesitas?',
    },
    inmobiliaria: {
      'casa': '🏡 Tenemos excelentes opciones. ¿Cuál es tu presupuesto y zona preferida?',
      'departamento': '🏢 Ofrecemos desde 1 a 4 dormitorios. ¿Qué zona buscas?',
      'precio': '💰 Rango: $150k-$800k. Depende la zona y características.',
      'financiamiento': '💳 Trabajamos con principales bancos. Desde 20% de entrada.',
      'zona': '📍 Operamos en todas las zonas premium. ¿Cuál te interesa?',
      'inversión': '📈 Excelentes oportunidades de inversión. Te muestro opciones.',
    },
    ecommerce: {
      'comprar': '🛍️ Tenemos variedad de productos. ¿Qué buscas?',
      'precio': '💰 Precios competitivos. Desde $10 hasta $500+',
      'envío': '🚚 Envío gratis desde $50. Entregamos en 2-3 días hábiles.',
      'pago': '💳 Aceptamos: tarjeta, transferencia y billetera virtual.',
      'devolución': '↩️ Si no te gusta, devuelves en 30 días sin problemas.',
      'promoción': '🎉 Tenemos descuentos semanales. ¿Quieres ver ofertas?',
    },
    restaurante: {
      'reservar': '📅 ¿Para cuántas personas y a qué hora? Hoy tenemos disponibilidad.',
      'delivery': '🚗 Sí, hacemos delivery. Mínimo $30, entrega en 30-45 min.',
      'menu': '📋 Ofrecemos variedad: carnes, pastas, pescados y vegetarianos.',
      'precio': '💰 Platos: $15-$28. Entradas: $8-$12. Postres: $5-$8.',
      'especial': '👨‍🍳 Hoy tenemos especial en bife de costilla. ¿Te interesa?',
      'horario': '⏰ Abierto de lunes a domingo, 11am a 11pm.',
    },
    servicios: {
      'contratar': '✅ Estaré feliz de ayudarte. ¿Cuál es tu proyecto?',
      'precio': '💰 Ofrecemos paquetes desde $500 en adelante. Depende el alcance.',
      'tiempo': '⏱️ La mayoría de proyectos se entregan en 2-4 semanas.',
      'equipo': '👥 Contamos con equipo profesional especializado.',
      'portfolio': '🎨 Tengo trabajos anteriores exitosos. ¿Quieres verlos?',
      'consulta': '💬 Primera consulta es gratis. Hablamos de tu necesidad.',
    },
    gym: {
      'membresía': '💪 Membresía básica $50/mes, Premium $80/mes con entrenador.',
      'clases': '🏋️ Tenemos clases de: yoga, spinning, zumba, crossfit.',
      'entrenador': '👨‍🏫 Entrenadores personales disponibles. $20/sesión.',
      'horario': '⏰ Abierto: 6am-10pm lunes a viernes, 8am-6pm fines de semana.',
      'equipo': '🏋️‍♀️ Equipos de última generación y área cardio completa.',
      'prueba': '🆓 Primera clase gratis. ¿Quieres probar hoy?',
    },
    belleza: {
      'corte': '✂️ Corte: $20-$40 según estilo. Agendar online.',
      'coloración': '🎨 Coloración desde $50. Con especialista certificado.',
      'manicure': '💅 Manicure clásico: $15, gel: $25, diseño: +$10.',
      'facial': '💆‍♀️ Faciales según tu tipo de piel. Desde $40.',
      'hora': '⏰ Abierto martes a sábado, 9am-7pm. Domingos 10am-4pm.',
      'agendar': '📅 Reserva online o llámanos. Tenemos disponibilidad hoy.',
    },
    general: {
      'hola': '¡Hola! Bienvenido. ¿En qué podemos ayudarte?',
      'precio': '💰 Nuestros precios son muy competitivos. ¿Qué servicio te interesa?',
      'info': 'ℹ️ Cuéntame más sobre lo que necesitas.',
      'agendar': '📅 Con gusto te agendamos. ¿Qué día prefieres?',
      'horario': '⏰ Disponibles para atenderte. ¿Cuándo te viene bien?',
    }
  };

  return responses[type] || responses.general;
}

// Datos de negocio por tipo
function getBusinessData(type: string, businessName: string) {
  const icons: Record<string, string> = {
    clinica: '🏥',
    inmobiliaria: '🏠',
    ecommerce: '🛒',
    restaurante: '🍽️',
    servicios: '💼',
    gym: '💪',
    belleza: '💇‍♀️',
    general: '🎯',
  };

  const colors: Record<string, string> = {
    clinica: 'from-blue-500 to-blue-600',
    inmobiliaria: 'from-emerald-500 to-emerald-600',
    ecommerce: 'from-purple-500 to-purple-600',
    restaurante: 'from-orange-500 to-orange-600',
    servicios: 'from-indigo-500 to-indigo-600',
    gym: 'from-red-500 to-red-600',
    belleza: 'from-pink-500 to-pink-600',
    general: 'from-cyan-500 to-cyan-600',
  };

  const metrics: Record<string, { m1: string; m1v: string; m2: string; m2v: string; m3: string; m3v: string }> = {
    clinica: { m1: 'Agendamientos', m1v: '+70%', m2: 'Tiempo respuesta', m2v: '<30seg', m3: 'Satisfacción', m3v: '4.8★' },
    inmobiliaria: { m1: 'Leads calificados', m1v: '+45%', m2: 'Tiempo atención', m2v: '<1min', m3: 'Conversión', m3v: '+35%' },
    ecommerce: { m1: 'Conversión', m1v: '+60%', m2: 'Tickets resueltos', m2v: '+85%', m3: 'Devoluciones', m3v: '-40%' },
    restaurante: { m1: 'Reservas', m1v: '+52%', m2: 'No-shows', m2v: '-65%', m3: 'Satisfacción', m3v: '4.9★' },
    servicios: { m1: 'Clientes nuevos', m1v: '+80%', m2: 'Consultas', m2v: '+150%', m3: 'Contrataciones', m3v: '+65%' },
    gym: { m1: 'Membresías', m1v: '+85%', m2: 'Retención', m2v: '+45%', m3: 'Clase/semana', m3v: '+120%' },
    belleza: { m1: 'Clientes recurrentes', m1v: '+90%', m2: 'Agenda llena', m2v: '+100%', m3: 'Satisfacción', m3v: '4.9★' },
    general: { m1: 'Conversión', m1v: '+65%', m2: 'Consultas', m2v: '+100%', m3: 'Satisfacción', m3v: '4.8★' },
  };

  return {
    icon: icons[type] || icons.general,
    color: colors[type] || colors.general,
    metrics: metrics[type] || metrics.general,
  };
}

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

export function WhiteLabel() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerateLanding = () => {
    if (!businessName.trim()) return;

    const detectedType = detectBusinessType(businessName);
    setBusinessType(detectedType);
    setIsGenerated(true);

    const greeting = `¡Hola! 👋 Bienvenido a ${businessName}. ¿En qué podemos ayudarte?`;
    setMessages([{ type: 'bot', text: greeting }]);
    setInputValue('');
  };

  const findBestResponse = (userText: string): string => {
    if (!businessType) return 'Por favor primero genera tu landing.';

    const responses = getBusinessResponses(businessType);
    const lowerText = userText.toLowerCase();

    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) {
        return response;
      }
    }

    return '🤔 Interesante. Te conectaré con un especialista para más detalles. ¿Tu WhatsApp?';
  };

  const getSuggestedQuestions = (): string[] => {
    const suggestions: Record<string, string[]> = {
      clinica: ['Quiero agendar cita', '¿Cuál es el precio?', '¿Cuál es el horario?'],
      inmobiliaria: ['Tengo presupuesto de...', '¿Financiamiento?', '¿Qué zonas cubren?'],
      ecommerce: ['¿Cómo comprar?', '¿Hacen envío?', '¿Cuál es el costo?'],
      restaurante: ['Quiero reservar', '¿Hacen delivery?', '¿Cuál es el menú?'],
      servicios: ['Quiero contratar', '¿Cuánto cuesta?', '¿Cuánto tiempo toma?'],
      gym: ['¿Cuánto cuesta la membresía?', '¿Qué clases tienen?', '¿Hay entrenador?'],
      belleza: ['Quiero agendar', '¿Cuánto cuesta?', '¿Qué servicios ofrecen?'],
      general: ['Hola', '¿Cómo funciona?', '¿Tienes disponibilidad?'],
    };

    return suggestions[businessType] || suggestions.general;
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = { type: 'user', text };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simula delay de escritura del bot
    setTimeout(() => {
      const botResponse = findBestResponse(text);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const businessData = getBusinessData(businessType, businessName);

  return (
    <section
      id="whitelabel"
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
            Demo Personalizada
          </p>
          <h2 className="font-syne font-700 text-section-title-md md:text-section-title text-white leading-tight mb-4">
            Ve tu negocio automatizado
          </h2>
          <p className="text-nexia-muted max-w-2xl mx-auto">
            Escribe el nombre de tu negocio y ve cómo funciona el agente IA en tiempo real.
          </p>
        </motion.div>

        {/* Input Section */}
        {!isGenerated && (
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-xl p-8 border border-nexia-blue border-opacity-30">
              <label className="block text-sm font-semibold text-white mb-4">
                ¿Cuál es el nombre y tipo de tu negocio?
              </label>
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerateLanding()}
                  placeholder="Ej: Mi Clínica Dental, TiendaMax, Restaurante La Cocina..."
                  className="flex-1 px-4 py-3 bg-nexia-mid-bg border border-nexia-blue border-opacity-30 rounded-lg text-white placeholder-nexia-muted focus:outline-none focus:border-opacity-100 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerateLanding}
                  disabled={!businessName.trim()}
                  className="px-8 py-3 bg-nexia-blue text-white font-semibold rounded-lg hover:shadow-glow-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generar
                </motion.button>
              </div>
              <p className="text-xs text-nexia-muted">
                💡 Tip: Escribe naturalmente. Ej: "Clínica", "Tienda online", "Restaurante", "Salón de belleza"
              </p>
            </div>
          </motion.div>
        )}

        {/* Demo Area */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Landing Preview - REAL SIMULADA */}
              <div className="rounded-xl overflow-hidden border border-nexia-blue border-opacity-30 bg-gradient-to-b from-slate-900 to-slate-800 h-full flex flex-col">
                {/* URL Bar Simulada */}
                <div className="bg-slate-950 px-4 py-3 border-b border-nexia-blue border-opacity-20 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 ml-4 text-xs text-nexia-muted font-mono">
                    {businessName.toLowerCase().replace(/\s+/g, '')}.com
                  </div>
                </div>

                {/* Landing Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Hero Section */}
                  <div className="text-center mb-6">
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${businessData.color} text-white text-xs font-bold mb-3`}>
                      {businessData.icon} {businessName}
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                      {businessName}
                    </h1>
                    <p className="text-sm text-gray-300 mb-4">
                      Somos tu mejor opción. Disponibles 24/7 para ti.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`w-full py-3 bg-gradient-to-r ${businessData.color} text-white font-bold rounded-lg text-sm`}
                  >
                    💬 Consulta Ahora
                  </motion.button>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-nexia-cyan">✓</span> Respuesta inmediata
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-nexia-cyan">✓</span> Disponible siempre
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-nexia-cyan">✓</span> Sin tiempos de espera
                    </div>
                  </div>

                  {/* Form */}
                  <div className="bg-slate-950 rounded-lg p-3 space-y-2 border border-nexia-blue border-opacity-20">
                    <input
                      type="text"
                      placeholder="Tu nombre..."
                      className="w-full px-3 py-2 bg-slate-900 border border-gray-600 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-nexia-cyan"
                      readOnly
                    />
                    <input
                      type="email"
                      placeholder="Tu email..."
                      className="w-full px-3 py-2 bg-slate-900 border border-gray-600 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-nexia-cyan"
                      readOnly
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className={`w-full py-2 bg-gradient-to-r ${businessData.color} text-white font-bold rounded text-xs`}
                    >
                      Enviar
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-slate-950 border border-nexia-blue border-opacity-20 rounded p-2 text-center">
                      <p className="text-nexia-cyan font-bold text-sm">
                        {businessData.metrics.m1v}
                      </p>
                      <p className="text-xs text-gray-400">
                        {businessData.metrics.m1}
                      </p>
                    </div>
                    <div className="bg-slate-950 border border-nexia-blue border-opacity-20 rounded p-2 text-center">
                      <p className="text-nexia-cyan font-bold text-sm">
                        {businessData.metrics.m2v}
                      </p>
                      <p className="text-xs text-gray-400">
                        {businessData.metrics.m2}
                      </p>
                    </div>
                    <div className="bg-slate-950 border border-nexia-blue border-opacity-20 rounded p-2 text-center">
                      <p className="text-nexia-cyan font-bold text-sm">
                        {businessData.metrics.m3v}
                      </p>
                      <p className="text-xs text-gray-400">
                        {businessData.metrics.m3}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-slate-950 border border-nexia-blue border-opacity-20 rounded p-3 text-center">
                    <p className="text-xs text-gray-300 italic mb-2">
                      "El mejor servicio que existe"
                    </p>
                    <p className="text-xs text-nexia-cyan font-semibold">
                      ⭐⭐⭐⭐⭐ Cliente verificado
                    </p>
                  </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-nexia-blue border-opacity-20 px-6 py-3 bg-slate-950">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsGenerated(false)}
                    className="w-full py-2 bg-nexia-blue text-white font-semibold rounded text-xs hover:shadow-glow-blue transition-all"
                  >
                    Probar otro negocio ↻
                  </motion.button>
                </div>
              </div>

          {/* Chat Demo */}
          <div className="glass rounded-xl p-6 border border-nexia-blue border-opacity-30 flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-[400px]">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                        msg.type === 'user'
                          ? 'bg-nexia-blue text-white rounded-br-none'
                          : 'bg-nexia-mid-bg text-nexia-text border border-nexia-blue border-opacity-30 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-1"
                  >
                    <div className="w-2 h-2 bg-nexia-cyan rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-nexia-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-nexia-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && !isTyping && (
                <div className="mb-4 space-y-2">
                  <p className="text-xs text-nexia-muted uppercase tracking-widest font-semibold">
                    Prueba estas preguntas:
                  </p>
                  {getSuggestedQuestions().map((q, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(q)}
                      whileHover={{ x: 5 }}
                      className="w-full text-left px-3 py-2 text-sm bg-nexia-mid-bg border border-nexia-blue border-opacity-20 rounded hover:border-opacity-100 text-nexia-text hover:text-white transition-all"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2 bg-nexia-mid-bg border border-nexia-blue border-opacity-30 rounded-lg text-white placeholder-nexia-muted focus:outline-none focus:border-opacity-100 transition-all"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !inputValue.trim()}
                  className="px-4 py-2 bg-nexia-cyan text-nexia-dark-bg font-semibold rounded-lg hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              className="text-center mt-12 p-8 glass rounded-xl border border-nexia-blue border-opacity-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-nexia-muted mb-4">
                ¿Te gustaría ver esto funcionando con tu negocio?
              </p>
              <motion.a
                href="https://wa.me/593XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 bg-nexia-blue text-white font-semibold rounded-lg hover:shadow-glow-blue transition-all"
              >
                Agendar demo personalizada →
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
