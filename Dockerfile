# Dockerfile for IdeaForge Local – Ascension Edition

# Use official Node.js 20 image based on Alpine Linux
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency definitions for a lean install
COPY package.json package-lock.json ./

# Install dependencies in CI mode for reproducible builds
RUN npm ci

# Copy all source files to the container
COPY . .

# Build the app for production using Vite
RUN npm run build

# Install a lightweight static file server to serve the build
RUN npm install -g serve

# Expose the port the server will run on
EXPOSE 5000

# Start the server to serve the 'dist' directory on port 5000
CMD ["serve", "-s", "dist", "-l", "5000"]