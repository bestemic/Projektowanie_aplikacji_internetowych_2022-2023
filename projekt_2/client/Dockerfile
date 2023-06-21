FROM node:18
COPY package*.json /client/
WORKDIR ./client
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]