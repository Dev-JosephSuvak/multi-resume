# Resume API - Python Flask

A Python Flask implementation of the Resume API with Google Cloud Firestore backend and Docker support.

## Features

- RESTful API endpoints for resume data
- Firestore integration for data persistence
- Reference management with approval workflow
- Service request submission
- CORS enabled for frontend integration
- Docker containerization support

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Firebase service account key (`serviceAccountKey.json`)
- Docker & Docker Compose (optional, for containerized deployment)

## Setup

### 1. Copy Firebase Credentials

Copy your Firebase service account key to the project root:

```bash
cp ../ResumeApp/scripts/serviceAccountKey.json ./serviceAccountKey.json
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment (Optional)

```bash
cp .env.example .env
# Edit .env if needed
```

### 5. Run the Application

**Option A: Using Python directly**

```bash
python app.py
```

**Option B: Using Docker**

```bash
docker-compose up --build
```

**Option C: Using Docker (manual)**

```bash
docker build -t resume-flask-api .
docker run -p 5065:5065 -v $(pwd)/serviceAccountKey.json:/app/serviceAccountKey.json resume-flask-api
```

The API will start on **`http://localhost:5065`**

## API Endpoints

### Resume Data

- `GET /api/resume` - Get complete resume data
- `GET /api/resume/personal` - Get personal information
- `GET /api/resume/skills` - Get skills
- `GET /api/resume/experience` - Get work experience
- `GET /api/resume/education` - Get education
- `GET /api/resume/projects` - Get projects

### References

- `GET /api/references/approved` - Get approved references (sorted by relationship priority)
- `GET /api/references` - Get all references
- `POST /api/references` - Submit a new reference
- `PATCH /api/references/{id}/approve` - Approve a reference
- `PATCH /api/references/{id}/reject` - Reject a reference
- `DELETE /api/references/{id}` - Delete a reference

### Service Requests

- `POST /api/service-requests` - Submit a service request

## Project Structure

```
PythonFlaskApi/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── Dockerfile             # Docker image definition
├── docker-compose.yml     # Docker Compose config
├── .dockerignore          # Docker ignore rules
├── serviceAccountKey.json # Firebase credentials (not in git)
└── README.md              # This file
```

## Configuration

The app uses the following configuration:

- **Port**: 5065 (sequential with .NET on 5063, Java on 5064)
- **Host**: 0.0.0.0 (accessible from network)
- **Debug**: True (disable in production)
- **CORS**: Enabled for all origins

## Production Deployment

### Using Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5065 app:app
```

### Using Docker

Already configured! Just run:

```bash
docker-compose up -d
```

## Testing

```bash
# Test resume endpoint
curl http://localhost:5065/api/resume

# Test approved references
curl http://localhost:5065/api/references/approved

# Submit a reference
curl -X POST http://localhost:5065/api/references \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "relationship": "colleague",
    "company": "Example Corp",
    "message": "Great developer!",
    "rating": 5
  }'

# Approve a reference
curl -X PATCH http://localhost:5065/api/references/{reference_id}/approve

# Submit service request
curl -X POST http://localhost:5065/api/service-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "company": "Tech Inc",
    "serviceType": "web-development",
    "message": "Need help with a project"
  }'
```

## Docker Commands

```bash
# Build and run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down

# Rebuild
docker-compose up --build
```

## Notes

- **Port**: Runs on `5065` (sequential with .NET on 5063, Java on 5064)
- The API automatically sorts references by relationship priority (manager → direct-report → colleague → client → mentor → other)
- All references are created with `approved: false` by default
- Timestamps are automatically managed by Firestore
- CORS is enabled for all origins (configure as needed for production)
- Error handling returns JSON responses with appropriate HTTP status codes

## Security Considerations

For production:

1. Disable debug mode: `app.run(debug=False)`
2. Configure specific CORS origins
3. Add authentication/authorization
4. Use environment variables for sensitive data
5. Implement rate limiting
6. Add input validation and sanitization
