# Use official Node.js 18 image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first for caching dependencies install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (usually 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
