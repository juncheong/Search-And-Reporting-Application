# This can be found on nodejs.org/de/docs/guides/nodejs-docker-webapp/

# Specifies the image. This uses version 11.12 of node found on Docker Hub
FROM node:11.12

# Creates a directory within the container that will have our application code
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Installs nano in the container incase files need to be opened or edited. Not necessary.
RUN apt-get update && apt-get install -y \
  nano

# Copies the app's files into the image
COPY . .

# Informs Docker that the container listens on the specified network ports at runtime.
# Can explicitly specify whether the port listens on TCP or UDP and the default is TCP.
EXPOSE 3000

# There can only be one CMD instruction in a Dockerfile.
# Default command to be run. Here, we will use "npm start" to run our node.js app.
CMD [ "npm", "start" ]