# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production
# Using `npm ci` for a clean, reproducible install. Omit `--only=production` if you need dev dependencies for building.

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]