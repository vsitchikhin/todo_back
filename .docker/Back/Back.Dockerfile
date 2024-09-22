FROM node:18.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ../.. .

RUN npm run build

CMD ["npm", "start"]
