# FROM node:22

# WORKDIR /app

# COPY package*.json .
# RUN npm i

# COPY . .

# EXPOSE 3000

# CMD ["node", "server.js"]

FROM node:18

WORKDIR /app

COPY package*.json .
RUN npm i

COPY . .

CMD ["npm", "test"]