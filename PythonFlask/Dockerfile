# Python Flask Resume API
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .
COPY serviceAccountKey.json ./serviceAccountKey.json

# Expose port
EXPOSE 5065

# Set environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/serviceAccountKey.json
ENV FLASK_APP=app.py
ENV PYTHONUNBUFFERED=1

# Run the application
CMD ["python", "app.py"]
