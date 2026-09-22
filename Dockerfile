# --- Stage 1: Build Stage ---
FROM gradle:8.10-jdk21 AS builder

WORKDIR /app

# Copy dependency configs first to leverage Docker layer caching
COPY gradle /app/gradle
COPY gradlew build.gradle settings.gradle* /app/

# Cache Gradle dependencies
RUN ./gradlew dependencies --no-daemon || return 0

# Copy application source code and build executable jar
COPY src /app/src
RUN ./gradlew bootJar --no-daemon -x test

# --- Stage 2: Runtime Environment ---
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Run as a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8443

ENTRYPOINT ["java", "-jar", "app.jar"]