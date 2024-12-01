#Build stage
# Define base image for build
FROM node:20 as build-stage

# Define working director
WORKDIR /app

# Copy package json files to working directory
COPY package*.json ./

# Install packages
RUN npm install

# Copy all project files to working directory
COPY . .

# Command to build the application 
RUN npm run build --prod

# Setup webserver which will serve the angular application
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build files on to NGINX server
COPY --from=build-stage /app/dist/book-network-ui /usr/share/nginx/html

EXPOSE 80