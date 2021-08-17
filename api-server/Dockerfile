FROM node

WORKDIR /api-server

COPY package*.json ./

RUN apt-get update || : && apt-get install python -y

RUN npm install --quiet

COPY . .

CMD ["node" , "index.js"]
