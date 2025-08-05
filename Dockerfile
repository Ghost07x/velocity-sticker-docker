FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

# Copy everything into the container
COPY . .

# Start the Express server
CMD ["node", "server.js"]

