'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-nexia-blue border-opacity-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-nexia-blue border-opacity-10">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-nexia-blue rounded" />
              <span className="text-xl font-bold font-syne tracking-tight text-nexia-text">
                NEXIA
              </span>
            </div>
            <p className="text-sm text-nexia-muted leading-relaxed">
              Tu negocio, en piloto automático.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-start gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-nexia-text mb-4">
                Compañía
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#servicios"
                    className="text-sm text-nexia-muted hover:text-nexia-text transition"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#precios"
                    className="text-sm text-nexia-muted hover:text-nexia-text transition"
                  >
                    Precios
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-sm text-nexia-muted hover:text-nexia-text transition"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-nexia-muted hover:text-nexia-text transition"
                  >
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-end md:items-start">
            <a
              href="mailto:hola@nexia-corp.com"
              className="text-sm font-medium text-nexia-cyan hover:text-nexia-text transition mb-6"
            >
              hola@nexia-corp.com
            </a>
            <motion.a
              href="https://instagram.com/nexia_corp"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="w-10 h-10 rounded-full bg-nexia-blue bg-opacity-10 border border-nexia-blue border-opacity-30 flex items-center justify-center text-nexia-cyan hover:text-nexia-text transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 15.892c-1.002 1.541-2.67 2.512-4.564 2.512-3.037 0-5.5-2.464-5.5-5.5s2.463-5.5 5.5-5.5c1.894 0 3.562.971 4.564 2.512.397-.593.664-1.29.664-2.047 0-2.24-1.82-4.06-4.06-4.06-2.237 0-4.06 1.82-4.06 4.06 0 .756.267 1.454.664 2.047-.397-.593-.664-1.29-.664-2.047 0-2.24 1.82-4.06 4.06-4.06 2.24 0 4.06 1.82 4.06 4.06 0 .756-.267 1.454-.664 2.047z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-nexia-muted">
          <p>© 2025 Nexia Corp · Ecuador · LATAM</p>
        </div>
      </div>
    </footer>
  );
}
