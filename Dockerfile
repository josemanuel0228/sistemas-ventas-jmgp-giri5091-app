# Build de Angular 20
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --configuration=production

# NGINX
FROM nginx:alpine

# Copia archivos contruidos
COPY --from=builder /app/dist/sistemas-ventas-jmgp-giri5091-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf