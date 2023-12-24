# Stage 1: Build the application
FROM node:18-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /usr/src/app

COPY .env ./.env
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./


EXPOSE 3000
CMD ["node", "dist/main"]
