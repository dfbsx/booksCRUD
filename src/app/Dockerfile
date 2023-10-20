# Use a specific Node.js version, such as 14, as Node.js versioning does not use two digits
FROM node:20-alpine AS base

# Create a working directory
WORKDIR /app

# Copy package.json and lock files separately to take advantage of caching
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install global dependencies, if needed
# RUN npm install -g your-global-dependency
ARG POSTGRES_HOST
ARG POSTGRES_PWD
ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/bookscrud"
# Install dependencies based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Production image, create a new stage
FROM node:20-alpine as runner

# Set the working directory
WORKDIR /app

# Copy the dependency-installed node_modules
COPY --from=base /app/node_modules ./node_modules

# Copy the application code
COPY --from=base /app ./

# Add any runtime configuration or startup commands here
RUN npx prisma generate

# Specify the default command to run your application
CMD ["npm", "run", "start:migrate:prisma"]
