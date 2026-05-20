FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server.js ./
COPY db.js ./
COPY redis.js ./
COPY health.js ./
COPY routes ./routes
COPY data ./data
EXPOSE 3000
CMD ["npm", "start"]
