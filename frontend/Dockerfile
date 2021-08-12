FROM node:16-alpine3.11

WORKDIR /frontend

COPY package*.json ./
COPY yarn.lock ./

RUN npm install --quiet

COPY . .

CMD ["yarn" , "dev"]