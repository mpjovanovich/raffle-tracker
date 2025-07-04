# Start with node base image
FROM node:22-alpine

# Go to the src
WORKDIR /app

# Copy all of the package.json files needed
COPY package*.json ./
COPY api/package*.json ./api/
COPY dto/package*.json ./dto/

# Install dependencies (no source code at this point)
RUN npm ci

# Copy all source code (that's not in docker igore) to the container.
# Just copy everything for now. We can be more selective later.
COPY . .
