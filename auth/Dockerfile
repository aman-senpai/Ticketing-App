# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Clear the npm cache
RUN npm cache clean --force

# Install some dependencies
RUN npm install

# Copy the rest of your application code
COPY ./ ./

# Default command
CMD ["npm", "start"]