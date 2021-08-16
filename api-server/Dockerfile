FROM node
RUN mkdir -p /api-server
WORKDIR /api-server

COPY package*.json /api-server/

RUN apt-get update || : && apt-get install python -y

RUN npm install --quiet

COPY . /api-server/

CMD ["node" , "index.js"]
