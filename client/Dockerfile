# Use an official Node.js runtime as the base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure react-scripts is executable
RUN chmod +x ./node_modules/.bin/react-scripts

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Set the command to serve the app
CMD ["serve", "-s", "build", "-l", "8080"]

# Expose the port the app runs on
ENV PORT 8080
EXPOSE 8080
