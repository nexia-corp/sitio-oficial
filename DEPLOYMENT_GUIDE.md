# Deployment Guide - Nexia Corp

This guide covers deployment to Vercel (recommended) and Hostinger.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] Updated `.env.local` with correct WhatsApp number
- [ ] Updated `.env.local` with correct email
- [ ] All links in components point to correct domain
- [ ] Meta tags in `layout.tsx` have correct domain (currently `nexia-corp.com`)
- [ ] OG image exists at `/public/og-image.png` (1200x630px recommended)
- [ ] Favicon exists at `/public/favicon.ico`
- [ ] All WhatsApp links in code use correct phone number

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally
```bash
npm install -g vercel
```

2. Deploy from project directory
```bash
vercel --prod
```

3. Follow the prompts:
   - Link to existing Vercel project or create new
   - Confirm settings
   - Deployment begins automatically

### Option 2: GitHub Integration (Recommended for Teams)

1. Push code to GitHub repository
```bash
git init
git add .
git commit -m "Initial Nexia Corp website"
git branch -M main
git remote add origin https://github.com/username/nexia-corp.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Sign in or create account
4. Click "New Project"
5. Import repository from GitHub
6. Configure:
   - Framework: Next.js
   - Build command: `npm run build`
   - Install command: `npm install`
   - Output directory: `.next`

7. Add environment variables:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_EMAIL`
   - `NEXT_PUBLIC_DOMAIN`

8. Click "Deploy"

### Custom Domain on Vercel

1. In Vercel dashboard, go to project Settings
2. Navigate to "Domains"
3. Add your domain (nexia-corp.com)
4. Update DNS records at your domain registrar:
   - Add CNAME: `nexia-corp.com` → `cname.vercel.sh`
   - Or use nameservers provided by Vercel

## 🌐 Deploy to Hostinger

### Prerequisites
- Hostinger account with hosting plan
- Git repository with your code
- Node.js 18+ support enabled (Hostinger Node.js hosting)

### Step 1: Prepare Repository

1. Ensure all code is committed to Git
```bash
git add .
git commit -m "Ready for Hostinger deployment"
```

2. Push to Git hosting (GitHub, GitLab, or Gitea)

### Step 2: Configure in Hostinger

1. Log in to Hostinger control panel
2. Navigate to **Websites** or **Hosting**
3. Select your hosting plan
4. Go to **Git** section
5. Click **Connect Repository**

### Step 3: Connect Git Repository

1. Choose your Git provider (GitHub/GitLab)
2. Authorize Hostinger to access your repository
3. Select the repository: `nexia-corp`
4. Select branch: `main`
5. Click **Connect**

### Step 4: Build Configuration

Set the following build settings:

**Build Script:**
```
npm run build
```

**Install Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Node Version:** 18.x or higher

**Environment Variables:**
```
NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX
NEXT_PUBLIC_EMAIL=hola@nexia-corp.com
NEXT_PUBLIC_DOMAIN=nexia-corp.com
```

### Step 5: Deploy

1. Review settings
2. Click **Deploy**
3. Monitor deployment logs
4. Once complete, visit your domain

### Step 6: Configure Domain

1. In Hostinger control panel, go to **Domains**
2. Add your domain if not already added
3. Update DNS records or nameservers
4. Point to your Hostinger hosting

## 🔄 Continuous Deployment

### Vercel (Automatic)
Every push to main branch automatically triggers deployment.

### Hostinger (Automatic with Git integration)
1. After connecting Git repository, enable auto-deploy
2. Each push to main triggers automatic deployment
3. Monitor deployments in Git section of control panel

## 📱 Mobile Testing

After deployment, test on mobile devices:
- [ ] Navigation works on mobile
- [ ] Hero section responsive
- [ ] Cards stack properly
- [ ] WhatsApp button accessible
- [ ] Custom cursor works (or hidden on mobile)

## 🔒 Security

### Update Meta Tags
Edit `app/layout.tsx`:
```typescript
metadataBase: new URL('https://nexia-corp.com'), // Change to your domain
```

### HTTPS
- Vercel: Automatic SSL certificate
- Hostinger: Enable SSL in control panel

### Environment Variables
Never commit sensitive data:
- WhatsApp API keys (if used)
- Email service credentials
- Analytics IDs

## 🚨 Troubleshooting

### Build Fails on Vercel
1. Check build logs
2. Ensure Node.js version matches
3. Verify all dependencies in `package.json`
4. Clear cache: Project Settings → Delete Cache

### Build Fails on Hostinger
1. Check Node.js version (minimum 18)
2. Verify build script: `npm run build`
3. Check disk space
4. Ensure Git repository is properly connected

### WhatsApp Links Don't Work
1. Verify phone number in `.env.local`
2. Format: `593XXXXXXXXX` (no + or spaces)
3. Check URL: `https://wa.me/593XXXXXXXXX`

### Custom Domain Not Working
1. DNS changes take 24-48 hours to propagate
2. Clear browser cache
3. Use `nslookup` or `dig` to verify DNS
4. Check domain registrar settings

## 📊 Performance Monitoring

### Vercel Analytics
1. Dashboard → Project → Analytics
2. Monitor Core Web Vitals
3. Check deployment times

### Hostinger
1. Control Panel → Performance
2. Monitor server resources
3. Check error logs

## 📝 Maintenance

### Weekly
- [ ] Check error logs
- [ ] Monitor WhatsApp integration
- [ ] Test contact forms

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review analytics
- [ ] Test mobile responsiveness

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Update content/testimonials

## 🆘 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Hostinger Support**: [hostinger.com/support](https://hostinger.com/support)
- **Next.js Docs**: [nextjs.org](https://nextjs.org)

---

**Last Updated**: 2025-04-08
**Domain**: nexia-corp.com
