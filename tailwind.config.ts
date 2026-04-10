import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - LIGHT PREMIUM
        'nexia-blue': '#0057FF',         // Electric blue (primary)
        'nexia-violet': '#7C3AED',       // Vibrant purple (secondary)
        'nexia-cyan': '#00F5C4',         // Cyan accent
        'nexia-dark-bg': '#FFFFFF',      // White background
        'nexia-mid-bg': '#F5F7FF',       // Ultra light gray-blue
        'nexia-light-bg': '#FFFFFF',     // White (same as dark-bg now)
        'nexia-text': '#0F172A',         // Dark navy text
        'nexia-muted': '#64748B',        // Slate gray
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'hero': ['80px', { lineHeight: '0.95', fontWeight: '800' }],
        'hero-lg': ['100px', { lineHeight: '0.95', fontWeight: '800' }],
        'section-title': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'section-title-md': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
      },
      backgroundImage: {
        'noise': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        'dot-grid': 'radial-gradient(circle, rgba(0, 87, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '32px 32px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 87, 255, 0.5)',
        'glow-blue-lg': '0 0 40px rgba(0, 87, 255, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 245, 196, 0.4)',
        'glow-violet': '0 0 20px rgba(109, 40, 217, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-hover': 'marquee-hover',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-hover': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        counter: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropFilter: {
        glass: 'blur(10px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;
