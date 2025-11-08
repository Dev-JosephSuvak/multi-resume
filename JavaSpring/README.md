# Resume API - Java Spring Boot

A Java Spring Boot implementation of the Resume API with Google Cloud Firestore backend, featuring Lombok for cleaner code and Docker support.

## Features

- RESTful API endpoints for resume data
- Firestore integration for data persistence
- Reference management with approval workflow
- Service request submission
- CORS enabled for frontend integration
- Lombok for reduced boilerplate code
- Docker containerization support

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Firebase service account key (`serviceAccountKey.json`)
- Docker & Docker Compose (optional, for containerized deployment)

## Setup

### 1. Copy Firebase Credentials

Copy your Firebase service account key to the project root:

```bash
cp ../ResumeApp/scripts/serviceAccountKey.json ./serviceAccountKey.json
```

### 2. Install Dependencies

```bash
mvn clean install
```

### 3. Run the Application

**Option A: Using Maven**

```bash
mvn spring-boot:run
```

**Option B: Using Docker**

```bash
docker-compose up --build
```

**Option C: Using Docker (manual)**

```bash
docker build -t resume-java-api .
docker run -p 5064:5064 -v $(pwd)/serviceAccountKey.json:/app/serviceAccountKey.json resume-java-api
```

The API will start on **`http://localhost:5064`**

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
JavaSpringApi/
├── src/main/java/com/resumeapp/
│   ├── ResumeApplication.java          # Main application
│   ├── config/
│   │   └── FirestoreConfig.java        # Firestore configuration
│   ├── controller/
│   │   ├── ResumeController.java       # Resume endpoints
│   │   ├── ReferenceController.java    # Reference endpoints
│   │   └── ServiceRequestController.java
│   └── model/                          # Lombok-powered POJOs
│       ├── PersonalInfo.java
│       ├── Reference.java
│       └── ServiceRequest.java
├── src/main/resources/
│   └── application.properties          # Configuration
├── Dockerfile                          # Docker image definition
├── docker-compose.yml                  # Docker Compose config
├── .dockerignore                       # Docker ignore rules
└── pom.xml                             # Maven dependencies (includes Lombok)
```

## Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.application.name=resume-api
server.port=5064
google.cloud.project-id=joseph-suvak-resume
```

## Build for Production

**JAR File:**

```bash
mvn clean package
java -jar target/resume-api-1.0.0.jar
```

**Docker Image:**

```bash
docker build -t resume-java-api:latest .
docker run -p 5064:5064 resume-java-api:latest
```

## Testing

```bash
# Test resume endpoint
curl http://localhost:5064/api/resume

# Test approved references
curl http://localhost:5064/api/references/approved

# Submit a reference
curl -X POST http://localhost:5064/api/references \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "relationship": "colleague",
    "company": "Example Corp",
    "message": "Great developer!",
    "rating": 5
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

- **Port**: Runs on `5064` (sequential with .NET on 5063)
- Lombok: All model classes use `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor` annotations
- The API automatically sorts references by relationship priority (manager → direct-report → colleague → client → mentor → other)
- All references are created with `approved: false` by default
- Timestamps are automatically managed by Firestore
- CORS is enabled for all origins (configure as needed for production)
