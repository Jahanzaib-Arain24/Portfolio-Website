# 🚀 Production Deployment Guide — Muhammad Jahanzaib Portfolio

This document provides comprehensive, step-by-step instructions for deploying the **Muhammad Jahanzaib Senior Engineer Portfolio** across various production hosting platforms.

---

## 📑 Table of Contents
- [Option 1: Vercel (Recommended)](#option-1-vercel-recommended)
- [Option 2: Netlify](#option-2-netlify)
- [Option 3: Linux VPS / Hostinger / DigitalOcean (PM2 + Nginx)](#option-3-linux-vps--hostinger--digitalocean-pm2--nginx)
- [Option 4: Docker Containerization](#option-4-docker-containerization)
- [⚙️ Environment Variables Configuration](#️-environment-variables-configuration)
- [🗄️ Database & Prisma Migration in Production](#️-database--prisma-migration-in-production)
- [🔍 Post-Deployment Health Check](#-post-deployment-health-check)

---

## Option 1: Vercel (Recommended)

Vercel is the native cloud for Next.js 16 and provides automated continuous deployment, edge CDN routing, and instant SSL certificates.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "chore: prepare for production release"
   git push origin master
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New...** ➔ **Project**.
   - Import your `portfolio-website` repository.

3. **Configure Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Add all keys from `.env` in the Vercel Project Settings (e.g. `DATABASE_URL`, `JWT_SECRET`, `EMAIL_USER`, etc.).

5. Click **Deploy**. The site will deploy globally across edge servers in under 60 seconds.

---

## Option 2: Netlify

1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** ➔ **Import an existing project**.
3. Authorize GitHub and select your portfolio repository.
4. Set Build Settings:
   - **Build command**: `npx prisma generate && npm run build`
   - **Publish directory**: `.next`
5. Configure Environment Variables in **Site settings** ➔ **Environment variables**.
6. Deploy the site.

---

## Option 3: Linux VPS / Hostinger / DigitalOcean (PM2 + Nginx)

For self-hosting on an Ubuntu/Debian Linux server with full control over the SQLite database and Node.js process:

### 1. Server Environment Setup
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x or 22.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Install PM2 process manager globally
sudo npm install -g pm2
```

### 2. Clone and Build Project
```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/Jahanzaib-Arain24/portfolio-website.git portfolio
cd portfolio

# Install dependencies
sudo npm install

# Setup Prisma schema & generate client
sudo npx prisma db push
sudo npx prisma generate

# Build production bundle
sudo npm run build
```

### 3. Start with PM2
```bash
pm2 start npm --name "jahanzaib-portfolio" -- start -- -p 3000
pm2 save
pm2 startup
```

### 4. Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/jahanzaib.dev`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site & configure SSL:
```bash
sudo ln -s /etc/nginx/sites-available/jahanzaib.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install Free SSL via Let's Encrypt Certbot
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Option 4: Docker Containerization

Deploy as an isolated, portable Docker container:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t jahanzaib-portfolio .
docker run -p 3000:3000 --env-file .env jahanzaib-portfolio
```

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication & Admin Security
JWT_SECRET="your-super-strong-jwt-secret-key"
ADMIN_PASSWORD_HASH="your-bcrypt-hashed-password"

# Contact Form Mailer (Nodemailer / SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USER="arainjhanzaib@gmail.com"
SMTP_PASS="your-app-password"

# Optional App URL
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

---

## 🗄️ Database & Prisma Migration in Production

Whenever modifying models in `prisma/schema.prisma`:

```bash
# Push schema updates safely
npx prisma db push

# Re-generate Prisma Client
npx prisma generate
```

To inspect database records visually through web browser:
```bash
npx prisma studio
```

---

## 🔍 Post-Deployment Health Check

After deployment, verify the following:
1. ✅ **Homepage**: Loads with 0 layout shift and smooth scroll navigation.
2. ✅ **Mobile View**: Drawer menu opens cleanly and navigation scrolls smoothly.
3. ✅ **Case Studies**: Interactive project modal displays full architecture details and links.
4. ✅ **Contact Desk**: Submission triggers real-time toast notification and database record.
5. ✅ **Admin Suite**: `/login` and `/admin` routes authenticate and permit live CMS updates.
