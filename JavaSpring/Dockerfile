# Multi-stage build for Java Spring Boot Resume API
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Copy service account key
COPY serviceAccountKey.json ./serviceAccountKey.json

# Expose port
EXPOSE 5064

# Set environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/serviceAccountKey.json

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
