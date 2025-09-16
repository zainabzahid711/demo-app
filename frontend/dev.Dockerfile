FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Use the full path to next or use npm run dev
CMD ["npm", "run", "dev"]