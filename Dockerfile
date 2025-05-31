# Use a glibc-based Node.js image
FROM node:20-slim

# Define build arguments for NEXT_PUBLIC variables
# These are needed if your Next.js app uses NEXT_PUBLIC variables during the build process
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# We do NOT set runtime secrets (like GEMINI_API_KEY) as ARG or ENV here.
# They are passed as environment variables during `docker run`.

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock, etc.)
COPY package*.json ./

# Install dependencies
# Using npm ci for reproducible builds. Remove --force.
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# NEXT_PUBLIC variables are available here from the build arguments
RUN npm run build

# Expose the port your Next.js app listens on
EXPOSE 3000

# The runtime variables (including secrets) are injected by the docker run command
CMD ["npm", "start"]
