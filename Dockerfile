# Use an official Python runtime as the parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend application's requirements file into the container
COPY . .

# Install Node.js
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN python install.py

# Expose the port the backend server listens on
EXPOSE 80

# Expose the port the frontend server listens on
EXPOSE 81

# Command to run the backend server
# Assuming your backend server is setup to run with a file named 'server.py'
CMD ["python", "start.py"]
