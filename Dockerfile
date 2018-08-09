#FROM node:latest
FROM mhart/alpine-node:latest
#RUN mkdir -p /usr/src/app
WORKDIR /app
#ADD . /usr/src/app
COPY package.json /app
RUN npm install
COPY . /app
CMD node server.js
EXPOSE 3000

#COPY . /usr/src/app
#EXPOSE 3000
#CMD [ “node”, “server.js” ]