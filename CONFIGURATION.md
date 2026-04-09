# Configuration Guide - Nexia Corp

Quick reference for all customizable settings.

## 🔧 Main Configuration File

Create `.env.local` with:
```env
# WhatsApp Business Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX

# Contact Email
NEXT_PUBLIC_EMAIL=hola@nexia-corp.com

# Website Domain
NEXT_PUBLIC_DOMAIN=nexia-corp.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=
```

## 🎨 Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'nexia-blue': '#0057FF',         // Primary - All CTAs
  'nexia-violet': '#6D28D9',       // Secondary - Accents
  'nexia-cyan': '#00F5C4',         // Accent - Highlights
  'nexia-dark-bg': '#05070F',      // Dark background
  'nexia-mid-bg': '#0D1117',       // Mid-tone background
  'nexia-light-bg': '#F8FAFF',     // Light sections
  'nexia-text': '#E8EEFF',         // Primary text
  'nexia-muted': '#6B7A99',        // Secondary text
}
```

## 📝 Typography

Edit `app/layout.tsx`:

```typescript
import { Syne, DM_Sans } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});
```

### Change Fonts

To use different Google Fonts:

1. Visit [fonts.google.com](https://fonts.google.com)
2. Find your font family
3. Import the font in `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  weight: ['700', '800'], // Choose weights
  variable: '--font-your-font',
});
```

4. Add to body className

## 📱 Content Changes

### Navigation Links
Edit `app/components/Navigation.tsx`:
```typescript
<a href="#servicios">Servicios</a>
<a href="#proceso">Proceso</a>
<a href="#precios">Precios</a>
<a href="#contacto">Contacto</a>
```

### Hero Section
Edit `app/components/Hero.tsx`:
- Badge text: `Automatización con IA · Ecuador → LATAM`
- Headline: `Tu negocio, en piloto automático.`
- Subtitle: `Construimos sistemas de IA...`
- Button texts and links

### Services
Edit `app/components/Services.tsx`:
```typescript
const services = [
  {
    title: 'Agente WhatsApp IA',
    description: 'Atiende, califica y agenda...',
    price: 'Desde $499',
    tag: 'Más solicitado',
    icon: '💬',
  },
  // ...
];
```

### Process Steps
Edit `app/components/Process.tsx`:
```typescript
const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: '30 minutos para entender...',
  },
  // ...
];
```

### Stats
Edit `app/components/Stats.tsx`:
```typescript
const stats = [
  { value: 10, label: 'Negocios automatizados', suffix: '+' },
  { value: 7, label: 'Días de implementación', suffix: '' },
  { value: 24, label: 'Horas de atención', suffix: '/7' },
  { value: 0, label: 'Conocimientos técnicos', suffix: '' },
];
```

### Testimonials
Edit `app/components/Testimonials.tsx`:
```typescript
const testimonials = [
  {
    quote: 'El agente agenda el 70% de las citas...',
    author: 'Dr. Carlos M.',
    business: 'Clínica Dental',
    initials: 'CM',
  },
  // ...
];
```

### Pricing Plans
Edit `app/components/Pricing.tsx`:
```typescript
const plans = [
  {
    name: 'Landing IA',
    price: '$399',
    features: [
      'Landing profesional',
      'Formulario inteligente',
      // ...
    ],
  },
  // ...
];
```

### FAQ Questions
Edit `app/components/FAQ.tsx`:
```typescript
const faqs = [
  {
    question: '¿Cuánto tiempo tarda?',
    answer: 'Entre 5 y 7 días hábiles...',
  },
  // ...
];
```

### Footer
Edit `app/components/Footer.tsx`:
- Logo text
- Navigation links
- Contact email
- Instagram handle

## 🔗 Social Links

### WhatsApp
Currently uses placeholder: `593XXXXXXXXX`

Update in:
1. `.env.local`: `NEXT_PUBLIC_WHATSAPP_NUMBER`
2. Links automatically use this number

### Instagram
Edit `app/components/Footer.tsx`:
```typescript
<a href="https://instagram.com/nexia_corp">
  {/* Instagram icon */}
</a>
```

Replace `nexia_corp` with your handle.

## 🌐 SEO Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Nexia Corp - Tu negocio, en piloto automático',
  description: 'Sistemas de IA que atienden...',
  keywords: 'IA, automatización, WhatsApp bot...',
  metadataBase: new URL('https://nexia-corp.com'),
  openGraph: {
    title: 'Nexia Corp - Tu negocio, en piloto automático',
    description: 'Sistemas de IA...',
    url: 'https://nexia-corp.com',
    // ...
  },
  twitter: {
    creator: '@nexia_corp', // Update Twitter handle
  },
};
```

## 🎬 Animation Settings

### Animation Speed
Edit in component files:
```typescript
transition={{ duration: 0.6 }} // Change 0.6 to your value
```

Values:
- 0.3s - Quick
- 0.6s - Default
- 0.8s - Slow
- 1.0s+ - Very slow

### Stagger Delay
Edit in component files:
```typescript
transition={{
  staggerChildren: 0.2, // Change gap between animations
}}
```

### Scroll Trigger
Edit `react-intersection-observer` threshold:
```typescript
const { ref, inView } = useInView({
  threshold: 0.1, // 0 = top edge, 1 = fully visible, 0.5 = 50%
});
```

## 🖼️ Images & Assets

### Favicon
Replace `public/favicon.ico` with your icon (16x16, 32x32, 64x64).

Generate at: [realfavicongenerator.net](https://realfavicongenerator.net)

### OG Image
Add `public/og-image.png` (1200x630px).

This image appears when sharing on:
- Facebook
- LinkedIn
- Twitter
- WhatsApp

Recommended: Use Canva with 1200x630 template.

### Logo
The logo is created in CSS in `Navigation.tsx`:
```typescript
<div className="w-3 h-3 bg-nexia-blue rounded" /> {/* Blue square */}
<span>NEXIA</span> {/* Text */}
```

To use image logo instead:
```typescript
<Image src="/logo.png" alt="Nexia" width={40} height={40} />
```

## 📊 Analytics (Optional)

### Google Analytics
1. Create Google Analytics property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (starts with `G-`)
3. Add to `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. Install package:
```bash
npm install @react-google-analytics/core
```

5. Add to `app/layout.tsx`:
```typescript
import { useEffect } from 'react';

export default function RootLayout(...) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', process.env.NEXT_PUBLIC_GA_ID);
  }, []);
  
  // ...
}
```

## 🚀 Deployment Configuration

### Vercel Settings
Edit `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_WHATSAPP_NUMBER": "@whatsapp_number",
    "NEXT_PUBLIC_EMAIL": "@email",
    "NEXT_PUBLIC_DOMAIN": "@domain"
  }
}
```

### Hostinger Settings
In Hostinger control panel:
- **Build Script**: `npm run build`
- **Install Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18.x or higher
- **Environment Variables**: Add from `.env.local`

## ✨ Advanced Customization

### Custom Cursor
Edit `app/components/CustomCursor.tsx`:
```typescript
// Adjust ring size
className="w-8 h-8" // Change to w-10 h-10 for larger

// Change color
className="border border-nexia-blue" // Change color
boxShadow: '0 0 15px rgba(0, 87, 255, 0.6)' // Match color
```

### Floating WhatsApp Button
Edit `app/components/FloatingWhatsApp.tsx`:
```typescript
// Position
className="fixed bottom-8 right-8" // Change to bottom-4 left-4, etc.

// Size
className="w-14 h-14" // Change width/height

// Color
className="bg-nexia-cyan" // Change to nexia-blue, etc.
```

### Glassmorphism Effect
Edit `app/globals.css`:
```css
.glass {
  backdrop-filter: blur(10px); /* Increase/decrease blur */
  background: rgba(13, 17, 23, 0.4); /* Adjust opacity */
  border: 1px solid rgba(255, 255, 255, 0.06); /* Border opacity */
}
```

## 🔐 Security Notes

Never commit these files:
- `.env.local` (use `.env.example` instead)
- API keys or secrets
- Personal information

Always:
- Use environment variables for sensitive data
- Enable 2FA on deployment platforms
- Review GitHub branches before merging
- Keep dependencies updated: `npm update`

## 📋 File Locations Reference

| Setting | File | Line |
|---------|------|------|
| Brand colors | `tailwind.config.ts` | colors object |
| Fonts | `app/layout.tsx` | Syne, DM_Sans imports |
| Meta tags | `app/layout.tsx` | metadata export |
| WhatsApp number | `.env.local` | NEXT_PUBLIC_WHATSAPP_NUMBER |
| Hero content | `app/components/Hero.tsx` | h1, subtitle text |
| Services | `app/components/Services.tsx` | services array |
| Pricing | `app/components/Pricing.tsx` | plans array |
| Footer | `app/components/Footer.tsx` | footer content |

---

**Last Updated**: April 8, 2025
**Version**: 1.0.0
