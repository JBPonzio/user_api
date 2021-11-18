# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN 
WORKDIR /users_api
COPY . .
RUN npm install express
RUN npm install passport
RUN npm install mocha
RUN npm install nodemon
RUN npm install socket.io
RUN npm install pg

CMD ["node", "app.js"]