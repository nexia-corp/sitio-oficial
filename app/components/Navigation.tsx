'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-nexia-blue border-opacity-30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-nexia-blue rounded" />
          <span className="text-xl font-bold font-syne tracking-tight text-white">
            NEXIA
          </span>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#servicios" className="text-nexia-muted hover:text-white transition">
            Servicios
          </a>
          <a href="#proceso" className="text-nexia-muted hover:text-white transition">
            Proceso
          </a>
          <a href="#precios" className="text-nexia-muted hover:text-white transition">
            Precios
          </a>
          <a href="#contacto" className="text-nexia-muted hover:text-white transition">
            Contacto
          </a>
        </div>

        {/* CTA Button */}
        <motion.a
          href="https://wa.me/593XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-5 py-2 border border-nexia-blue text-nexia-blue text-sm font-medium rounded-lg hover:glow-blue transition-all duration-300"
        >
          Agenda llamada →
        </motion.a>

        {/* Mobile Menu Button */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-nexia-blue text-nexia-blue">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
