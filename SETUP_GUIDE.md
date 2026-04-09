# Nexia Corp - Complete Setup Guide

Welcome to your production-ready Nexia Corp landing page! This guide walks you through everything from initial setup to deployment.

## 📦 What You Have

A complete, production-ready Next.js 14 website with:
- ✨ 12 fully-designed sections
- 🎬 Smooth Framer Motion animations
- 💎 Glass morphism UI components
- 🎨 Custom brand color system
- 📱 Fully responsive design
- ♿ Accessibility-first approach
- 🚀 Deploy-ready to Vercel/Hostinger
- 🔒 Security headers configured
- 📊 SEO optimized

## 🚀 Getting Started (5 minutes)

### 1. Install Dependencies
```bash
cd "Nexia Corp"
npm install
```

This installs:
- Next.js 14
- React 18.3
- Framer Motion (animations)
- Tailwind CSS (styling)
- TypeScript (type safety)

### 2. Create Environment File
```bash
cp .env.example .env.local
```

Open `.env.local` and update:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX
NEXT_PUBLIC_EMAIL=hola@nexia-corp.com
NEXT_PUBLIC_DOMAIN=nexia-corp.com
```

Replace `593XXXXXXXXX` with your actual WhatsApp number.

### 3. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - done! 🎉

## 📁 Project Structure

```
Nexia Corp/
├── app/
│   ├── components/              # All page components
│   │   ├── Navigation.tsx       # Fixed header with logo & links
│   │   ├── Hero.tsx             # Full-screen hero section
│   │   ├── TechLogos.tsx        # Tech carousel
│   │   ├── ProblemSection.tsx   # Problem statements
│   │   ├── Services.tsx         # 3 service cards
│   │   ├── Process.tsx          # 4-step timeline
│   │   ├── Stats.tsx            # Animated counters
│   │   ├── Testimonials.tsx     # Client quotes
│   │   ├── Pricing.tsx          # 3 pricing plans
│   │   ├── FAQ.tsx              # Accordion
│   │   ├── FinalCTA.tsx         # Call-to-action
│   │   ├── Footer.tsx           # Footer
│   │   ├── CustomCursor.tsx     # Custom cursor
│   │   ├── FloatingWhatsApp.tsx # Floating button
│   │   └── index.ts             # Exports
│   ├── globals.css              # Global styles & animations
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Home page
├── public/
│   ├── favicon.ico              # Website icon
│   ├── robots.txt               # SEO robots
│   └── sitemap.xml              # SEO sitemap
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js config
├── package.json                 # Dependencies
├── README.md                     # Quick reference
├── SETUP_GUIDE.md               # This file
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
└── .gitignore                   # Git ignore rules
```

## 🎨 Customizing Brand

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'nexia-blue': '#0057FF',      // Change primary color
  'nexia-violet': '#6D28D9',    // Change secondary
  'nexia-cyan': '#00F5C4',      // Change accent
  // ... etc
}
```

### Typography
Fonts are loaded in `app/layout.tsx`. Google Fonts currently:
- **Syne** (headings) - bold, geometric
- **DM Sans** (body) - clean, modern

To change: Update the `Syne` and `DM_Sans` imports.

### WhatsApp Number
1. Update `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX
```

2. This number is used in:
   - Navigation button
   - Floating WhatsApp button
   - Final CTA button
   - Footer contact

The code automatically formats the link as `https://wa.me/593XXXXXXXXX`.

### Email Address
Update `.env.local`:
```
NEXT_PUBLIC_EMAIL=your-email@example.com
```

Email appears in:
- Footer contact section
- Used for form integrations later

### Domain
Update `.env.local`:
```
NEXT_PUBLIC_DOMAIN=your-domain.com
```

Also update in `app/layout.tsx`:
```typescript
metadataBase: new URL('https://your-domain.com'),
```

## 🎬 Understanding Animations

### Framer Motion
Most animations use Framer Motion for smooth, performant effects:

```typescript
// Example: fade-in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### InView Animations
Scroll-triggered animations using `react-intersection-observer`:

```typescript
const { ref, inView } = useInView({
  triggerOnce: true,    // Animate only once
  threshold: 0.1,       // Trigger at 10% visible
});

// Content animates when it enters viewport
```

### Custom CSS Animations
Global animations in `app/globals.css`:
- `gradientShift` - Hero mesh gradient animation
- `marquee` - Text scrolling animation
- `float` - Floating orb animation

## 📱 Responsive Design

All components use Tailwind breakpoints:
- **sm**: 640px (tablets)
- **md**: 768px (medium devices)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large screens)

Example:
```typescript
<div className="grid grid-cols-1 md:grid-cols-3">
  {/* 1 column on mobile, 3 on medium+ screens */}
</div>
```

## 🔧 Making Changes

### Add Section
1. Create new component in `app/components/NewSection.tsx`
2. Export in `app/components/index.ts`
3. Import and add to `app/page.tsx`

### Edit Text Content
Find the text in each component and update. Example in `app/components/Services.tsx`:

```typescript
const services = [
  {
    title: 'Your New Title',      // Edit here
    description: 'Your description', // Or here
    price: 'Desde $399',
    icon: '💬',
  },
  // ...
];
```

### Change Colors
Colors are defined in `tailwind.config.ts` and `app/globals.css`:

```typescript
// In tailwind.config.ts
colors: {
  'nexia-blue': '#YOUR_HEX_CODE', // Change color
}

// Then use in components:
className="text-nexia-blue"
```

### Adjust Spacing
All spacing uses Tailwind values. Example: `py-24` = 6rem padding top/bottom.

Tailwind spacing scale: 1-96, 128, 144, 160, 176, 192, 208, 224, 256, 320, 384, 512

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to test production build.

## 🚀 Deployment

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Hostinger
See `DEPLOYMENT_GUIDE.md` for detailed instructions.

### GitHub Deployment
1. Push code to GitHub
2. Connect Vercel to GitHub repository
3. Auto-deploys on every push to main

## 🔒 Security

Headers are configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: enabled
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 SEO

### Meta Tags
Automatically set in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Nexia Corp - Tu negocio, en piloto automático',
  description: 'Sistemas de IA que atienden, califican...',
  keywords: 'IA, automatización, WhatsApp bot...',
  // ... more metadata
};
```

### Sitemaps & Robots
- `public/sitemap.xml` - Search engines crawl your site structure
- `public/robots.txt` - Tells crawlers what to index

### Open Graph
Facebook, LinkedIn, Twitter preview images configured automatically.

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Assembles all sections into home page |
| `app/layout.tsx` | Root layout, metadata, fonts |
| `app/globals.css` | Global styles, animations, variables |
| `tailwind.config.ts` | Brand colors, custom utilities |
| `.env.local` | Configuration (WhatsApp, email, domain) |
| `vercel.json` | Deployment settings & security headers |

## 💡 Pro Tips

1. **Use TypeScript** - All files are `.tsx` for type safety
2. **Test on Mobile** - Use DevTools responsive mode
3. **Monitor Performance** - Use Lighthouse in DevTools
4. **Check Accessibility** - Use WAVE extension
5. **Commit Often** - Use meaningful commit messages

## 🐛 Troubleshooting

### WhatsApp Links Not Working
```
❌ Make sure: https://wa.me/593XXXXXXXXX
✓ Replace 593XXXXXXXXX with your actual number
```

### Custom Cursor Not Showing
- It's hidden on mobile (intentional)
- Check DevTools console for JavaScript errors

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Animations Janky
- Reduce animations in `app/globals.css` if on low-end device
- Check DevTools Performance tab
- Disable reduced motion: Settings → Accessibility

## 📞 Support

### Documentation
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Framer Motion**: [framer.com/motion](https://framer.com/motion)
- **TypeScript**: [typescriptlang.org](https://typescriptlang.org)

### Common Issues
Check `DEPLOYMENT_GUIDE.md` troubleshooting section.

## ✅ Pre-Launch Checklist

Before going live:
- [ ] Update WhatsApp number in `.env.local`
- [ ] Update email in `.env.local` and `Footer.tsx`
- [ ] Update domain in `.env.local` and `layout.tsx`
- [ ] Add favicon at `public/favicon.ico`
- [ ] Add OG image at `public/og-image.png` (1200x630)
- [ ] Test on mobile devices
- [ ] Run `npm run build` successfully
- [ ] Check Lighthouse score
- [ ] Test all links work
- [ ] Review SEO meta tags
- [ ] Deploy to Vercel or Hostinger

## 🎉 You're All Set!

You have a production-ready landing page. Next steps:

1. **Customize** - Update content, colors, and branding
2. **Test** - Run locally, check mobile responsiveness
3. **Deploy** - Push to Vercel or Hostinger
4. **Monitor** - Watch analytics and user feedback
5. **Iterate** - Make improvements based on data

Questions? Check the docs, troubleshooting section, or deployment guide.

Happy coding! 🚀

---

**Created**: April 8, 2025
**Tech Stack**: Next.js 14 + TypeScript + Tailwind + Framer Motion
**Ready for**: Vercel + Hostinger deployment
