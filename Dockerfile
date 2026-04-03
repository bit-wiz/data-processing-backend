# base image
FROM node:22-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

# final stage
FROM node:22-slim

WORKDIR /app

# install OpenSSL in the final image
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# copy built assets from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
