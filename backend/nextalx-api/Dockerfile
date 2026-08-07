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

# The host injects PORT; Spring reads it via server.port=${PORT:8080}.
EXPOSE 8080

# Tuned for a 512 MB free-tier container: a 75% heap leaves too little room for
# metaspace and thread stacks, and the parallel collector reserves more than a
# single-core instance can use. Override JAVA_OPTS on a larger plan.
ENV JAVA_OPTS="-XX:MaxRAMPercentage=65.0 -XX:+UseSerialGC -Xss512k"

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/app.jar"]
