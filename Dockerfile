# Use a glibc-based Node.js image
FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Define build arguments for NEXT_PUBLIC variables
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Create the missing directory needed for install
RUN mkdir -p /app/dataconnect-generated/js/default-connector

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose the port your Next.js app listens on
EXPOSE 3000

# The runtime variables (including secrets) are injected by the docker run command
CMD ["pnpm", "start"]
