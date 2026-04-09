# Nexia Corp - Landing Page

A production-ready single-page website for Nexia Corp, an AI automation company targeting Latin American businesses.

## 🎨 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom brand color palette
- **Framer Motion** animations
- **Responsive Design** (mobile-first)
- **Custom Cursor** with spring physics
- **Glass Morphism** UI elements
- **Animated Counters** and transitions
- **SEO Optimized** with meta tags
- **Dark Tech Premium** aesthetic

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd "Nexia Corp"
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your details:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX
NEXT_PUBLIC_EMAIL=hola@nexia-corp.com
```

5. Run development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Hostinger
1. Build the project: `npm run build`
2. Push to git repository
3. Connect repository in Hostinger Git Integration
4. Configure build settings:
   - Build command: `npm run build`
   - Start command: `npm start`
   - Node version: 18+

## 🎯 Project Structure

```
app/
├── components/           # All page components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── ...
├── globals.css          # Global styles & animations
├── layout.tsx           # Root layout
├── page.tsx             # Home page
└── ...
```

## 🎨 Brand Colors

- **Primary Blue**: `#0057FF`
- **Secondary Violet**: `#6D28D9`
- **Accent Cyan**: `#00F5C4`
- **Dark Background**: `#05070F`
- **Light Background**: `#F8FAFF`
- **Text**: `#E8EEFF`
- **Muted**: `#6B7A99`

## 📱 Sections

1. **Navigation** - Fixed header with logo and CTA
2. **Hero** - Full-screen with animated gradient, mesh backgrounds, and marquee
3. **Tech Logos** - Infinite carousel of technologies
4. **Problem** - Statement section with left borders
5. **Services** - 3 glass cards with pricing
6. **Process** - 4-step timeline
7. **Stats** - Animated counters
8. **Testimonials** - Client quotes
9. **Pricing** - 3 pricing tiers
10. **FAQ** - Accordion with 5 questions
11. **Final CTA** - Call to action section
12. **Footer** - Links and contact info

## 🎬 Animations

- Framer Motion for scroll animations
- CSS keyframes for continuous effects
- Custom cursor with spring physics
- Floating orbs and mesh gradients
- Staggered element animations
- Hover effects on all interactive elements

## 🔗 Important Links

- **WhatsApp**: Update number in components and `.env.local`
- **Email**: hola@nexia-corp.com
- **Website**: nexia-corp.com

## 📝 Customization

### Change WhatsApp Number
1. Update `.env.local`: `NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX`
2. Update in component files where `https://wa.me/` links are used

### Change Brand Colors
Edit `tailwind.config.ts` to update brand colors

### Change Typography
Fonts are imported from Google Fonts in `app/layout.tsx`:
- Syne (headings)
- DM Sans (body)

## 🚀 Performance Tips

- Images are lazy-loaded
- Fonts are optimized with `next/font`
- CSS is tree-shaken by Tailwind
- No unused dependencies

## 📄 License

All rights reserved © 2025 Nexia Corp

## 🤝 Support

For questions or support, contact: hola@nexia-corp.com
