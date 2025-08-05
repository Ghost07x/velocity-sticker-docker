FROM mcr.microsoft.com/playwright:v1.54.2-jammy

WORKDIR /app

# Copy everything in
COPY . .

# Start server
CMD ["node", "server.js"]




