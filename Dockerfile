#############################################
# Etapa 1: Build Angular 18
#############################################
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos todo el proyecto
COPY . .

# Compilar Angular 18 en producción
RUN npm run build


#############################################
# Etapa 2: Nginx
#############################################
FROM nginx:alpine

# Copiar build real: dist/matrix-app/
COPY --from=builder /app/dist/matrix-app /usr/share/nginx/html

# Configurar Nginx para Angular (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
