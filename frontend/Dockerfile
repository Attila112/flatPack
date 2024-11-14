# Use the official Node image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Vite app for production
RUN npm run build

# Serve the Vite build with a static server
RUN npm install -g serve
RUN npm i @material-tailwind/react
CMD ["npm", "run", "dev"]

# Expose the port Vite runs on (typically 5173)
EXPOSE 5173
