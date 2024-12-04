FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=/app/src/infrastructure/database-service/postgre-sql/prisma-orm/schema.prisma

# Build the application
RUN npm run build

# Run migrations, seed, and then start the app
CMD ["sh", "-c", "npm run start:migrate && npm run prisma:seed && npm run start:prod"]
