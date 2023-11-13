FROM node:latest

RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

COPY ./src /usr/src/client/src
COPY ./public /usr/src/client/public
COPY ./package.json /usr/src/client/
COPY ./vite.config.ts /usr/src/client/
COPY ./ionic.config.json /usr/src/client/

RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

EXPOSE 3000

# Start
CMD [ "npx", "vite", "--port=3000", "--host=0.0.0.0", "--strictPort=true" ]