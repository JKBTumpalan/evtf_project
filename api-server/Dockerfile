FROM node

WORKDIR /api-server

COPY package*.json ./

RUN apt-get update || : && apt-get install python -y

RUN npm install --quiet

EXPOSE 9000

COPY . .

CMD ["node" , "index.js"]
