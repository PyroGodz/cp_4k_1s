FROM node:16.15.1
 
WORKDIR /app/backend
 
COPY ["package.json", "package-lock.json*", "./"] 
 
RUN npm install 
 
COPY . . 
EXPOSE 5000 
 
CMD [ "npm", "run", "dev" ]