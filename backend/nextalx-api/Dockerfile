# syntax=docker/dockerfile:1

# ---- Build stage: JDK 21 + Maven, guaranteed ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies first for faster rebuilds.
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

# Build the application and normalize the jar name (decouples from the version).
COPY src ./src
RUN mvn -B -DskipTests clean package && cp target/*.jar app.jar

# ---- Runtime stage: slim JRE 21 ----
FROM eclipse-temurin:21-jre
WORKDIR /app

# Run as an unprivileged user.
RUN groupadd --system app && useradd --system --gid app --home /app app

COPY --from=build /app/app.jar app.jar
USER app

# Railway injects PORT; Spring reads it via server.port=${PORT:8080}.
EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
