FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install all dependencies including Playwright + Express
RUN npm install

# Then copy everything else into the container
COPY . .

# Start the server
CMD ["node", "server.js"]


