# syntax=docker/dockerfile:1

# ---- Build stage: JDK 21 + Maven, guaranteed ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies first for faster rebuilds.
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

# Build the application.
COPY src ./src
RUN mvn -B -DskipTests clean package

# ---- Runtime stage: slim JRE 21 ----
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/nextalx-api-0.0.1-SNAPSHOT.jar app.jar

# Railway injects PORT; Spring reads it via server.port=${PORT:8080}.
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
