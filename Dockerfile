#############################################
# Etapa 1: Build Angular 18
#############################################
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias primero para usar caché de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Build Angular 18 en modo producción
RUN npm run build --configuration production


#############################################
# Etapa 2: Nginx
#############################################
FROM nginx:alpine

# Copiar build generado por Angular
# OJO: Angular 18 genera esto en: dist/<nombre-proyecto>
COPY --from=builder /app/dist/matrix-app /usr/share/nginx/html

# Copiar configuración SPA para Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
