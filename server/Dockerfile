# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the server code into the container
COPY . .

# Expose the port your Express server listens on (e.g., 3001)
EXPOSE 3001

# Set the command to run your server
CMD ["node", "server.js"]
