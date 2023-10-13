# Use an official Node runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm i

# Copy the rest of your application's source code to the container
COPY . .

# Build your React application
RUN npm run build

# Expose a port (usually 80) to run your application
EXPOSE 80

# Define the command to start your application
CMD ["npm", "start"]