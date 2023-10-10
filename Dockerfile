# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Create the 'public' directory and 'public/js' subdirectory if they don't exist
RUN mkdir -p public/js

# Copy the rest of the application files to the working directory
COPY . .

# Build assets (e.g., minify and compile SCSS)
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Define the command to start your application
CMD ["node", "app/index.js"]
