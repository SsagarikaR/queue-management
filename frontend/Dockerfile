FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -legacy-peer-deeps

EXPOSE 5173

COPY . .
CMD ["npm","run","dev"]