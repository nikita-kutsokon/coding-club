FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=/app/src/infrastructure/database-service/postgre-sql/prisma-orm/schema.prisma

RUN npm run build

CMD [  "npm", "run", "start:migrate" ]