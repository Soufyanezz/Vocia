# Guide de Déploiement VOCIA

## 🚀 Options de Déploiement

### 1. Déploiement Rapide (Recommandé)

#### Netlify
```bash
# 1. Build du projet
npm run build

# 2. Déployer sur Netlify
# - Glisser-déposer le dossier dist/ sur netlify.com
# - Ou connecter le repository Git pour déploiement automatique
```

#### Vercel
```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel --prod
```

### 2. Déploiement Serveur

#### Nginx
```nginx
server {
    listen 80;
    server_name vocia.example.com;
    
    root /var/www/vocia/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache des assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName vocia.example.com
    DocumentRoot /var/www/vocia/dist
    
    <Directory /var/www/vocia/dist>
        Options -Indexes
        AllowOverride All
        Require all granted
        
        # Redirection SPA
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### 3. Déploiement Docker

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  vocia:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## 🔧 Configuration

### Variables d'Environnement
```bash
# .env.production
VITE_APP_TITLE="VOCIA - EU AI Act Compliance"
VITE_API_URL="https://api.vocia.com"
VITE_VERSION="1.0.0"
```

### Configuration Vite
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Modifier si déployé dans un sous-dossier
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // true pour debug
  }
})
```

## 🌐 Domaine et SSL

### Configuration DNS
```
A     vocia.example.com     → IP_SERVER
CNAME www.vocia.example.com → vocia.example.com
```

### SSL avec Let's Encrypt
```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir certificat
sudo certbot --nginx -d vocia.example.com -d www.vocia.example.com

# Renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring et Analytics

### Google Analytics
```html
<!-- Dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitoring d'Erreurs
```javascript
// Sentry (optionnel)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

## 🔒 Sécurité

### Headers de Sécurité
```nginx
# Dans la config Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### Backup
```bash
#!/bin/bash
# Script de backup quotidien
DATE=$(date +%Y%m%d)
tar -czf /backups/vocia-$DATE.tar.gz /var/www/vocia/
find /backups/ -name "vocia-*.tar.gz" -mtime +30 -delete
```

## 🚀 Mise en Production

### Checklist Pré-Déploiement
- [ ] Tests fonctionnels complets
- [ ] Optimisation des images et assets
- [ ] Configuration SSL/HTTPS
- [ ] Monitoring et alertes
- [ ] Backup automatique
- [ ] Documentation utilisateur

### Commandes de Déploiement
```bash
# 1. Préparation
git pull origin main
npm ci
npm run build

# 2. Tests
npm run test # Si tests configurés

# 3. Déploiement
rsync -avz --delete dist/ user@server:/var/www/vocia/
sudo systemctl reload nginx

# 4. Vérification
curl -I https://vocia.example.com
```

## 📈 Optimisations Performance

### Compression
```nginx
# Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Cache
```nginx
# Cache des assets statiques
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### CDN (Optionnel)
- **Cloudflare** : Protection DDoS + CDN global
- **AWS CloudFront** : CDN Amazon
- **Azure CDN** : CDN Microsoft

## 🔧 Maintenance

### Mises à Jour
```bash
# Mise à jour des dépendances
npm update
npm audit fix

# Rebuild et redéploiement
npm run build
# Suivre procédure de déploiement
```

### Logs
```bash
# Logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Logs système
journalctl -u nginx -f
```

---

**Support** : Pour toute question technique, consultez la documentation ou contactez l'équipe de développement.

