FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

# Copy all files into container
COPY . .

# Start your server
CMD ["node", "server.js"]


