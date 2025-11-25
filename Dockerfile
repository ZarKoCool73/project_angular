#############################################
# Etapa 1: Build Angular 18
#############################################
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./
RUN npm install

# Copiar resto del proyecto
COPY . .

# Build Angular en modo producción
RUN npm run build --configuration production


#############################################
# Etapa 2: Nginx
#############################################
FROM nginx:alpine

# Copiar build generado por Angular 18 (carpeta browser)
COPY --from=builder /app/dist/matrix-app/browser /usr/share/nginx/html

# Copiar configuración para SPA Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
