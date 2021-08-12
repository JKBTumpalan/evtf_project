FROM node:16-alpine3.11

RUN mkdir -p /api-server
WORKDIR /api-server

COPY package*.json /api-server/

RUN npm install --quiet

COPY . /api-server/

CMD ["node" , "index.js"]