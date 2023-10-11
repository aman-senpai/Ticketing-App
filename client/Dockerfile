FROM node:18-alpine

WORKDIR /usr/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Clear the npm cache
RUN npm cache clean --force

# Install some dependencies
RUN npm install --omit=dev

# Copy the rest of your application code
COPY ./ ./


CMD [ "npm", "run", "dev" ]