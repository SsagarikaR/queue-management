FROM node:18-alpine

WORKDIR /app

COPY package*.json .
RUN npm install -legacy-peer-deeps

COPY . .
EXPOSE 4000
CMD ["npm","run","dev"]