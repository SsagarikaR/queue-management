FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.*.json ./
RUN npm install -legacy-peer-deeps

COPY . .
CMD ["npm","run","dev"]