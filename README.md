# 🥊 Crusaders Gym — Website

A static website for **Crusaders Gym**, a boxing gym in Peterborough, Yaxley, UK — led by head coach **Giorgio Mundo**.

Built with vanilla HTML, CSS, and JavaScript. No frameworks. Lightweight, fast, fully responsive.

---

## Project Structure

```
crusaders-gym/
├── index.html          # Homepage
├── gallery.html        # Photo gallery with lightbox
├── contact.html        # Contact form + map
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # All JavaScript
├── images/             # Photos & assets
├── _redirects          # Netlify redirect rules
├── netlify.toml        # Netlify build config & headers
└── README.md           # This file
```

## Features

- **Responsive design** — works on mobile, tablet, and desktop
- **Dark boxing aesthetic** — red/black/white colour scheme with grain texture
- **Scroll animations** — elements reveal on scroll via IntersectionObserver
- **Lightbox gallery** — click to enlarge, keyboard navigation (arrow keys, Escape)
- **Contact form** — Netlify Forms with honeypot spam protection + reCAPTCHA v3 placeholder
- **SEO** — meta tags, Open Graph, semantic HTML, ARIA labels
- **Performance** — lazy loading images, minimal dependencies, caching headers

## Deploying to Netlify via GitHub

### 1. Push to GitHub

```bash
cd crusaders-gym
git init
git add .
git commit -m "Initial commit — Crusaders Gym website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crusaders-gym.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorise access
4. Choose the `crusaders-gym` repository
5. Build settings:
   - **Build command:** *(leave empty — no build step needed)*
   - **Publish directory:** `.`
6. Click **"Deploy site"**

### 3. Enable Forms

Netlify automatically detects the `data-netlify="true"` attribute on the contact form. Submissions will appear under **Forms** in the Netlify dashboard. You can set up email notifications there.

### 4. Set Up reCAPTCHA v3 (Optional)

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Create a new **reCAPTCHA v3** site
3. Replace `YOUR_SITE_KEY` in `contact.html` (two places) with your actual site key
4. Add the **secret key** in Netlify: Site settings → Forms → Spam filters → reCAPTCHA

### 5. Custom Domain

1. In Netlify: **Domain management** → **Add a custom domain**
2. Add `crusadersgym.co.uk` (or your chosen domain)
3. Update your domain's DNS to point to Netlify
4. Netlify provides free HTTPS via Let's Encrypt

## Customisation

- **Phone/email/address** — update in all three HTML files and the footer
- **Social media links** — replace `#` in the nav and footer with real URLs
- **Images** — replace files in `images/` folder (keep filenames or update references)
- **Colours** — edit CSS custom properties at the top of `styles.css`
- **Google Maps** — update the iframe `src` in `contact.html` with your exact location

## Browser Support

Tested for compatibility with modern browsers: Chrome, Firefox, Safari, Edge. Graceful degradation for older browsers.

---

**Crusaders Gym** — Yaxley, Peterborough, UK  
Head Coach: Giorgio Mundo
