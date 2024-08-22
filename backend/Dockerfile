# Description: Dockerfile for the backend application
# Building: docker build --no-cache --tag "job-tracker-backend" .
# Running: docker run -d -p 5001:5001 --name backend job-tracker-backend
# Stopping: docker stop backend

FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]