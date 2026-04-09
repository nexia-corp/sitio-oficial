'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

interface BusinessExample {
  id: string;
  name: string;
  business: string;
  icon: string;
  color: string;
  description: string;
  defaultMessages: ChatMessage[];
  suggestedQuestions: string[];
  responses: Record<string, string>;
  results: {
    metric1: string;
    metric1Value: string;
    metric2: string;
    metric2Value: string;
    metric3: string;
    metric3Value: string;
  };
}

const businesses: BusinessExample[] = [
  {
    id: 'clinica',
    name: 'Clínica Sonrisa',
    business: 'Clínica Dental',
    icon: '🦷',
    color: 'from-blue-500 to-blue-600',
    description: 'Ejemplo de clínica dental con agente IA',
    defaultMessages: [
      { type: 'bot', text: '¡Hola! 👋 Bienvenido a Clínica Sonrisa. ¿En qué podemos ayudarte hoy?' }
    ],
    suggestedQuestions: [
      'Quiero agendar una cita',
      '¿Cuál es el precio de una limpieza?',
      'Tengo dolor de muelas'
    ],
    responses: {
      'agendar': '📅 Perfecto. Tenemos disponibilidad mañana a las 10am, 2pm y 4pm. ¿Cuál prefieres?',
      'precio': '💰 Una limpieza profesional cuesta $80. Incluye evaluación + fluoruro.',
      'dolor': '😟 Lo siento. Es importante atenderlo pronto. ¿Puedes venir hoy a las 5pm? Tenemos una cita disponible.',
      'dentista': '👨‍⚕️ Contamos con 3 dentistas especializados. ¿Tienes preferencia?',
      'horario': '⏰ Atendemos de lunes a viernes 9am-7pm, sábados 9am-2pm.',
    },
    results: {
      metric1: 'Agendamientos',
      metric1Value: '+70%',
      metric2: 'Tiempo respuesta',
      metric2Value: '<30seg',
      metric3: 'Satisfacción',
      metric3Value: '4.8★',
    }
  },
  {
    id: 'inmobiliaria',
    name: 'Propiedades Plus',
    business: 'Inmobiliaria',
    icon: '🏠',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Ejemplo de inmobiliaria con calificación automática',
    defaultMessages: [
      { type: 'bot', text: '¡Hola! 🏡 Bienvenido a Propiedades Plus. ¿Qué tipo de propiedad buscas?' }
    ],
    suggestedQuestions: [
      'Casa en zona norte',
      'Departamento 2 dormitorios',
      '¿Ofrecen financiamiento?'
    ],
    responses: {
      'casa': '🏡 Tenemos 15 casas disponibles. ¿Cuál es tu presupuesto? De $150k a $500k+',
      'departamento': '🏢 Excelente. Ofrecemos 8 opciones de 2-3 dormitorios. ¿Zona preferida?',
      'zona norte': '📍 Tenemos 5 propiedades en zona norte. Calidad premium, buena inversión.',
      'financiamiento': '💳 Sí, trabajamos con los principales bancos. Desde 20% de entrada.',
      'precio': '💰 Depende la propiedad. Rango: $150k-$800k. ¿Tu presupuesto?',
    },
    results: {
      metric1: 'Leads calificados',
      metric1Value: '+45%',
      metric2: 'Tiempo atención',
      metric2Value: '<1min',
      metric3: 'Conversión',
      metric3Value: '+35%',
    }
  },
  {
    id: 'ecommerce',
    name: 'TiendaMax',
    business: 'E-commerce',
    icon: '🛒',
    color: 'from-purple-500 to-purple-600',
    description: 'Ejemplo de tienda online con soporte 24/7',
    defaultMessages: [
      { type: 'bot', text: '¡Hola! 🛍️ Bienvenido a TiendaMax. ¿Necesitas ayuda con algo?' }
    ],
    suggestedQuestions: [
      'Cómo hago un pedido',
      '¿Hacen envío a mi ciudad?',
      'Dónde está mi pedido?'
    ],
    responses: {
      'pedido': '📦 Es muy fácil. Agrega productos al carrito → Checkout → Paga. Listo, 3 pasos.',
      'envío': '🚚 Sí claro. Envío gratis desde $50. A cualquier ciudad del país en 2-3 días.',
      'donde esta': '📍 Dame tu número de pedido y te muestro el estado en tiempo real.',
      'costo': '💰 Los envíos cuestan $15. Gratis con compras mayores a $50.',
      'pago': '💳 Aceptamos tarjeta, transferencia y billetera virtual. 100% seguro.',
    },
    results: {
      metric1: 'Conversión',
      metric1Value: '+60%',
      metric2: 'Tickets resueltos',
      metric2Value: '+85%',
      metric3: 'Devoluciones',
      metric3Value: '-40%',
    }
  },
  {
    id: 'restaurante',
    name: 'Sabores Express',
    business: 'Restaurante',
    icon: '🍽️',
    color: 'from-orange-500 to-orange-600',
    description: 'Ejemplo de restaurante con reservas automatizadas',
    defaultMessages: [
      { type: 'bot', text: '¡Hola! 👨‍🍳 Bienvenido a Sabores Express. ¿Reservas o delivery?' }
    ],
    suggestedQuestions: [
      'Quiero reservar una mesa',
      '¿Hacen delivery?',
      'Cuál es el menú del día?'
    ],
    responses: {
      'reservar': '📅 Perfecto. ¿Para cuántas personas y a qué hora? Hoy tenemos disponibilidad de 6pm a 10pm.',
      'delivery': '🚗 Sí, tenemos delivery. Mínimo $30. Entregamos en 30-45 min. ¿Qué deseas ordenar?',
      'menu': '📋 Hoy ofrecemos: Milanesa con papas, Pasta a la boloñesa, Salmón a la mantequilla, Bife de costilla.',
      'precio': '💰 Platos principales: $15-$28. Entradas: $8-$12. Postres: $5-$8.',
      'espera': '⏰ En este momento hay 15 min de espera. ¿Deseas esperar o prefieres reservar para otra hora?',
    },
    results: {
      metric1: 'Reservas',
      metric1Value: '+52%',
      metric2: 'No-shows',
      metric2Value: '-65%',
      metric3: 'Satisfacción',
      metric3Value: '4.9★',
    }
  }
];

export function WhiteLabel() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedBusiness, setSelectedBusiness] = useState<BusinessExample>(businesses[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(selectedBusiness.defaultMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBusinessChange = (business: BusinessExample) => {
    setSelectedBusiness(business);
    setMessages(business.defaultMessages);
    setInputValue('');
  };

  const findBestResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    for (const [key, response] of Object.entries(selectedBusiness.responses)) {
      if (lowerText.includes(key)) {
        return response;
      }
    }

    return '🤔 Interesante pregunta. Te conectaré con un asesor para más detalles. ¿Tu WhatsApp?';
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
            Demo Interactiva
          </p>
          <h2 className="font-syne font-700 text-section-title-md md:text-section-title text-white leading-tight mb-4">
            Ve tu negocio automatizado
          </h2>
          <p className="text-nexia-muted max-w-2xl mx-auto">
            Selecciona tu tipo de negocio y prueba cómo funciona el agente IA en tiempo real.
          </p>
        </motion.div>

        {/* Business Selection */}
        <motion.div
          className="mb-12 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {businesses.map((business) => (
            <motion.button
              key={business.id}
              onClick={() => handleBusinessChange(business)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedBusiness.id === business.id
                  ? `bg-gradient-to-r ${business.color} text-white shadow-glow-blue`
                  : 'glass text-nexia-muted hover:text-white border border-nexia-blue border-opacity-30'
              }`}
            >
              <span className="mr-2">{business.icon}</span>
              {business.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Area */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Landing Preview */}
          <div className="glass rounded-xl p-6 border border-nexia-blue border-opacity-30">
            <div className="mb-4">
              <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${selectedBusiness.color} text-white text-sm font-semibold mb-3`}>
                {selectedBusiness.icon} {selectedBusiness.business}
              </div>
              <h3 className="text-2xl font-syne font-700 text-white mb-2">
                {selectedBusiness.name}
              </h3>
              <p className="text-sm text-nexia-muted">
                {selectedBusiness.description}
              </p>
            </div>

            {/* Mock Landing */}
            <div className="bg-nexia-dark-bg border border-nexia-blue border-opacity-20 rounded-lg p-4 mb-6 min-h-[300px] flex flex-col">
              <div className="mb-4">
                <h4 className="text-white font-bold mb-2">Landing de {selectedBusiness.name}</h4>
                <p className="text-xs text-nexia-muted">
                  ✓ Optimizada para conversión<br/>
                  ✓ Integrada con agente IA<br/>
                  ✓ Responsive en móvil
                </p>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-2 mt-auto">
                <div className="bg-nexia-blue bg-opacity-10 border border-nexia-cyan border-opacity-30 rounded p-3 text-center">
                  <p className="text-nexia-cyan font-bold text-lg">
                    {selectedBusiness.results.metric1Value}
                  </p>
                  <p className="text-xs text-nexia-muted">
                    {selectedBusiness.results.metric1}
                  </p>
                </div>
                <div className="bg-nexia-blue bg-opacity-10 border border-nexia-cyan border-opacity-30 rounded p-3 text-center">
                  <p className="text-nexia-cyan font-bold text-lg">
                    {selectedBusiness.results.metric2Value}
                  </p>
                  <p className="text-xs text-nexia-muted">
                    {selectedBusiness.results.metric2}
                  </p>
                </div>
                <div className="bg-nexia-blue bg-opacity-10 border border-nexia-cyan border-opacity-30 rounded p-3 text-center">
                  <p className="text-nexia-cyan font-bold text-lg">
                    {selectedBusiness.results.metric3Value}
                  </p>
                  <p className="text-xs text-nexia-muted">
                    {selectedBusiness.results.metric3}
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-nexia-blue text-white font-semibold rounded-lg hover:shadow-glow-blue transition-all"
            >
              Implementar para mi negocio →
            </motion.button>
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
                {selectedBusiness.suggestedQuestions.map((q, idx) => (
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

        {/* CTA */}
        <motion.div
          className="text-center mt-12 p-8 glass rounded-xl border border-nexia-blue border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
      </div>
    </section>
  );
}
