FROM node:18-alpine3.19 AS base

FROM base as deps
WORKDIR /app

RUN apk add --no-cache autoconf

COPY package.json ./

RUN npm install -g npm@latest

RUN npm i

FROM base as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the application
RUN npm run build


FROM base as runner

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY .env .env

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "/app/dist/index.js"]