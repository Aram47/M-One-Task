    FROM node:23

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY ./ ./

    EXPOSE 5567
    EXPOSE 5432

    CMD ["npm", "run", "start:dev"]

# RUN npm run build
# CMD ["node", "dist/main"]
