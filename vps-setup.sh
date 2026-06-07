#!/bin/bash
# ============================================================
# Wuju VPS Setup — wuju.dev
# Corre como root: bash vps-setup.sh
# ============================================================

set -e

echo "==> Actualizando sistema..."
apt update && apt upgrade -y

echo "==> Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo "==> Instalando herramientas globales..."
npm i -g pm2

echo "==> Instalando Nginx + Certbot..."
apt install -y nginx certbot python3-certbot-nginx

echo "==> Creando estructura de carpetas..."
mkdir -p /var/www/oliver-portfolio
mkdir -p /var/www/wuju-landing
mkdir -p /var/www/pizzabrava-pos
mkdir -p /var/www/tuguiasv-api
mkdir -p /var/log/nginx/wuju

echo "==> Configurando Nginx para oliver.wuju.dev..."
cat > /etc/nginx/sites-available/oliver-portfolio <<'EOF'
server {
    listen 80;
    server_name oliver.wuju.dev;

    access_log /var/log/nginx/wuju/oliver-access.log;
    error_log  /var/log/nginx/wuju/oliver-error.log;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

echo "==> Configurando Nginx para wuju.dev (redirect temporal)..."
cat > /etc/nginx/sites-available/wuju-root <<'EOF'
server {
    listen 80;
    server_name wuju.dev www.wuju.dev;

    # Por ahora redirige al portfolio de Oliver
    # Cuando hagan la landing de Wuju, cambiar proxy_pass a :4000 (o lo que sea)
    return 301 https://oliver.wuju.dev$request_uri;
}
EOF

echo "==> Activando sitios Nginx..."
ln -sf /etc/nginx/sites-available/oliver-portfolio /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/wuju-root        /etc/nginx/sites-enabled/

# Desactivar el default de nginx
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

echo ""
echo "==> Listo. Proximos pasos:"
echo ""
echo "  1. Clonar el portafolio:"
echo "     cd /var/www/oliver-portfolio"
echo "     git clone https://github.com/javacachava/portfolio-oliver ."
echo "     npm install && npm run build"
echo ""
echo "  2. Levantar con PM2:"
echo "     pm2 start npm --name 'oliver-portfolio' -- start"
echo "     pm2 startup && pm2 save"
echo ""
echo "  3. SSL (despues de que DNS propague):"
echo "     certbot --nginx -d oliver.wuju.dev -d wuju.dev -d www.wuju.dev"
echo ""
echo "  Para agregar mas proyectos despues:"
echo "     Ver el archivo /var/www/oliver-portfolio/nginx-template.conf"
