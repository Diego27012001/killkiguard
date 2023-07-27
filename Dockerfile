# Utiliza una imagen de Node.js como base
FROM node:18-alpine3.15

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json para npm install
COPY package.json package-lock.json ./

# Instala todas las dependencias del proyecto
RUN npm install --frozen-lockfile

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Establece el comando predeterminado para ejecutar la aplicación
CMD ["node", "dist/main"]

